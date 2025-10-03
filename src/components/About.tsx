import { Brain, Target, Eye, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
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
            Quem Somos
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Uma empresa <span className="text-primary font-bold glow-text">IA FIRST</span> que une{' '}
            <span className="font-bold">gestão, pessoas e Inteligência Artificial</span> para transformar negócios de forma prática e inovadora
          </p>
        </motion.div>

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 mb-20 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
            <h3 className="text-3xl font-black">Nosso Propósito</h3>
          </div>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Transformar negócios de forma prática e inovadora, tornando empresas{' '}
            <span className="text-primary font-bold glow-text">DIFERENCI.A.DAS</span> através da união entre{' '}
            <span className="font-bold">gestão, pessoas e Inteligência Artificial</span>.
          </p>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Somos <span className="font-bold text-primary glow-text">IA FIRST</span>: colocamos a Inteligência Artificial 
            como ponto de partida estratégico, mas as <span className="font-bold">pessoas</span> são sempre o destino final. 
            Geramos <span className="font-bold">resultados reais</span>, reduzimos custos e aumentamos a competitividade 
            sem perder a essência humana do seu negócio.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            Nosso diferencial é a <span className="text-primary font-bold glow-text">EXPERIENCI.A.</span>: 
            imersões e vivências que permitem <span className="font-bold">sentir na prática</span> como sua empresa 
            pode se tornar extraordinária com consultoria, automações, chatbots, treinamentos e soluções inteligentes.
          </p>
        </motion.div>

        {/* Visão, Missão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Eye,
              title: 'Visão',
              content: 'Ser referência global em transformação com IA centrada nas pessoas, criando negócios 10x melhores sem perder sua essência.',
            },
            {
              icon: Target,
              title: 'Missão',
              content: 'Tornar a tecnologia acessível, prática e extraordinária para que empresas inovem com segurança, inteligência e propósito.',
            },
            {
              icon: Rocket,
              title: 'Origem',
              content: 'Nascida no Brasil e conectada globalmente, somos a parceira estratégica para quem deseja dar o próximo passo em direção ao futuro.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border border-white/10 rounded-xl p-8 hover:border-primary/50 transition-all"
            >
              <item.icon className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-black mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* IA FIRST Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-primary/30 rounded-2xl p-12 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <Brain className="w-12 h-12 text-primary animate-pulse" strokeWidth={1.5} />
            <h3 className="text-4xl font-black">
              <span className="text-primary glow-text">IA FIRST</span>: Tecnologia + Humanidade
            </h3>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-white/80 leading-relaxed">
              Somos uma empresa <span className="font-bold text-primary glow-text">IA FIRST</span>: 
              a Inteligência Artificial é nosso <span className="font-bold">ponto de partida estratégico</span> 
              para acelerar processos, automatizar operações e multiplicar resultados. Mas as{' '}
              <span className="font-bold">pessoas</span> são sempre o centro e o propósito de tudo.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Oferecemos <span className="font-bold">consultoria estratégica, automações inteligentes, chatbots personalizados, 
              treinamentos práticos</span> e <span className="font-bold">soluções plug & play</span> que geram impacto imediato. 
              Cada solução é desenhada para criar empresas <span className="text-primary font-bold">DIFERENCI.A.DAS</span> — 
              mais competitivas, lucrativas e preparadas para o futuro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {['Consultoria & Automação', 'Chatbots & Treinamentos', 'Resultados Reais'].map((item, i) => (
                <div key={i} className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
