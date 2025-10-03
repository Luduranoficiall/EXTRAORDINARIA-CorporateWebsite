import { useEffect } from 'react';

interface TrackingScriptsProps {
  metaPixelId?: string;
  googleAnalyticsId?: string;
  googleAdsId?: string;
}

export function TrackingScripts({ 
  metaPixelId = 'YOUR_META_PIXEL_ID', 
  googleAnalyticsId = 'G-XXXXXXXXXX',
  googleAdsId = 'AW-XXXXXXXXXX'
}: TrackingScriptsProps) {
  
  useEffect(() => {
    // Meta Pixel (Facebook/Instagram Ads)
    if (metaPixelId && metaPixelId !== 'YOUR_META_PIXEL_ID') {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      (window as any).fbq('init', metaPixelId);
      (window as any).fbq('track', 'PageView');

      // Track key events
      const trackEvent = (eventName: string, data?: any) => {
        if ((window as any).fbq) {
          (window as any).fbq('track', eventName, data);
        }
      };

      // Expose tracking function globally
      (window as any).trackMetaEvent = trackEvent;
    }

    // Google Analytics 4
    if (googleAnalyticsId && googleAnalyticsId !== 'G-XXXXXXXXXX') {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;

      gtag('js', new Date());
      gtag('config', googleAnalyticsId);

      // Google Ads Conversion
      if (googleAdsId && googleAdsId !== 'AW-XXXXXXXXXX') {
        gtag('config', googleAdsId);
      }
    }

    // Event listeners for automatic tracking
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if ((window as any).fbq) {
        (window as any).fbq('track', 'SubmitApplication', {
          content_name: form.id || 'Lead Form',
          content_category: 'Lead'
        });
      }
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Form',
          event_label: form.id || 'Lead Form'
        });
      }
    };

    const handlePhoneClick = (e: Event) => {
      const link = e.target as HTMLAnchorElement;
      if (link.href.includes('tel:')) {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Contact', {
            content_name: 'Phone Click',
            content_category: 'Contact'
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag('event', 'phone_click', {
            event_category: 'Contact'
          });
        }
      }
    };

    const handleWhatsAppClick = (e: Event) => {
      const link = e.target as HTMLAnchorElement;
      if (link.href.includes('wa.me') || link.href.includes('whatsapp')) {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Contact', {
            content_name: 'WhatsApp Click',
            content_category: 'Contact'
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag('event', 'whatsapp_click', {
            event_category: 'Contact'
          });
        }
      }
    };

    // Add event listeners
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        handlePhoneClick(e);
        handleWhatsAppClick(e);
      }
    });

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, [metaPixelId, googleAnalyticsId, googleAdsId]);

  return (
    <>
      {/* Meta Pixel noscript fallback */}
      {metaPixelId && metaPixelId !== 'YOUR_META_PIXEL_ID' && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}

// Helper function to track custom conversions
export const trackConversion = (conversionType: string, value?: number, data?: any) => {
  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', conversionType, {
      value: value,
      currency: 'BRL',
      ...data
    });
  }

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXXX/' + conversionType,
      value: value,
      currency: 'BRL',
      ...data
    });
  }
};

// Helper to track page views in SPA
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if ((window as any).fbq) {
    (window as any).fbq('track', 'PageView');
  }

  if ((window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};