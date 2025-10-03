import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Zap, Crown, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface PricingPlansProps {
  onCTAClick?: () => void;
}

export function PricingPlans({ onCTAClick }: PricingPlansProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'start',
      name: 'Start',
      tagline: 'Para começar',
      icon: Zap,
      color: 'from-blue-500/20 to-transparent',
      borderColor: 'border-blue-500/30',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: {
        resources: 'Grátis',
        messages: 'Até 100',
        channels: '1 canal básico',
        branding: 'Visível',
        support: 'Ajuda online básica',
        reports: 'Não incluído',
        integrations: 'Não',
        customization: 'Limitada'
      },
      cta: 'Começar Grátis',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Mais popular',
      icon: Crown,
      color: 'from-primary/20 to-transparent',
      borderColor: 'border-primary/30',
      price: {
        monthly: 147,
        yearly: 1470
      },
      features: {
        resources: 'Pro',
        messages: '2.000 - 5.000',
        channels: 'WhatsApp + Site',
        branding: 'Visível',
        support: 'Suporte por chat/e-mail',
        reports: 'Básico',
        integrations: 'Limitadas',
        customization: 'Moderada'
      },
      cta: 'Assinar Pro',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      tagline: 'Solução completa',
      icon: Rocket,
      color: 'from-purple-500/20 to-transparent',
      borderColor: 'border-purple-500/30',
      price: {
        monthly: 247,
        yearly: 2470
      },
      features: {
        resources: 'Premium',
        messages: '10.000+',
        channels: 'WhatsApp, Site, CRM, E-commerce',
        branding: 'Removida',
        support: 'Suporte prioritário',
        reports: 'Avançado + Insights IA',
        integrations: 'Completas',
        customization: 'Total'
      },
      cta: 'Assinar Premium',
      popular: false
    }
  ];

  const allFeatures = [
    { label: 'Recursos', key: 'resources' },
    { label: 'Mensagens/mês', key: 'messages' },
    { label: 'Canais', key: 'channels' },
    { label: 'Marca EXTRAORDINARI.A.', key: 'branding' },
    { label: 'Suporte', key: 'support' },
    { label: 'Relatórios', key: 'reports' },
    { label: 'Integrações', key: 'integrations' },
    { label: 'Customização', key: 'customization' }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-secondary to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Planos <span className="text-primary glow-text">EXTRAORDINÁRIOS</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para transformar seu negócio com IA. 
            Todos incluem a filosofia <span className="text-primary font-bold">AI First + People Always</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-card border border-white/10 rounded-full p-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Anual
              <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                -20%
              </Badge>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-black border-primary/30 px-6 py-2 text-sm font-black">
                    ⭐ MAIS POPULAR
                  </Badge>
                </div>
              )}

              <Card className={`bg-gradient-to-br ${plan.color} border ${plan.borderColor} ${
                plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''
              } hover:border-primary/50 transition-all h-full`}>
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.color} border ${plan.borderColor} flex items-center justify-center`}>
                    <plan.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <CardTitle className="text-3xl font-black mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {plan.tagline}
                  </CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-black">
                        {plan.price[billingCycle] === 0 ? 'Grátis' : `R$ ${plan.price[billingCycle]}`}
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-white/50">
                          /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                      <p className="text-sm text-green-400 mt-2">
                        Economize R$ {(plan.price.monthly * 12 - plan.price.yearly).toFixed(0)}/ano
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {allFeatures.map((feature) => (
                      <li key={feature.key} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-white/60 text-sm">{feature.label}:</span>
                          <span className="font-bold ml-2">
                            {plan.features[feature.key as keyof typeof plan.features]}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onCTAClick}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary text-black hover:bg-primary/90'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    } font-black py-6`}
                  >
                    {plan.cta}
                  </Button>

                  <p className="text-xs text-white/40 text-center mt-4">
                    {plan.price[billingCycle] === 0 ? 'Sem cartão necessário' : 'Cancele a qualquer momento'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="bg-card border-white/10 overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-black">
                Comparação Completa
              </CardTitle>
              <CardDescription>
                Veja todos os recursos lado a lado
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-bold bg-secondary">Recursos</th>
                      {plans.map(plan => (
                        <th key={plan.id} className="text-center p-4 font-bold bg-secondary">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.map((feature, index) => (
                      <tr
                        key={feature.key}
                        className={`border-b border-white/5 ${
                          index % 2 === 0 ? 'bg-black/20' : ''
                        }`}
                      >
                        <td className="p-4 text-white/70">{feature.label}</td>
                        {plans.map(plan => (
                          <td key={`${plan.id}-${feature.key}`} className="p-4 text-center">
                            <span className="font-bold text-sm">
                              {plan.features[feature.key as keyof typeof plan.features]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">
            Precisa de algo personalizado? Fale conosco para soluções corporativas.
          </p>
          <Button
            onClick={onCTAClick}
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            Falar com Especialista
          </Button>
        </motion.div>
      </div>
    </section>
  );
}