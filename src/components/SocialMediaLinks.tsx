import { motion } from 'motion/react';
import { Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
import { Button } from './ui/button';

export function SocialMediaLinks() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/extraordinaria.ai',
      handle: '@extraordinaria.ai',
      color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500',
      description: 'Dicas diárias de IA'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/extraordinaria',
      handle: 'EXTRAORDINÁRI.A.',
      color: 'hover:bg-blue-600',
      description: 'Conteúdo corporativo'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@extraordinaria',
      handle: 'Canal EXTRAORDINARIA',
      color: 'hover:bg-red-600',
      description: 'Tutoriais e cases'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/extraordinaria.ai',
      handle: 'extraordinaria.ai',
      color: 'hover:bg-blue-500',
      description: 'Comunidade ativa'
    }
  ];

  const handleSocialClick = (socialName: string, url: string) => {
    // Track social media clicks
    if ((window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: `Social Click - ${socialName}`,
        content_category: 'Social Media'
      });
    }
    if ((window as any).gtag) {
      (window as any).gtag('event', 'social_click', {
        event_category: 'Social Media',
        event_label: socialName
      });
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Conecte-se com a <span className="text-primary glow-text">EXTRAORDINÁRI.A.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Siga-nos nas redes sociais e fique por dentro de tudo sobre IA, transformação 
            digital e cases de sucesso
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => handleSocialClick(social.name, social.url)}
                className={`w-full bg-card border border-white/10 rounded-2xl p-6 transition-all duration-300 ${social.color} hover:border-transparent hover:scale-105 hover:shadow-2xl`}
              >
                <social.icon className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                
                <h3 className="font-black text-xl mb-1">{social.name}</h3>
                <p className="text-sm text-white/60 mb-2">{social.handle}</p>
                <p className="text-xs text-white/40">{social.description}</p>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-sm font-bold group-hover:text-white transition-colors">
                    Seguir →
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-card border border-primary/30 rounded-full px-8 py-4">
            <div>
              <p className="text-2xl font-black text-primary">10K+</p>
              <p className="text-sm text-white/60">Seguidores</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-2xl font-black text-primary">500+</p>
              <p className="text-sm text-white/60">Posts</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-2xl font-black text-primary">95%</p>
              <p className="text-sm text-white/60">Engajamento</p>
            </div>
          </div>
        </motion.div>

        {/* Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/70 mb-4">
            📱 Junte-se à nossa comunidade e receba conteúdos exclusivos sobre IA
          </p>
          <Button
            onClick={() => handleSocialClick('WhatsApp Community', 'https://chat.whatsapp.com/XXX')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg"
          >
            Entrar no Grupo do WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}