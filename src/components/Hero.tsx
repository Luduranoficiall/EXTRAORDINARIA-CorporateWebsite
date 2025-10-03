import { Button } from './ui/button';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-8"
          >
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-bold">
              AI First . People Always.
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
          >
            Toda empresa pode ser comum.
            <br />
            A sua precisa ser <span className="text-primary glow-text">EXTRAORDINÁRI.A.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Somos <span className="text-primary font-bold glow-text">IA FIRST</span>: unimos{' '}
            <span className="font-bold">gestão, pessoas e Inteligência Artificial</span> para transformar 
            negócios de forma prática e inovadora, gerando resultados reais
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Brain, title: 'AI First', desc: 'IA como meio para acelerar processos e resultados' },
              { icon: Sparkles, title: 'People Always', desc: 'Pessoas como fim, o verdadeiro motivo da transformação' },
              { icon: Zap, title: 'Resultados 10x', desc: 'Crescimento exponencial sem perder a essência' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" strokeWidth={1.5} />
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              onClick={onCTAClick}
              size="lg"
              className="bg-primary text-black hover:bg-primary/90 font-black text-lg px-12 py-8 glow-border group"
            >
              <span className="flex items-center gap-3">
                Agende sua EXPERIENCI<span className="font-black">.A</span>.
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
            <p className="text-white/50 text-sm mt-4">
              Imersões práticas que transformam seu negócio
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
