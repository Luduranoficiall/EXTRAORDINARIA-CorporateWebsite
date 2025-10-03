import { motion } from 'motion/react';
import { Calendar, Clock, Video, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function CalendlyIntegration() {
  const handleSchedule = () => {
    // Em produção, isso abriria o widget do Calendly
    // Calendly.initPopupWidget({url: 'https://calendly.com/extraordinaria'});
    alert('Integração Calendly: Em produção, isto abrirá o agendamento direto.\n\nPor enquanto, use o formulário de contato ou WhatsApp para agendar sua EXPERIENCI.A.');
  };

  const benefits = [
    'Duração: 60-90 minutos',
    'Totalmente gratuita',
    'Online ou presencial',
    'Sem compromisso',
  ];

  const process = [
    {
      icon: Calendar,
      title: 'Escolha Data e Hora',
      description: 'Selecione o melhor horário na sua agenda',
    },
    {
      icon: Video,
      title: 'Receba Confirmação',
      description: 'Link de reunião enviado por e-mail',
    },
    {
      icon: CheckCircle,
      title: 'Participe da Experiência',
      description: 'Descubra como IA pode 10x seu negócio',
    },
  ];

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-bold">Agendamento Rápido</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Agende Sua <span className="text-primary glow-text">EXPERIENCI.A.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Escolha o melhor horário e prepare-se para descobrir o potencial extraordinário do seu negócio
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left - Process */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-black mb-8">Como Funciona</h3>
            
            {process.map((step, index) => (
              <Card key={index} className="bg-card border-white/10 p-6 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-black text-sm">{index + 1}</span>
                      </div>
                      <h4 className="font-black text-lg">{step.title}</h4>
                    </div>
                    <p className="text-white/70 text-sm">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Right - CTA & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-primary/20 to-card border-primary/30 p-8 h-full flex flex-col">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Agende em 2 minutos</span>
                </div>

                <h3 className="text-3xl font-black mb-6">
                  Reserve Seu Horário Agora
                </h3>

                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-black/30 border border-white/10 rounded-lg p-6 mb-8">
                  <p className="text-white/70 text-sm leading-relaxed">
                    <span className="text-primary font-bold">O que você receberá:</span><br />
                    ✓ Diagnóstico inicial gratuito<br />
                    ✓ Demonstração prática de soluções IA<br />
                    ✓ Roadmap personalizado<br />
                    ✓ Proposta sob medida (sem compromisso)
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSchedule}
                className="w-full bg-primary text-black hover:bg-primary/90 font-black text-lg py-6 flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                Escolher Data e Hora
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-xs text-white/50 text-center mt-4">
                Ou entre em contato via WhatsApp para agendar
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '127+', label: 'Experiências Realizadas' },
            { value: '4.9/5', label: 'Avaliação Média' },
            { value: '94%', label: 'Taxa de Conversão' },
            { value: '100%', label: 'Satisfação Garantida' },
          ].map((stat, index) => (
            <Card key={index} className="bg-card/30 border-white/10 p-4 text-center">
              <div className="text-2xl font-black text-primary mb-1">{stat.value}</div>
              <p className="text-xs text-white/60">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}