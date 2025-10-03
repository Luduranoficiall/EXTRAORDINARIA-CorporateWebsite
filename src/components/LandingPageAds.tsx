import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Users,
  Clock,
  Shield,
  Sparkles,
  BarChart,
  Bot,
  GraduationCap
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface LandingPageAdsProps {
  source?: string; // Para tracking de origem do tráfego
  campaign?: string; // Para tracking de campanha específica
}

export function LandingPageAds({ source = 'organic', campaign = 'general' }: LandingPageAdsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'consultoria'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: formData.interest,
        content_category: 'Lead Form',
        source: source,
        campaign: campaign
      });
    }

    // Track Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'Lead',
        event_label: formData.interest,
        value: 1
      });
    }

    // Simulação de envio - Integrar com Zoho CRM ou API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const benefits = [
    { icon: TrendingUp, text: 'Aumente suas vendas em até 40%', color: 'text-green-400' },
    { icon: Zap, text: 'Reduza custos operacionais em 70%', color: 'text-yellow-400' },
    { icon: Clock, text: 'Economize 40h/semana da sua equipe', color: 'text-blue-400' },
    { icon: Users, text: 'Atendimento 24/7 automatizado', color: 'text-purple-400' }
  ];

  const solutions = [
    {
      icon: Brain,
      title: 'Consultoria Estratégica',
      description: 'Transforme seu negócio com IA aplicada',
      features: ['Diagnóstico completo', 'Estratégia personalizada', 'ROI garantido'],
      highlight: 'Mais Vendido'
    },
    {
      icon: Bot,
      title: 'Chatbots Inteligentes',
      description: 'Atenda e venda 24/7 no automático',
      features: ['Integração WhatsApp', 'Vendas automatizadas', 'Suporte inteligente'],
      highlight: 'Resultado Rápido'
    },
    {
      icon: Zap,
      title: 'Automações',
      description: 'Elimine tarefas repetitivas',
      features: ['Processos otimizados', 'Economia de tempo', 'Mais produtividade'],
      highlight: 'Economia Garantida'
    },
    {
      icon: GraduationCap,
      title: 'Treinamentos',
      description: 'Capacite sua equipe em IA',
      features: ['Aprendizado prático', 'Cases reais', 'Certificação'],
      highlight: 'Transformação'
    }
  ];

  const testimonials = [
    {
      name: 'Roberto Silva',
      company: 'E-commerce de Moda',
      text: 'Aumentamos as vendas em 10x e nossa equipe está mais feliz. A EXPERIENCI.A. nos mostrou o caminho.',
      result: '+10x ROI'
    },
    {
      name: 'Ana Costa',
      company: 'Consultoria B2B',
      text: 'Reduzimos custos em 70% e aumentamos a produtividade em 5x. Somos agora DIFERENCI.A.DAS no mercado.',
      result: '70% economia'
    },
    {
      name: 'Carlos Mendes',
      company: 'Restaurante',
      text: 'O chatbot atende nossos clientes 24/7. Nunca perdemos mais um pedido por falta de atendimento.',
      result: '+40% vendas'
    }
  ];

  const guarantees = [
    { icon: Shield, text: 'Garantia de resultados ou seu dinheiro de volta' },
    { icon: Clock, text: 'Implementação rápida em até 30 dias' },
    { icon: Users, text: 'Suporte contínuo e treinamento incluído' },
    { icon: Star, text: 'Satisfação de 98% dos nossos clientes' }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/50 rounded-3xl p-12 max-w-2xl text-center"
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          
          <h2 className="text-4xl font-black mb-4">
            🎉 Parabéns, {formData.name.split(' ')[0]}!
          </h2>
          
          <p className="text-xl text-white/80 mb-8">
            Sua solicitação foi recebida com sucesso. Nossa equipe entrará em contato em até{' '}
            <span className="text-primary font-bold">24 horas</span> para agendar sua{' '}
            <span className="text-primary font-bold glow-text">EXPERIENCI.A.</span> gratuita!
          </p>
          
          <div className="bg-card border border-primary/30 rounded-xl p-6 mb-8">
            <p className="text-sm text-white/60 mb-4">Enquanto isso, conheça mais sobre nossas soluções:</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Badge variant="outline" className="border-primary/50 text-primary">
                Consultoria Estratégica
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                Chatbots 24/7
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                Automações
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-white/40">
            📧 Enviamos um e-mail de confirmação para <span className="text-primary">{formData.email}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Above the Fold */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Badge className="bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30 text-base px-6 py-2 animate-pulse">
                🔥 Vagas Limitadas: Apenas 5 consultorias gratuitas este mês
              </Badge>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Copy */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  Sua Empresa Pode Ser{' '}
                  <span className="text-primary glow-text">DIFERENCI.A.DA</span>
                </h1>
                
                <p className="text-2xl text-white/80 mb-8 leading-relaxed">
                  Transforme seu negócio com <span className="text-primary font-bold">IA FIRST</span>: 
                  consultoria, automações, chatbots e treinamentos que geram{' '}
                  <span className="font-bold">resultados reais</span>
                </p>

                {/* Benefits List */}
                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 ${benefit.color} bg-current/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <span className="text-lg font-bold">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-primary/20 border-2 border-black flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary" fill="currentColor" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm text-white/60">
                      +150 empresas transformadas • 4.9/5.0
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Lead Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-card to-transparent border border-primary/30 rounded-3xl p-8 lg:p-10 shadow-2xl"
              >
                <div className="text-center mb-6">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-black mb-2">
                    Agende sua EXPERIENCI<span className="text-primary">.A</span>.
                  </h3>
                  <p className="text-white/70">
                    <span className="font-bold text-primary">100% Gratuita</span> • Sem compromisso • Resultados garantidos
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-secondary border-white/10 focus:border-primary/50 text-lg py-6"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-secondary border-white/10 focus:border-primary/50 text-lg py-6"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="WhatsApp (com DDD)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-secondary border-white/10 focus:border-primary/50 text-lg py-6"
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="Nome da sua empresa"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="bg-secondary border-white/10 focus:border-primary/50 text-lg py-6"
                    />
                  </div>

                  <div>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-secondary border border-white/10 focus:border-primary/50 rounded-lg px-4 py-4 text-lg"
                    >
                      <option value="consultoria">Consultoria Estratégica</option>
                      <option value="chatbot">Chatbot Inteligente</option>
                      <option value="automacao">Automações</option>
                      <option value="treinamento">Treinamentos</option>
                      <option value="completo">Solução Completa</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black hover:bg-primary/90 font-black text-xl py-8 rounded-xl group"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        Quero Transformar Meu Negócio AGORA
                        <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-white/40 text-center">
                    🔒 Seus dados estão seguros. Não enviamos spam.
                  </p>
                </form>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Sem cartão</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Sem compromisso</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Numbers */}
      <section className="py-20 bg-gradient-to-b from-secondary to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: '150+', label: 'Empresas Transformadas' },
              { number: '10x', label: 'Média de ROI' },
              { number: '70%', label: 'Redução de Custos' },
              { number: '98%', label: 'Satisfação' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-primary mb-2">{stat.number}</div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6">
              Soluções que <span className="text-primary glow-text">Transformam</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Escolha a solução ideal para o seu negócio ou combine várias para resultados extraordinários
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
              >
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                  {solution.highlight}
                </Badge>
                
                <solution.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                
                <h3 className="text-xl font-black mb-2">{solution.title}</h3>
                <p className="text-white/60 mb-4 text-sm">{solution.description}</p>
                
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black to-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6">
              Empresas <span className="text-primary glow-text">DIFERENCI.A.DAS</span>
            </h2>
            <p className="text-xl text-white/70">
              Veja o que nossos clientes alcançaram com nossas soluções
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-white/10 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-white/80 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.company}</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {testimonial.result}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-black mb-4">
                Nossa <span className="text-primary glow-text">Garantia</span> para Você
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {guarantees.map((guarantee, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-card border border-primary/30 rounded-xl p-6"
                >
                  <guarantee.icon className="w-10 h-10 text-primary flex-shrink-0" />
                  <p className="font-bold">{guarantee.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30 text-base px-6 py-2 mb-6 animate-pulse">
              ⏰ Última chance: Apenas 5 vagas restantes este mês
            </Badge>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Pronto para Ser <span className="text-primary glow-text">EXTRAORDINÁRI.A.</span>?
            </h2>
            
            <p className="text-2xl text-white/80 mb-10">
              Agende agora sua <span className="text-primary font-bold">EXPERIENCI.A.</span> gratuita 
              e descubra como transformar seu negócio com IA
            </p>

            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-black hover:bg-primary/90 font-black text-2xl px-12 py-8 rounded-xl group"
            >
              Sim, Quero Transformar Meu Negócio!
              <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>

            <p className="text-sm text-white/40 mt-6">
              ✅ Consultoria gratuita • ✅ Sem compromisso • ✅ Resultados garantidos
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}