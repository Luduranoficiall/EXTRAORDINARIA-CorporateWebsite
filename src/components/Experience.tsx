import { motion } from 'motion/react';
import { Sparkles, Users, Lightbulb, Target, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface ExperienceProps {
  onCTAClick: () => void;
}

export function Experience({ onCTAClick }: ExperienceProps) {
  const experienceTypes = [
    {
      icon: Lightbulb,
      title: 'Workshop de Descoberta',
      duration: '4 horas',
      description: 'Sessão prática onde mapeamos oportunidades de IA no seu negócio e demonstramos casos reais de transformação.',
    },
    {
      icon: Users,
      title: 'Imersão Empresarial',
      duration: '1 dia',
      description: 'Vivência completa com sua equipe: diagnóstico, prototipagem de soluções e plano de implementação personalizado.',
    },
    {
      icon: Target,
      title: 'Sprint de Transformação',
      duration: '1 semana',
      description: 'Programa intensivo com implementação prática de automações, treinamento e acompanhamento em tempo real.',
    },
  ];

  const benefits = [
    'Sinta na prática como IA transforma seu negócio',
    'Construa soluções reais durante a imersão',
    'Descubra como ser DIFERENCI.A.DA das demais',
    'Receba diagnóstico de oportunidades com IA',
    'Prototipe automações e chatbots personalizados',
    'Capacite sua equipe com treinamentos práticos',
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-secondary to-black">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-8 py-4 mb-8">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-black text-xl">
              Nosso Diferencial
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            EXPERIENCI<span className="text-primary glow-text">.A</span>.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            sua empresa pode se tornar <span className="text-primary font-bold glow-text">DIFERENCI.A.DA</span> em relação às demais. 
            Vivências transformadoras onde tecnologia e humanidade se encontram para gerar resultados extraordinários
          </p>
        </motion.div>

        {/* What is EXPERIENCIA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 mb-20 max-w-5xl mx-auto"
        >
          <h3 className="text-4xl font-black mb-6">O Nosso Diferencial Competitivo</h3>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            A EXPERIENCI<span className="text-primary">.A</span>. é o coração da nossa abordagem{' '}
            <span className="text-primary font-bold glow-text">IA FIRST</span>. São <span className="font-bold">imersões 
            e vivências práticas</span> onde você e sua equipe não apenas aprendem sobre IA — vocês{' '}
            <span className="font-bold">sentem na prática</span> o poder transformador da tecnologia aplicada ao seu negócio.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            Aqui, sua empresa descobre como se tornar <span className="text-primary font-bold glow-text">DIFERENCI.A.DA</span> das 
            demais. Construímos juntos soluções reais — automações, chatbots, estratégias — que geram resultados imediatos 
            e preparam seu negócio para o futuro.
          </p>
        </motion.div>

        {/* Experience Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {experienceTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all hover:scale-105"
            >
              <type.icon className="w-14 h-14 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-black mb-2">{type.title}</h3>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">{type.duration}</span>
              </div>
              <p className="text-white/70 leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-primary/30 rounded-2xl p-12 mb-12 max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-black mb-8 text-center">O Que Você Vai Vivenciar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-black mb-12 text-center">Depoimentos de Quem Viveu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "A EXPERIENCI.A. mudou completamente nossa visão sobre IA. Em 4 horas, conseguimos prototipar uma solução que economizaria R$ 50 mil por mês.",
                author: "Carlos Silva",
                role: "CEO, TechCorp Solutions",
              },
              {
                quote: "Não foi apenas uma apresentação, foi uma transformação real. Saímos com um roadmap claro e a equipe engajada para implementar IA.",
                author: "Marina Costa",
                role: "Diretora de Operações, Varejo Plus",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card border border-white/10 rounded-xl p-8">
                <p className="text-white/80 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 rounded-2xl p-12 max-w-4xl mx-auto">
            <Sparkles className="w-16 h-16 text-primary mb-6 mx-auto" />
            <h3 className="text-4xl font-black mb-6">
              Comece Sua Jornada Agora
            </h3>
            <p className="text-xl text-white/70 mb-8">
              Agende sua EXPERIENCI<span className="text-primary">.A</span>. gratuita e descubra como 
              sua empresa pode se tornar extraordinária
            </p>
            <Button
              onClick={onCTAClick}
              size="lg"
              className="bg-primary text-black hover:bg-primary/90 font-black text-xl px-16 py-10 glow-border"
            >
              Agendar Minha EXPERIENCI.A. Agora
            </Button>
            <p className="text-white/50 text-sm mt-6">
              Vagas limitadas • Sem compromisso • 100% prático
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
