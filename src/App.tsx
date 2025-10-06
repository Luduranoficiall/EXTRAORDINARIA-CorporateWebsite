import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { BackToTop } from './components/BackToTop';
import { Hero } from './components/Hero';
import { GlobalStats } from './components/GlobalStats';
import { About } from './components/About';
import { Ecosystem } from './components/Ecosystem';
import { Solutions } from './components/Solutions';
import { Cases } from './components/Cases';
import { Experience } from './components/Experience';
import { PricingPlans } from './components/PricingPlans';
import { CalendlyIntegration } from './components/CalendlyIntegration';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const LandingPageAds = React.lazy(() => import('./components/LandingPageAds').then(m => ({ default: m.LandingPageAds })));
import { TrackingScripts } from './components/TrackingScripts';
import { SocialMediaLinks } from './components/SocialMediaLinks';
import { SEOHead } from './components/SEOHead';
import { LoadingScreen } from './components/LoadingScreen';
import { SkipToContent } from './components/SkipToContent';
import { PageTransition } from './components/PageTransition';
const BotGPTProduct = React.lazy(() => import('./components/BotGPTProduct').then(m => ({ default: m.BotGPTProduct })));
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Lock, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdsLanding, setIsAdsLanding] = useState(false);
  const [adsCampaign, setAdsCampaign] = useState('');
  const [adsSource, setAdsSource] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBotGPTPage, setIsBotGPTPage] = useState(false);
  const adminTriggerRef = useRef<{ clicks: number; timer: ReturnType<typeof setTimeout> | null }>({ clicks: 0, timer: null });

  // Check for admin access and ADS landing page via URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Admin access
    if (urlParams.get('admin') === 'true') {
      setShowAdminLogin(true);
    }

    // BotGPT Product Page
    if (urlParams.get('product') === 'botgpt' || urlParams.get('botgpt') === 'true') {
      setIsBotGPTPage(true);
      
      // Track BotGPT page view
      if ((window as any).fbq) {
        (window as any).fbq('track', 'ViewContent', {
          content_name: 'BotGPT Product Page',
          content_category: 'Product',
          value: 197.00,
          currency: 'BRL'
        });
      }
    }

    // ADS Landing Page
    if (urlParams.get('ads') === 'true' || urlParams.get('landing') === 'true') {
      setIsAdsLanding(true);
      setAdsCampaign(urlParams.get('campaign') || 'general');
      setAdsSource(urlParams.get('source') || urlParams.get('utm_source') || 'direct');
      
      // Track landing page view
      if ((window as any).fbq) {
        (window as any).fbq('track', 'ViewContent', {
          content_name: 'ADS Landing Page',
          content_category: 'Landing Page',
          source: urlParams.get('source') || 'direct',
          campaign: urlParams.get('campaign') || 'general'
        });
      }
    }

    // Simulate loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Em produção, a senha administrativa precisa estar configurada em VITE_ADMIN_PASSWORD.
    // Não usar um fallback embarcado para evitar exposição acidental.
    const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || '';
    if (!ADMIN_PASSWORD) {
      // Senha não configurada: bloqueia login administrativo e registra para diagnóstico.
      toast.error('Acesso administrativo desabilitado: variáveis de ambiente não configuradas.');
      return;
    }

    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setLoginAttempts(0);
      toast.success('Acesso autorizado! Bem-vindo ao Painel CEO.');
    } else {
      setLoginAttempts(prev => prev + 1);
      
      if (loginAttempts >= 2) {
        toast.error('Múltiplas tentativas falhadas. Aguarde 30 segundos.', {
          duration: 5000,
        });
        setAdminPassword('');
        setTimeout(() => setLoginAttempts(0), 30000);
      } else {
        toast.error('Senha incorreta. Acesso negado.', {
          duration: 3000,
        });
        setAdminPassword('');
      }
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
    setLoginAttempts(0);
    window.history.pushState({}, '', window.location.pathname);
    toast.info('Sessão encerrada com sucesso.');
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      const offset = 80; // Navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCTAClick = () => {
    handleNavigate('contact');
    
    // Track CTA click
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'CTA Click',
        content_category: 'Engagement'
      });
    }
  };

  // Hidden admin access trigger - Triple click handler
  const handleAdminTriggerClick = () => {
    if (adminTriggerRef.current.timer) {
      clearTimeout(adminTriggerRef.current.timer);
    }

    adminTriggerRef.current.clicks += 1;

    if (adminTriggerRef.current.clicks === 3) {
      setShowAdminLogin(true);
      adminTriggerRef.current.clicks = 0;
      toast.info('Acesso administrativo ativado', { duration: 2000 });
    }

    adminTriggerRef.current.timer = setTimeout(() => {
      adminTriggerRef.current.clicks = 0;
    }, 1000);
  };

  // Show loading screen
  if (isLoading && !isAdmin && !showAdminLogin && !isAdsLanding) {
    return <LoadingScreen />;
  }

  // Admin Panel View
  if (isAdmin) {
    return (
      <ErrorBoundary>
        <SEOHead title="Painel CEO - EXTRAORDINÁ.RA." />
        <Toaster position="top-right" richColors />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando painel...</div>}>
          <AdminPanel onLogout={handleAdminLogout} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Admin Login Modal
  if (showAdminLogin && !isAdmin) {
    return (
      <>
        <SEOHead title="Login Administrativo - EXTRAORDINÁRI.A." />
        <Toaster position="top-right" richColors />
        <PageTransition>
          <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="bg-card border border-primary/30 rounded-2xl p-8 max-w-md w-full relative shadow-2xl shadow-primary/20">
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                  setLoginAttempts(0);
                  window.history.pushState({}, '', window.location.pathname);
                }}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/50">
                <Lock className="w-8 h-8 text-black" />
              </div>
              
              <h2 className="text-3xl font-black mb-2 text-center">Acesso Administrativo</h2>
              <p className="text-white/60 text-center mb-8">
                Área restrita - Somente CEO
              </p>
              
              {loginAttempts >= 3 && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">
                    Múltiplas tentativas falhadas detectadas. Aguarde 30 segundos antes de tentar novamente.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-bold" htmlFor="admin-password">
                    Senha de Acesso
                  </label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="bg-secondary border-white/10 focus:border-primary/50"
                    autoFocus
                    disabled={loginAttempts >= 3}
                    aria-label="Senha de acesso administrativo"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary text-black hover:bg-primary/90 font-black text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loginAttempts >= 3}
                >
                  Acessar Painel
                </Button>
              </form>
              
              <p className="text-xs text-white/40 text-center mt-6">
                Este painel contém ferramentas sensíveis. Mantenha suas credenciais seguras.
              </p>
            </div>
          </div>
        </PageTransition>
      </>
    );
  }

  // BotGPT Product Page
  if (isBotGPTPage) {
    return (
      <ErrorBoundary>
        <SEOHead 
          title="BotGPT - Atendente Virtual 24/7 para WhatsApp | EXTRAORDINÁ.RA."
          description="Tenha seu próprio atendente virtual que responde clientes, fecha pedidos e agenda serviços 24/7 pelo WhatsApp. Teste grátis por 7 dias!"
          keywords="chatbot whatsapp, bot atendimento, automação whatsapp, atendimento 24 7, bot vendas, chatbot restaurante, chatbot clinica"
        />
        <TrackingScripts 
          metaPixelId="YOUR_META_PIXEL_ID"
          googleAnalyticsId="G-XXXXXXXXXX"
          googleAdsId="AW-XXXXXXXXXX"
        />
        <Toaster position="top-right" richColors />
        <SkipToContent />
        <PageTransition>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando produto...</div>}>
            <BotGPTProduct />
          </Suspense>
        </PageTransition>
      </ErrorBoundary>
    );
  }

  // ADS Landing Page
  if (isAdsLanding) {
    return (
      <>
        <SEOHead 
          title={`${adsCampaign.toUpperCase()} - EXTRAORDINÁRI.A.`}
          description="Transforme sua empresa com IA. Consultoria, automação e resultados mensuráveis. Agende uma demonstração gratuita agora!"
        />
        <TrackingScripts 
          metaPixelId="YOUR_META_PIXEL_ID"
          googleAnalyticsId="G-XXXXXXXXXX"
          googleAdsId="AW-XXXXXXXXXX"
        />
        <Toaster position="top-right" richColors />
        <PageTransition>
          <LandingPageAds source={adsSource} campaign={adsCampaign} />
        </PageTransition>
      </>
    );
  }

  // Main Website
  return (
    <>
      <SEOHead />
      <TrackingScripts 
        metaPixelId="YOUR_META_PIXEL_ID"
        googleAnalyticsId="G-XXXXXXXXXX"
        googleAdsId="AW-XXXXXXXXXX"
      />
      <Toaster position="top-right" richColors />
      <SkipToContent />
      
      <div className="min-h-screen bg-black text-white">
        <ScrollIndicator />
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
        
    <main id="main-content" role="main">
          <section id="home">
            <Hero onCTAClick={handleCTAClick} />
          </section>
          
          <section id="stats">
            <GlobalStats />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="ecosystem">
            <Ecosystem />
          </section>
        
          <section id="solutions">
            <Solutions onCTAClick={handleCTAClick} />
          </section>
          
          <section id="cases">
            <Cases onCTAClick={handleCTAClick} />
          </section>
          
          <section id="experience">
            <Experience onCTAClick={handleCTAClick} />
          </section>
          
          <section id="pricing">
            <PricingPlans onCTAClick={handleCTAClick} />
          </section>
          
          <section id="schedule">
            <CalendlyIntegration />
          </section>
          
          <section id="blog">
            <Blog />
          </section>
          
          <section id="social">
            <SocialMediaLinks />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>
        
        <Footer />
        
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
        <BackToTop />
        
        {/* Hidden Admin Access Trigger - Triple click */}
        <button
          onClick={handleAdminTriggerClick}
          className="fixed bottom-4 left-4 w-12 h-12 opacity-0 cursor-default z-0"
          aria-label="Admin Access Trigger"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
