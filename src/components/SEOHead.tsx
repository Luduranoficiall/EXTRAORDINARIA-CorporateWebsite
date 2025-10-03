import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export function SEOHead({
  title = 'EXTRAORDINÁRI.A. - Transformação Empresarial com IA',
  description = 'AI First. People Always. Transforme sua empresa com consultoria, auditoria e mentoria em IA. Soluções plug & play que tornam empresas 10x melhores sem perder a essência humana.',
  keywords = 'inteligência artificial, IA, consultoria, transformação digital, automação, chatbots, gestão empresarial, PME, inovação',
  ogImage = 'https://extraordinaria.ai/og-image.jpg',
  url = 'https://extraordinaria.ai'
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'EXTRAORDINÁRI.A.');
    updateMeta('robots', 'index, follow');
    updateMeta('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:url', url, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:site_name', 'EXTRAORDINÁRI.A.', true);
    
    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    
    // Additional SEO tags
    updateMeta('theme-color', '#00d4ff');
    updateMeta('msapplication-TileColor', '#00d4ff');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'EXTRAORDINÁRI.A.',
      description: description,
      url: url,
      logo: `${url}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'contato@extraordinaria.ai',
        availableLanguage: 'Portuguese'
      },
      sameAs: [
        'https://linkedin.com/company/extraordinaria',
        'https://instagram.com/extraordinaria.ai',
        'https://facebook.com/extraordinaria.ai'
      ],
      areaServed: 'BR',
      serviceType: [
        'Consultoria em Inteligência Artificial',
        'Transformação Digital',
        'Automação Empresarial',
        'Desenvolvimento de Chatbots'
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, ogImage, url]);

  return null;
}
