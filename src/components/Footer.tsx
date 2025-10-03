import { Brain, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-10 h-10 text-primary animate-pulse" strokeWidth={1.5} />
              <span className="text-2xl font-black">
                EXTRAORDINÁRI<span className="text-primary glow-text">I.A.</span>
              </span>
            </div>
            <p className="text-white/60 mb-6 leading-relaxed">
              Transformando negócios e pessoas com{' '}
              <span className="text-primary font-bold">AI First . People Always.</span>
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-secondary border border-white/10 rounded-full flex items-center justify-center hover:border-primary/50 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary border border-white/10 rounded-full flex items-center justify-center hover:border-primary/50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary border border-white/10 rounded-full flex items-center justify-center hover:border-primary/50 transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Ecossistema */}
          <div>
            <h4 className="font-black mb-6">Ecossistema</h4>
            <ul className="space-y-3">
              {[
                'ECONOMI.A.',
                'ENERGI.A.',
                'BOTGPT',
                'ACADEMI.A.',
                'EXPERIENCI.A.',
                'CONSULTORI.A.',
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/60 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="font-black mb-6">Soluções</h4>
            <ul className="space-y-3">
              {[
                'Chatbots Inteligentes',
                'Automações',
                'Análise de Dados',
                'Treinamentos',
                'Consultoria',
                'Auditoria',
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/60 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-black mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:contato@extraordinaria.ai"
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  contato@extraordinaria.ai
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60">(11) 9999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60">www.extraordinaria.ai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {year} EXTRAORDINÁRI<span className="text-primary">.A</span>. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
