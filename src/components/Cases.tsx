import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface CasesProps {
  onCTAClick: () => void;
}

export function Cases({ onCTAClick }: CasesProps) {
  const cases = [
    {
      company: 'TechCorp Brasil',
      industry: 'Tecnologia',
      challenge: 'Atendimento manual consumia 60% do tempo da equipe, limitando crescimento',
      solution: 'Implementação de chatbot IA + automação de processos',
      results: [
        { metric: '85%', label: 'Redução em tempo de atendimento', icon: Clock },
        { metric: '3x', label: 'Aumento em capacidade de atendimento', icon: Users },
        { metric: 'R$ 45k', label: 'Economia mensal em operações', icon: DollarSign },
      ],
      testimonial: 'A EXTRAORDINÁRI.A. transformou nossa operação. Hoje atendemos 3x mais clientes com a mesma equipe, que está focada em tarefas estratégicas.',
      author: 'Carolina Mendes',
      role: 'CEO',
      timeframe: '90 dias',
    },
    {
      company: 'Varejo Premium',
      industry: 'E-commerce',
      challenge: 'Decisões baseadas em intuição, sem dados estruturados para crescimento',
      solution: 'Consultoria em IA + Dashboard preditivo + Mentoria executiva',
      results: [
        { metric: '10x', label: 'ROI em campanhas de marketing', icon: TrendingUp },
        { metric: '67%', label: 'Melhoria em taxa de conversão', icon: Users },
        { metric: '2.4M', label: 'Faturamento adicional no trimestre', icon: DollarSign },
      ],
      testimonial: 'A EXPERIENCI.A. nos mostrou na prática como IA pode transformar o negócio. Hoje somos uma empresa DIFERENCI.A.DA no mercado.',
      author: 'Roberto Silva',
      role: 'Fundador',
      timeframe: '6 meses',
    },
    {
      company: 'Consultoria Estratégica',
      industry: 'Serviços B2B',
      challenge: 'Processos manuais impediam escalabilidade e comprometiam qualidade',
      solution: 'Automações inteligentes + Chatbot personalizado + Treinamentos práticos',
      results: [
        { metric: '5x', label: 'Aumento em produtividade', icon: TrendingUp },
        { metric: '92%', label: 'Satisfação da equipe', icon: Users },
        { metric: '40h', label: 'Economizadas por semana', icon: Clock },
      ],
      testimonial: 'Com a abordagem IA FIRST da EXTRAORDINÁRI.A., reduzimos custos, aumentamos competitividade e nossa equipe está mais feliz.',
      author: 'Ana Paula Costa',
      role: 'Diretora de Operações',
      timeframe: '4 meses',
    },
  ];

  const impactMetrics = [
    {
      value: '127+',
      label: 'Empresas Transformadas',
      description: 'Negócios de todos os portes que já implementaram IA com sucesso',
    },
    {
      value: 'R$ 18M+',
      label: 'Gerados para Clientes',
      description: 'Impacto financeiro mensurável em faturamento e economia',
    },
    {
      value: '94%',
      label: 'Taxa de Sucesso',
      description: 'Clientes que atingiram ou superaram os resultados esperados',
    },
    {
      value: '4.9/5',
      label: 'Avaliação Média',
      description: 'Satisfação geral com consultoria, mentoria e soluções',
    },
  ];

  return (
    <div className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <span className="font-bold">Resultados Reais</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Cases de <span className="text-primary glow-text">Transformação</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Empresas que escolheram se tornar <span className="text-primary font-bold">10x melhores</span> com 
            IA, sem perder sua essência humana
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-white/10 p-6 text-center hover:border-primary/50 transition-all">
              <div className="text-4xl font-black text-primary mb-2 glow-text">{metric.value}</div>
              <div className="font-bold mb-2">{metric.label}</div>
              <p className="text-sm text-white/60">{metric.description}</p>
            </Card>
          ))}
        </motion.div>

        {/* Cases Grid */}
        <div className="space-y-16 mb-20">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-card to-secondary border-white/10 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  {/* Left Column - Challenge & Solution */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black">{caseStudy.company}</h3>
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {caseStudy.industry}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-destructive rounded-full" />
                          <span className="font-bold text-sm text-white/60">DESAFIO</span>
                        </div>
                        <p className="text-white/80">{caseStudy.challenge}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="font-bold text-sm text-white/60">SOLUÇÃO</span>
                        </div>
                        <p className="text-white/80">{caseStudy.solution}</p>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                      <p className="text-white/90 italic mb-4">"{caseStudy.testimonial}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold">{caseStudy.author}</p>
                          <p className="text-sm text-white/60">{caseStudy.role}</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {caseStudy.timeframe}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Results */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <span className="font-bold text-xl">RESULTADOS</span>
                    </div>

                    <div className="space-y-4">
                      {caseStudy.results.map((result, i) => (
                        <div
                          key={i}
                          className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                              <result.icon className="w-6 h-6 text-black" />
                            </div>
                            <div className="flex-1">
                              <div className="text-3xl font-black text-primary glow-text mb-1">
                                {result.metric}
                              </div>
                              <p className="text-sm text-white/70">{result.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 text-center"
        >
          <h3 className="text-4xl font-black mb-4">
            Pronto para Transformar Seu Negócio?
          </h3>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Agende uma <span className="text-primary font-bold">EXPERIENCI.A.</span> gratuita e 
            descubra como sua empresa pode alcançar resultados extraordinários
          </p>
          <button
            onClick={onCTAClick}
            className="inline-flex items-center gap-3 bg-primary text-black px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform glow-border"
          >
            Agendar EXPERIENCI.A. Gratuita
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}