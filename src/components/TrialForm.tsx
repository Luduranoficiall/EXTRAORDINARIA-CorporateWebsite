import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  ArrowRight 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export function TrialForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    businessType: '',
    whatsapp: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    '🍕 Restaurante/Pizzaria',
    '💉 Clínica/Consultório',
    '🏠 Imobiliária',
    '💪 Academia/Salão',
    '🛒 E-commerce',
    '🔧 Oficina/Serviços',
    '📚 Escola/Curso',
    '🏨 Hotel/Pousada',
    '💼 Outro',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Track conversion
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'BotGPT Trial',
          content_category: 'Trial Form',
          value: 197.00,
          currency: 'BRL'
        });
      }

      toast.success('Teste grátis ativado! Em breve você receberá instruções por e-mail.');
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-black" />
          </motion.div>

          <h3 className="text-4xl font-black mb-4">Parabéns! 🎉</h3>
          <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
            Seu teste grátis de 7 dias foi ativado! Enviamos um e-mail para <span className="text-primary font-bold">{formData.email}</span> com as próximas instruções.
          </p>

          <div className="bg-secondary/50 border border-white/10 rounded-xl p-6 mb-6 max-w-xl mx-auto">
            <h4 className="font-black text-lg mb-4">O que acontece agora?</h4>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">1</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Hoje - Boas-vindas</p>
                  <p className="text-white/60 text-sm">Você vai receber um e-mail com acesso ao painel e próximos passos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">2</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Amanhã - Configuração</p>
                  <p className="text-white/60 text-sm">Nossa equipe entra em contato para configurar seu bot personalizado</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">3</span>
                </div>
                <div>
                  <p className="font-bold text-sm">48h - Bot Pronto!</p>
                  <p className="text-white/60 text-sm">Seu atendente virtual estará funcionando 24/7 no seu WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Badge className="bg-primary text-black px-6 py-3 text-lg">
              <CheckCircle2 className="w-5 h-5 mr-2 inline" />
              Sem cartão de crédito · Sem compromisso · Cancele quando quiser
            </Badge>

            <p className="text-sm text-white/60">
              Dúvidas? Entre em contato: <a href="mailto:contato@extraordinaria.ai" className="text-primary font-bold hover:underline">contato@extraordinaria.ai</a>
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-card to-secondary/30 border-primary/30 p-8 md:p-12">
        <div className="text-center mb-10">
          <Badge className="bg-primary text-black px-6 py-3 text-lg mb-6">
            <Sparkles className="w-5 h-5 mr-2 inline" />
            Teste Grátis por 7 Dias
          </Badge>

          <h3 className="text-4xl md:text-5xl font-black mb-4">
            Comece Seu <span className="text-primary">Teste Agora</span>
          </h3>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Preencha os dados abaixo e em 48h seu bot estará atendendo clientes 24/7
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 font-bold flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Seu Nome Completo
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ex: João Silva"
              className="bg-secondary border-white/10 focus:border-primary/50 py-6"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 font-bold flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              E-mail Profissional
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="seu@email.com.br"
              className="bg-secondary border-white/10 focus:border-primary/50 py-6"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-2 font-bold flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Telefone/WhatsApp
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              className="bg-secondary border-white/10 focus:border-primary/50 py-6"
              required
            />
          </div>

          {/* Business */}
          <div>
            <label htmlFor="business" className="block mb-2 font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Nome da Empresa
            </label>
            <Input
              id="business"
              type="text"
              value={formData.business}
              onChange={(e) => handleInputChange('business', e.target.value)}
              placeholder="Ex: Pizzaria Bella Massa"
              className="bg-secondary border-white/10 focus:border-primary/50 py-6"
              required
            />
          </div>

          {/* Business Type */}
          <div>
            <label htmlFor="businessType" className="block mb-2 font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Tipo de Negócio
            </label>
            <select
              id="businessType"
              value={formData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className="w-full bg-secondary border border-white/10 focus:border-primary/50 rounded-lg px-4 py-3 text-white outline-none transition-all"
              required
            >
              <option value="">Selecione...</option>
              {businessTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* WhatsApp for bot */}
          <div>
            <label htmlFor="whatsapp" className="block mb-2 font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              WhatsApp do Negócio (onde o bot vai atuar)
            </label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              placeholder="(11) 98888-8888"
              className="bg-secondary border-white/10 focus:border-primary/50 py-6"
              required
            />
            <p className="text-xs text-white/50 mt-2">
              💡 Pode ser o mesmo do seu telefone pessoal ou um número comercial
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-black hover:bg-primary/90 font-black text-xl py-8 mt-8 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Processando...</span>
              </>
            ) : (
              <>
                Ativar Meu Teste Grátis Agora
                <ArrowRight className="w-6 h-6 ml-2" />
              </>
            )}
          </Button>

          {/* Trust Badges */}
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>7 dias grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Configuração inclusa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Cancele quando quiser</span>
              </div>
            </div>

            <p className="text-xs text-white/40 text-center max-w-md">
              🔒 Seus dados estão seguros. Não compartilhamos com terceiros e você pode cancelar a qualquer momento, sem multas ou taxas.
            </p>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
