/**
 * EXTRAORDINÁRIA.AI - Sistema de Otimização de Performance
 * Lazy loading, compressão e otimizações automáticas
 */

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('⚡ Otimizador de Performance iniciado');
        
        // 1. Lazy Loading de Imagens
        this.lazyLoadImages();
        
        // 2. Pré-carregamento inteligente
        this.intelligentPrefetch();
        
        // 3. Otimização de fontes
        this.optimizeFonts();
        
        // 4. Compressão de recursos
        this.enableCompression();
        
        // 5. Monitoramento de performance
        this.monitorPerformance();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                    console.log('🖼️ Imagem carregada:', img.src);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        console.log(`🖼️ ${images.length} imagens configuradas para lazy loading`);
    }
    
    intelligentPrefetch() {
        // Pré-carregar links importantes quando passar mouse
        const links = document.querySelectorAll('a[href^="/"], a[href^="http"]');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = link.href;
                document.head.appendChild(prefetchLink);
            }, { once: true });
        });
        
        console.log(`🔗 ${links.length} links preparados para prefetch`);
    }
    
    optimizeFonts() {
        // Font loading otimizado
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                console.log('✍️ Fontes carregadas');
            });
        }
        
        // Evitar FOIT (Flash of Invisible Text)
        const fontFaces = [
            new FontFace('Montserrat', 'url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap)', {
                display: 'swap'
            })
        ];
        
        fontFaces.forEach(font => {
            font.load().then(loadedFont => {
                document.fonts.add(loadedFont);
            }).catch(err => {
                console.warn('⚠️ Erro ao carregar fonte:', err);
            });
        });
    }
    
    enableCompression() {
        // Verificar suporte a compressão
        const supportsCompression = 'CompressionStream' in window;
        console.log(`📦 Compressão nativa: ${supportsCompression ? 'Sim' : 'Não'}`);
    }
    
    monitorPerformance() {
        // Web Vitals simplificado
        if ('PerformanceObserver' in window) {
            // LCP - Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime), 'ms');
            });
            
            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('⚠️ LCP não suportado');
            }
            
            // FID - First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    console.log('📊 FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
                });
            });
            
            try {
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('⚠️ FID não suportado');
            }
            
            // CLS - Cumulative Layout Shift
            let clsScore = 0;
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                });
                console.log('📊 CLS:', clsScore.toFixed(4));
            });
            
            try {
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('⚠️ CLS não suportado');
            }
        }
        
        // Performance Navigation Timing
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('⚡ Performance Metrics:');
                    console.log(`   DNS: ${Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`);
                    console.log(`   TCP: ${Math.round(perfData.connectEnd - perfData.connectStart)}ms`);
                    console.log(`   TTFB: ${Math.round(perfData.responseStart - perfData.requestStart)}ms`);
                    console.log(`   DOM Load: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
                    console.log(`   Total Load: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
                }
            }, 0);
        });
    }
    
    getPerformanceScore() {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (!perfData) return null;
        
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        
        let score = 100;
        if (loadTime > 3000) score -= 30;
        else if (loadTime > 2000) score -= 20;
        else if (loadTime > 1000) score -= 10;
        
        return {
            score,
            loadTime: Math.round(loadTime),
            rating: score >= 90 ? 'Excelente' : score >= 70 ? 'Bom' : score >= 50 ? 'Regular' : 'Precisa melhorar'
        };
    }
}

// Inicializar automaticamente quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceOptimizer = new PerformanceOptimizer();
    });
} else {
    window.performanceOptimizer = new PerformanceOptimizer();
}

// Exportar função de score
window.getPerformanceScore = () => {
    return window.performanceOptimizer ? window.performanceOptimizer.getPerformanceScore() : null;
};
