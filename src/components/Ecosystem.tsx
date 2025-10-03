import { motion } from 'motion/react';
import { DollarSign, Zap, Bot, GraduationCap, Sparkles, Users, LineChart, Megaphone } from 'lucide-react';

export function Ecosystem() {
  const branches = [
    {
      icon: DollarSign,
      name: 'ECONOMI.A.',
      description: 'Consultoria financeira e gestão econômica inteligente com IA para otimizar custos e maximizar lucros.',
      color: 'from-green-500/20 to-transparent',
      borderColor: 'border-green-500/30',
    },
    {
      icon: Zap,
      name: 'ENERGI.A.',
      description: 'Soluções de produtividade e automação de processos que energizam sua operação com eficiência máxima.',
      color: 'from-yellow-500/20 to-transparent',
      borderColor: 'border-yellow-500/30',
    },
    {
      icon: Bot,
      name: 'BOTGPT',
      description: 'Desenvolvimento de chatbots e agentes inteligentes personalizados que transformam atendimento e vendas.',
      color: 'from-purple-500/20 to-transparent',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: GraduationCap,
      name: 'ACADEMI.A.',
      description: 'Treinamentos, capacitações e programas educacionais em IA e transformação digital para sua equipe.',
      color: 'from-blue-500/20 to-transparent',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: Sparkles,
      name: 'EXPERIENCI.A.',
      description: 'Imersões práticas, workshops e vivências transformadoras que demonstram o poder da IA no seu negócio.',
      color: 'from-primary/20 to-transparent',
      borderColor: 'border-primary/30',
    },
    {
      icon: Users,
      name: 'CONSULTORI.A.',
      description: 'Consultoria empresarial estratégica com foco em transformação digital e implementação de IA.',
      color: 'from-pink-500/20 to-transparent',
      borderColor: 'border-pink-500/30',
    },
    {
      icon: LineChart,
      name: 'AUDITORI.A.',
      description: 'Auditoria e análise de processos com IA para identificar oportunidades de otimização e crescimento.',
      color: 'from-orange-500/20 to-transparent',
      borderColor: 'border-orange-500/30',
    },
    {
      icon: Megaphone,
      name: 'EXPANSÃ.O ADS',
      description: 'Gestão inteligente de campanhas de marketing digital com IA para maximizar ROI e conversões.',
      color: 'from-red-500/20 to-transparent',
      borderColor: 'border-red-500/30',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-secondary">
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
            Ecossistema
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Um conjunto integrado de soluções <span className="text-primary font-bold glow-text">IA FIRST</span> que 
            trabalham em sinergia para tornar sua empresa <span className="font-bold">DIFERENCI.A.DA</span> — 
            mais competitiva, lucrativa e preparada para o futuro
          </p>
        </motion.div>

        {/* Connection Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-black mb-6">Como Funciona o Ecossistema</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Cada braço da EXTRAORDINÁRI<span className="text-primary">.A</span>. foi projetado para resolver 
              desafios específicos do seu negócio, mas todos compartilham a mesma base: a filosofia{' '}
              <span className="text-primary font-bold">AI First . People Always.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Integração Total', 'Dados Compartilhados', 'Resultados Multiplicados', 'Evolução Contínua'].map((item, i) => (
                <div key={i} className="bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
                  <p className="font-bold text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${branch.color} border ${branch.borderColor} rounded-xl p-6 hover:scale-105 transition-all cursor-pointer group`}
            >
              <branch.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <h3 className="text-xl font-black mb-3">
                {branch.name.split('.A.')[0]}
                <span className="text-primary glow-text">.A.</span>
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{branch.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Integration Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center max-w-4xl mx-auto"
        >
          <div className="bg-black border border-primary/30 rounded-2xl p-12">
            <Sparkles className="w-16 h-16 text-primary mb-6 mx-auto" />
            <h3 className="text-3xl font-black mb-6">Tudo Conectado, Tudo Inteligente</h3>
            <p className="text-lg text-white/80 leading-relaxed">
              O diferencial do ecossistema EXTRAORDINÁRI<span className="text-primary">.A</span>. está na 
              integração perfeita entre todas as soluções. Dados fluem, insights são compartilhados e 
              sua empresa evolui de forma sistêmica e coordenada.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
