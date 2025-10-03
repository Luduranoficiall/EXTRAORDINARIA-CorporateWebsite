import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, TrendingUp, Brain, Zap, Lightbulb, BookOpen, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Blog() {
  const featuredArticle = {
    category: 'VOCÊ SABI.A.?',
    title: 'VOCÊ SABI.A.? Como Empresas se Tornam DIFERENCI.A.DAS com IA',
    excerpt: 'Descubra como unir gestão, pessoas e Inteligência Artificial de forma prática para transformar seu negócio. Consultoria, automações, chatbots e treinamentos que geram resultados reais, reduzem custos e aumentam sua competitividade.',
    author: 'Equipe EXTRAORDINÁRI.A.',
    date: '1 Out 2024',
    readTime: '12 min',
    icon: Lightbulb,
  };

  const articles = [
    {
      category: 'VOCÊ SABI.A.?',
      title: 'VOCÊ SABI.A.? Empresas IA FIRST crescem 3x mais rápido',
      excerpt: 'Dados globais revelam que empresas que adotam IA como estratégia central se tornam DIFERENCI.A.DAS e superam a concorrência.',
      author: 'Equipe EXTRAORDINÁRI.A.',
      date: '28 Set 2024',
      readTime: '8 min',
      icon: Lightbulb,
    },
    {
      category: 'AI First . People Always',
      title: 'Como se Tornar uma Empresa DIFERENCI.A.DA',
      excerpt: 'Descubra como unir gestão, pessoas e IA de forma prática para gerar resultados reais, reduzir custos e aumentar sua competitividade.',
      author: 'Equipe EXTRAORDINÁRI.A.',
      date: '25 Set 2024',
      readTime: '10 min',
      icon: Brain,
    },
    {
      category: 'VOCÊ SABI.A.?',
      title: 'VOCÊ SABI.A.? Chatbots inteligentes aumentam vendas em até 40%',
      excerpt: 'Cases reais mostram como atendimento inteligente 24/7 impacta diretamente no faturamento. Exemplos práticos de ROI mensurável.',
      author: 'Equipe EXTRAORDINÁRI.A.',
      date: '22 Set 2024',
      readTime: '7 min',
      icon: Lightbulb,
    },
    {
      category: 'Automação',
      title: '5 Sinais de que Sua Empresa Precisa de IA Agora',
      excerpt: 'Processos manuais lentos? Decisões sem dados? Equipe sobrecarregada? Descubra se é hora de transformar seu negócio.',
      author: 'Equipe EXTRAORDINÁRI.A.',
      date: '20 Set 2024',
      readTime: '6 min',
      icon: Zap,
    },
    {
      category: 'VOCÊ SABI.A.?',
      title: 'VOCÊ SABI.A.? IA pode reduzir custos operacionais em até 70%',
      excerpt: 'Automação inteligente está transformando a estrutura de custos. Veja onde você pode economizar sem sacrificar qualidade.',
      author: 'Equipe EXTRAORDINÁRI.A.',
      date: '18 Set 2024',
      readTime: '9 min',
      icon: Lightbulb,
    },
    {
      category: 'Casos de Sucesso',
      title: 'De 40 para 400 Clientes: Como a IA Escalou uma Consultoria',
      excerpt: 'Case real de crescimento 10x com chatbots e automações, sem aumentar a equipe. Veja os números completos.',
      author: 'Equipe EXTRAORDINÁRI.A.',
      date: '15 Set 2024',
      readTime: '11 min',
      icon: TrendingUp,
    },
  ];

  const categories = [
    'Todos',
    'VOCÊ SABI.A.?',
    'AI First . People Always',
    'Automação',
    'Casos de Sucesso',
    'Gestão',
    'Tendências',
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
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-bold">Blog EXTRAORDINÁRI.A.</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            VOCÊ <span className="text-primary glow-text">SABI.A.</span>?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Insights, dados e cases reais que vão transformar sua visão sobre{' '}
            <span className="text-primary font-bold">IA</span>, gestão e crescimento empresarial
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`border rounded-full px-6 py-3 font-bold transition-all ${
                index === 0
                  ? 'bg-primary text-black border-primary'
                  : 'bg-secondary border-white/10 hover:border-primary/50 hover:bg-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 mb-12 max-w-5xl mx-auto cursor-pointer hover:border-primary/50 transition-all group"
        >
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-primary text-black border-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Artigo em Destaque
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary">
              {featuredArticle.category}
            </Badge>
          </div>
          
          <h3 className="text-4xl font-black mb-6 group-hover:text-primary transition-colors">
            {featuredArticle.title}
          </h3>
          
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            {featuredArticle.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{featuredArticle.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{featuredArticle.date}</span>
              </div>
              <div className="text-primary font-bold">{featuredArticle.readTime} de leitura</div>
            </div>
            
            <div className="flex items-center gap-2 text-primary font-black text-lg group-hover:gap-4 transition-all mt-4 sm:mt-0">
              Ler agora
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <article.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      article.category.includes('VOCÊ SABI.A.?')
                        ? 'border-primary/50 text-primary'
                        : 'border-white/20 text-white/70'
                    }`}
                  >
                    {article.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed mb-6 text-sm">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div>{article.readTime}</div>
                </div>
                
                <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all">
                  Ler artigo
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-2xl p-12 max-w-4xl mx-auto text-center"
        >
          <Lightbulb className="w-16 h-16 text-primary mx-auto mb-6" />
          
          <h3 className="text-3xl font-black mb-4">
            Receba <span className="text-primary glow-text">VOCÊ SABI.A.?</span> Toda Semana
          </h3>
          
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Insights exclusivos sobre IA, automação e transformação digital direto no seu e-mail. 
            Dados, cases e estratégias para você ficar à frente da concorrência.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 bg-secondary border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-primary/50 transition-all"
            />
            <Button className="bg-primary text-black hover:bg-primary/90 font-black px-8 py-4">
              Assinar Grátis
            </Button>
          </div>
          
          <p className="text-xs text-white/50 mt-4">
            ✓ Sem spam · ✓ Conteúdo exclusivo · ✓ Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
}