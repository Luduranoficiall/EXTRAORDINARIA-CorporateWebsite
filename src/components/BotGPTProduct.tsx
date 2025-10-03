import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Smartphone,
  Calendar,
  ShoppingCart,
  Users,
  ArrowRight,
  PlayCircle,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BotGPTDemo } from './BotGPTDemo';
import { TrialForm } from './TrialForm';

export function BotGPTProduct() {
  const benefits = [
    {
      icon: Clock,
      title: 'Atendimento 24/7',
      description: 'Seu cliente é atendido a qualquer hora, mesmo de madrugada ou fim de semana',
    },
    {
      icon: TrendingUp,
      title: 'Aumento de 40% nas Vendas',
      description: 'Dados reais mostram crescimento médio de 40% no faturamento com atendimento automatizado',
    },
    {
      icon: Zap,
      title: 'Respostas Instantâneas',
      description: 'Acaba com a espera. Cliente pergunta, bot responde na hora',
    },
    {
      icon: ShoppingCart,
      title: 'Fecha Pedidos Automaticamente',
      description: 'Recebe pedidos, envia cardápio, agenda serviços - tudo sem você mexer um dedo',
    },
    {
      icon: Users,
      title: 'Sem Aumentar Equipe',
      description: 'Atenda 10x mais sem contratar ninguém. Economia de até 70% em custos',
    },
    {
      icon: BarChart3,
      title: 'Relatórios Inteligentes',
      description: 'Veja o que seus clientes perguntam, quando compram e quanto você vende',
    },
  ];

  const useCases = [
    {
      icon: '🍕',
      title: 'Restaurantes & Pizzarias',
      description: 'Recebe pedidos, envia cardápio, informa tempo de entrega',
      results: '+45% pedidos via WhatsApp',
    },
    {
      icon: '💉',
      title: 'Clínicas & Consultórios',
      description: 'Agenda consultas, confirma horários, envia lembretes',
      results: '-60% faltas em agendamentos',
    },
    {
      icon: '🏠',
      title: 'Imobiliárias',
      description: 'Envia fotos, agenda visitas, qualifica interessados',
      results: '+35% conversão de leads',
    },
    {
      icon: '💪',
      title: 'Academias & Salões',
      description: 'Marca horários, confirma presença, vende planos',
      results: '+50% agendamentos online',
    },
    {
      icon: '🛒',
      title: 'E-commerces',
      description: 'Tira dúvidas, rastreia pedidos, recupera carrinhos',
      results: '+30% taxa de conversão',
    },
    {
      icon: '🔧',
      title: 'Oficinas & Serviços',
      description: 'Agenda atendimentos, envia orçamentos, confirma serviços',
      results: '-40% tempo de resposta',
    },
  ];

  const plans = [
    {
      name: 'Essencial',
      price: 'R$ 97',
      period: '/mês',
      description: 'Perfeito para começar a automatizar',
      features: [
        'FAQ Inteligente (até 50 perguntas)',
        '1 canal (Site OU WhatsApp)',
        'Captura de leads automática',
        'Relatórios básicos',
        'Suporte por e-mail',
        'Configuração inclusa',
      ],
      cta: 'Testar 7 Dias Grátis',
      popular: false,
    },
    {
      name: 'Avançado',
      price: 'R$ 197',
      period: '/mês',
      description: 'Ideal para negócios em crescimento',
      features: [
        'FAQ Inteligente (ilimitado)',
        '2 canais (Site + WhatsApp)',
        'Agendamento automático',
        'Integração com calendário',
        'Relatórios avançados',
        'Suporte prioritário',
        'Configuração + treinamento',
        'Branding personalizado',
      ],
      cta: 'Testar 7 Dias Grátis',
      popular: true,
    },
    {
      name: 'Premium',
      price: 'R$ 497',
      period: '/mês',
      description: 'Solução completa para escalar',
      features: [
        'Tudo do Avançado +',
        'Múltiplos canais (ilimitado)',
        'Integração CRM/ERP',
        'Processamento de pedidos',
        'IA personalizada para seu negócio',
        'Relatórios executivos',
        'Suporte dedicado (WhatsApp)',
        'Consultoria mensal inclusa',
        'Atualizações prioritárias',
      ],
      cta: 'Testar 7 Dias Grátis',
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Carlos Mendes',
      role: 'Dono - Pizzaria Bella Massa',
      text: 'Antes eu perdia uns 20 pedidos por dia porque minha equipe não dava conta. Agora o bot atende todo mundo na hora. Faturamento subiu 40% em 2 meses!',
      rating: 5,
    },
    {
      name: 'Dra. Juliana Santos',
      role: 'Clínica Odontológica',
      text: 'Acabou aquela dor de cabeça de confirmar consulta por telefone. O bot faz tudo sozinho e minhas faltas caíram de 30% para menos de 5%.',
      rating: 5,
    },
    {
      name: 'Roberto Alves',
      role: 'Imobiliária Horizonte',
      text: 'Meus clientes adoram! Envio fotos dos imóveis automaticamente, marco visitas sem precisar ficar no WhatsApp o dia todo. Vendi 12 imóveis a mais esse mês.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-primary/10 border border-primary/30 text-primary mb-6 px-6 py-3 text-lg">
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Lançamento Especial - Teste Grátis por 7 Dias
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              BotGPT by <span className="text-primary glow-text">EXTRAORDINÁRI.A.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 mb-6 max-w-4xl mx-auto leading-relaxed">
              Seu Próprio Atendente Virtual 24h que Responde Clientes, Fecha Pedidos e Agenda Serviços pelo WhatsApp
            </p>

            <p className="text-xl text-primary font-bold mb-8">
              ✓ Sem Código ✓ Sem Complicação ✓ Resultado em 48 horas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => {
                  const element = document.getElementById('trial-form');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary text-black hover:bg-primary/90 font-black text-xl px-12 py-8 shadow-lg shadow-primary/50"
              >
                Testar 7 Dias Grátis
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>

              <Button
                onClick={() => {
                  const element = document.getElementById('demo');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 font-black text-xl px-12 py-8"
              >
                <PlayCircle className="w-6 h-6 mr-2" />
                Ver Demonstração
              </Button>
            </div>

            <p className="text-sm text-white/50 mt-6">
              🎯 Mais de 150 empresas já automatizaram com BotGPT
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {[
              { value: '40%', label: 'Aumento Médio em Vendas' },
              { value: '24/7', label: 'Atendimento Ininterrupto' },
              { value: '70%', label: 'Redução de Custos' },
              { value: '48h', label: 'Entrega do Bot Pronto' },
            ].map((stat, index) => (
              <Card key={index} className="bg-card/50 border-primary/30 p-6 text-center">
                <p className="text-4xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Por Que Você Precisa do <span className="text-primary">BotGPT</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Pare de perder clientes porque não consegue atender a todos. Seu bot trabalha enquanto você dorme.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card border-white/10 p-8 hover:border-primary/50 transition-all h-full">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Funciona para o <span className="text-primary">Seu Negócio</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Não importa o setor, BotGPT se adapta às necessidades da sua empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30 p-8 hover:border-primary/50 transition-all">
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-black mb-3">{useCase.title}</h3>
                  <p className="text-white/70 mb-4 text-sm">{useCase.description}</p>
                  <div className="bg-primary/20 border border-primary/30 rounded-lg px-4 py-2 inline-block">
                    <p className="text-primary font-bold text-sm">{useCase.results}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Veja o <span className="text-primary">BotGPT</span> em Ação
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Teste agora mesmo e veja como seria seu atendente virtual funcionando
            </p>
          </motion.div>

          <BotGPTDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Escolha Seu <span className="text-primary">Plano</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Sem contrato de fidelidade. Cancele quando quiser. Teste grátis por 7 dias.
            </p>
            <Badge className="bg-primary text-black px-6 py-3 text-lg">
              🎁 7 Dias Grátis + Configuração Inclusa em Todos os Planos
            </Badge>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={plan.popular ? 'md:-mt-4' : ''}
              >
                <Card className={`relative p-8 h-full flex flex-col ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary shadow-xl shadow-primary/20' 
                    : 'bg-card border-white/10'
                }`}>
                  {plan.popular && (
                    <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-6 py-2">
                      ⭐ MAIS VENDIDO
                    </Badge>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-primary">{plan.price}</span>
                      <span className="text-white/60">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      const element = document.getElementById('trial-form');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full font-black text-lg py-6 ${
                      plan.popular
                        ? 'bg-primary text-black hover:bg-primary/90'
                        : 'bg-secondary border border-primary/30 hover:bg-primary/10'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              O Que Nossos <span className="text-primary">Clientes</span> Dizem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card border-white/10 p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Form Section */}
      <section id="trial-form" className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <TrialForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Pronto para <span className="text-primary">Transformar</span> seu Atendimento?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Não perca mais clientes. Não deixe dinheiro na mesa. Teste grátis por 7 dias e veja a diferença.
            </p>

            <div className="flex flex-col items-center gap-6">
              <Button
                onClick={() => {
                  const element = document.getElementById('trial-form');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary text-black hover:bg-primary/90 font-black text-2xl px-16 py-8 shadow-xl shadow-primary/30"
              >
                Começar Teste Grátis Agora
                <Sparkles className="w-6 h-6 ml-3" />
              </Button>

              <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Sem cartão de crédito
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Configuração inclusa
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Cancele quando quiser
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
