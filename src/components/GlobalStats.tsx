import { motion } from 'motion/react';
import { TrendingUp, Users, Globe, Award, Zap, Heart } from 'lucide-react';

export function GlobalStats() {
  const stats = [
    {
      icon: Users,
      value: '127+',
      label: 'Empresas Transformadas',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      value: 'R$ 18M+',
      label: 'Valor Gerado para Clientes',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      value: '94%',
      label: 'Taxa de Sucesso',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Globe,
      value: '12',
      label: 'Países Atendidos',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      value: '10x',
      label: 'Crescimento Médio',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Heart,
      value: '4.9/5',
      label: 'Satisfação Geral',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-bold">Impacto Global</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Resultados <span className="text-primary glow-text">Extraordinários</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Empresas que se tornaram <span className="text-primary font-bold glow-text">DIFERENCI.A.DAS</span> com{' '}
            consultoria, automações, chatbots e treinamentos em IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-card/50 backdrop-blur border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  
                  <div className="text-5xl font-black text-primary mb-3 glow-text">
                    {stat.value}
                  </div>
                  
                  <p className="text-white/70 font-bold">{stat.label}</p>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 rounded-full px-8 py-4">
            <Award className="w-6 h-6 text-primary" />
            <p className="text-lg">
              <span className="font-bold text-primary">Reconhecida</span> como referência em{' '}
              <span className="font-bold">transformação digital com IA</span> no Brasil
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}