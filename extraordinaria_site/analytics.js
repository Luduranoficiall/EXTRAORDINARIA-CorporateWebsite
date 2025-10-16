/**
 * EXTRAORDINÁRIA.AI - Sistema de Analytics Próprio
 * Rastreamento de eventos sem dependências externas
 */

class ExtraordinariaAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.events = [];
        this.startTime = Date.now();
        this.init();
    }
    
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    init() {
        console.log('📊 Analytics iniciado:', this.sessionId);
        
        // Rastrear pageview
        this.trackPageView();
        
        // Rastrear cliques
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (target) {
                this.trackEvent('click', {
                    element: target.tagName,
                    text: target.textContent.trim().substring(0, 50),
                    href: target.href || null
                });
            }
        });
        
        // Rastrear scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                );
                this.trackEvent('scroll', { percent: scrollPercent });
            }, 500);
        });
        
        // Rastrear tempo na página
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            this.trackEvent('time_on_page', { seconds: timeSpent });
            this.sendData();
        });
        
        // Enviar dados periodicamente (a cada 30 segundos)
        setInterval(() => this.sendData(), 30000);
    }
    
    trackPageView() {
        this.trackEvent('pageview', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer || 'direct'
        });
    }
    
    trackEvent(eventName, data = {}) {
        const event = {
            sessionId: this.sessionId,
            eventName,
            timestamp: new Date().toISOString(),
            data,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
        
        this.events.push(event);
        console.log('📈 Evento rastreado:', eventName, data);
    }
    
    sendData() {
        if (this.events.length === 0) return;
        
        // Salvar localmente (localStorage)
        const existingData = JSON.parse(localStorage.getItem('extraordinaria_analytics') || '[]');
        existingData.push(...this.events);
        
        // Manter apenas últimos 1000 eventos
        const recentEvents = existingData.slice(-1000);
        localStorage.setItem('extraordinaria_analytics', JSON.stringify(recentEvents));
        
        console.log(`💾 ${this.events.length} eventos salvos localmente`);
        
        // Limpar eventos enviados
        this.events = [];
        
        // Aqui você pode adicionar envio para servidor próprio
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(recentEvents) });
    }
    
    getAnalytics() {
        return JSON.parse(localStorage.getItem('extraordinaria_analytics') || '[]');
    }
    
    clearAnalytics() {
        localStorage.removeItem('extraordinaria_analytics');
        console.log('🗑️ Analytics limpo');
    }
    
    getStats() {
        const data = this.getAnalytics();
        const stats = {
            totalEvents: data.length,
            pageviews: data.filter(e => e.eventName === 'pageview').length,
            clicks: data.filter(e => e.eventName === 'click').length,
            sessions: [...new Set(data.map(e => e.sessionId))].length,
            topPages: this.getTopPages(data),
            avgTimeOnPage: this.getAvgTimeOnPage(data)
        };
        
        console.table(stats);
        return stats;
    }
    
    getTopPages(data) {
        const pageviews = data.filter(e => e.eventName === 'pageview');
        const counts = {};
        
        pageviews.forEach(pv => {
            const url = pv.data.url;
            counts[url] = (counts[url] || 0) + 1;
        });
        
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([url, count]) => ({ url, views: count }));
    }
    
    getAvgTimeOnPage(data) {
        const timeEvents = data.filter(e => e.eventName === 'time_on_page');
        if (timeEvents.length === 0) return 0;
        
        const total = timeEvents.reduce((sum, e) => sum + e.data.seconds, 0);
        return Math.round(total / timeEvents.length);
    }
}

// Inicializar automaticamente
window.extraordinariaAnalytics = new ExtraordinariaAnalytics();

// Expor funções globais
window.trackEvent = (name, data) => window.extraordinariaAnalytics.trackEvent(name, data);
window.getAnalyticsStats = () => window.extraordinariaAnalytics.getStats();
