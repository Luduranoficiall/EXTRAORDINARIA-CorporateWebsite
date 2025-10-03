import { motion } from 'motion/react';
import { Bot, Cog, GraduationCap, BarChart, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface SolutionsProps {
  onCTAClick: () => void;
}

export function Solutions({ onCTAClick }: SolutionsProps) {
  const solutions = [
    {
      icon: Sparkles,
      title: 'Consultoria Estratégica',
      description: 'Transformamos seu negócio com estratégias práticas de IA. Identificamos oportunidades reais e criamos um plano de ação para resultados mensuráveis.',
      features: ['Diagnóstico IA FIRST', 'Estratégia personalizada', 'Redução de custos', 'Aumento de competitividade'],
    },
    {
      icon: Cog,
      title: 'Automações Inteligentes',
      description: 'Automatize processos, elimine tarefas repetitivas e libere sua equipe para focar no que realmente importa. Eficiência operacional com IA.',
      features: ['Processos otimizados', 'Economia de tempo', 'Integração com sistemas', 'ROI garantido'],
    },
    {
      icon: Bot,
      title: 'Chatbots Personalizados',
      description: 'Agentes inteligentes que atendem, vendem e resolvem problemas 24/7. Transforme atendimento em resultados com BotGPT.',
      features: ['Disponível 24/7', 'Atendimento humanizado', 'Vendas automatizadas', 'Suporte inteligente'],
      link: '/?product=botgpt',
      linkText: 'Conhecer BotGPT',
    },
    {
      icon: GraduationCap,
      title: 'Treinamentos Práticos',
      description: 'Capacite sua equipe com treinamentos hands-on em IA. Aprendam fazendo, com casos reais e aplicação imediata no seu negócio.',
      features: ['Aprendizado prático', 'Cases reais', 'Certificação', 'Suporte contínuo'],
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Soluções Inteligentes
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            <span className="text-primary font-bold glow-text">Consultoria, automações, chatbots e treinamentos</span>{' '}
            que geram resultados reais, reduzem custos e aumentam sua competitividade com IA
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group"
            >
              <solution.icon className="w-14 h-14 text-primary mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <h3 className="text-2xl font-black mb-4">{solution.title}</h3>
              <p className="text-white/70 leading-relaxed mb-6">{solution.description}</p>
              
              <div className="space-y-3 mb-6">
                {solution.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              {solution.link && (
                <a
                  href={solution.link}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  {solution.linkText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Sparkles className="w-12 h-12 text-primary" />
            <h3 className="text-3xl font-black">O Que Nos Diferencia</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { metric: '10x', label: 'Potencial de Crescimento' },
              { metric: '100%', label: 'Centrado nas Pessoas' },
              { metric: 'Global', label: 'Visão de Futuro' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black text-primary mb-2 glow-text">{stat.metric}</div>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-white/80 leading-relaxed text-center">
            Nosso compromisso vai além de resultados financeiros. Criamos empresas mais lucrativas, 
            <span className="font-bold"> mais humanas, sustentáveis e relevantes</span>, preparadas para 
            o cenário exponencial da próxima década.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-black mb-6">
            Pronto para Transformar Seu Negócio?
          </h3>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Agende uma EXPERIENCI<span className="text-primary">.A</span>. gratuita e veja na prática 
            como nossas soluções podem revolucionar sua empresa
          </p>
          <Button
            onClick={onCTAClick}
            size="lg"
            className="bg-primary text-black hover:bg-primary/90 font-black text-lg px-12 py-8 glow-border group"
          >
            <span className="flex items-center gap-3">
              Agendar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
