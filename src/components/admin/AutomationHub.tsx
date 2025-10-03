import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Mail,
  MessageSquare,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  Play,
  Pause,
  Settings,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'draft';
  executions: number;
  successRate: number;
  icon: any;
  color: string;
}

export function AutomationHub() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Boas-vindas Trial BotGPT',
      description: 'Envia email automático quando alguém preenche trial do BotGPT',
      trigger: 'Formulário Trial BotGPT',
      actions: [
        'Enviar email de boas-vindas',
        'Criar lead no CRM',
        'Notificar equipe via Slack',
        'Agendar follow-up em 24h'
      ],
      status: 'active',
      executions: 89,
      successRate: 98,
      icon: MessageSquare,
      color: 'text-blue-400'
    },
    {
      id: '2',
      name: 'Nurturing de Leads',
      description: 'Sequência de emails educativos para leads não convertidos',
      trigger: 'Lead criado + não converteu em 7 dias',
      actions: [
        'Email 1: Case de sucesso (dia 1)',
        'Email 2: Demo gratuita (dia 3)',
        'Email 3: ROI calculator (dia 5)',
        'Email 4: Oferta especial (dia 7)'
      ],
      status: 'active',
      executions: 234,
      successRate: 42,
      icon: Mail,
      color: 'text-green-400'
    },
    {
      id: '3',
      name: 'Reativação de Leads Frios',
      description: 'Tenta reengajar leads sem atividade por 30+ dias',
      trigger: 'Lead inativo 30 dias',
      actions: [
        'Enviar email "Sentimos sua falta"',
        'Oferecer consultoria gratuita',
        'Tag como "lead frio" no CRM',
        'Criar tarefa para SDR'
      ],
      status: 'active',
      executions: 67,
      successRate: 28,
      icon: Users,
      color: 'text-yellow-400'
    },
    {
      id: '4',
      name: 'Confirmação de Agendamento',
      description: 'Lembretes automáticos antes de reuniões agendadas',
      trigger: 'Reunião agendada via Calendly',
      actions: [
        'Email confirmação imediato',
        'Lembrete 24h antes (email)',
        'Lembrete 1h antes (WhatsApp)',
        'Criar tarefa no CRM'
      ],
      status: 'active',
      executions: 156,
      successRate: 95,
      icon: Calendar,
      color: 'text-purple-400'
    },
    {
      id: '5',
      name: 'Cliente Novo - Onboarding',
      description: 'Processo automatizado de boas-vindas para novos clientes',
      trigger: 'Novo cliente (pagamento confirmado)',
      actions: [
        'Email boas-vindas + credenciais',
        'Agendar call de onboarding',
        'Criar projeto no sistema',
        'Enviar checklist de implementação',
        'Notificar Customer Success'
      ],
      status: 'active',
      executions: 43,
      successRate: 100,
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      id: '6',
      name: 'Recuperação Carrinho Abandonado',
      description: 'Emails automáticos para quem começou trial mas não completou',
      trigger: 'Trial iniciado mas não completado',
      actions: [
        'Email 1h depois: "Precisa de ajuda?"',
        'Email 24h: "Veja como é fácil"',
        'Email 3 dias: "Oferta especial"'
      ],
      status: 'paused',
      executions: 23,
      successRate: 18,
      icon: FileText,
      color: 'text-orange-400'
    },
  ]);

  const stats = [
    {
      title: 'Automações Ativas',
      value: automations.filter(a => a.status === 'active').length,
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      title: 'Execuções Hoje',
      value: '127',
      icon: Play,
      color: 'text-blue-400'
    },
    {
      title: 'Taxa de Sucesso',
      value: '87%',
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      title: 'Tempo Economizado',
      value: '34h/sem',
      icon: Clock,
      color: 'text-purple-400'
    },
  ];

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(auto => {
      if (auto.id === id) {
        return {
          ...auto,
          status: auto.status === 'active' ? 'paused' : 'active'
        };
      }
      return auto;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <Card className="bg-card border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Hub de Automações
            </CardTitle>
            <Button className="bg-primary text-black hover:bg-primary/90 font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Nova Automação
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Automations List */}
      <div className="grid grid-cols-1 gap-6">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border-white/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left Side - Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <automation.icon className={`w-6 h-6 ${automation.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black">{automation.name}</h3>
                        <Badge 
                          className={`${
                            automation.status === 'active' 
                              ? 'bg-green-500/20 text-green-400 border-green-400/30' 
                              : automation.status === 'paused'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
                              : 'bg-white/10 text-white/60 border-white/20'
                          }`}
                        >
                          {automation.status === 'active' ? 'Ativa' : automation.status === 'paused' ? 'Pausada' : 'Rascunho'}
                        </Badge>
                      </div>

                      <p className="text-sm text-white/70 mb-4">{automation.description}</p>

                      <div className="space-y-3">
                        {/* Trigger */}
                        <div className="flex items-start gap-2 text-sm">
                          <Play className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-primary">Gatilho:</p>
                            <p className="text-white/60">{automation.trigger}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-start gap-2 text-sm">
                          <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-bold text-yellow-400 mb-2">Ações:</p>
                            <ul className="space-y-1">
                              {automation.actions.map((action, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-white/60">
                                  <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Stats & Actions */}
                  <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
                    {/* Stats */}
                    <div className="flex gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-black text-primary">{automation.executions}</p>
                        <p className="text-xs text-white/60">Execuções</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-green-400">{automation.successRate}%</p>
                        <p className="text-xs text-white/60">Sucesso</p>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">
                          {automation.status === 'active' ? 'Ativa' : 'Pausada'}
                        </span>
                        <Switch 
                          checked={automation.status === 'active'}
                          onCheckedChange={() => toggleAutomation(automation.id)}
                        />
                      </div>

                      <Button variant="outline" size="icon" className="border-white/10 hover:border-primary/50">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Templates */}
      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-xl font-black">Templates Prontos</h3>
              <p className="text-sm text-white/70">Comece rápido com automações pré-configuradas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Email Marketing', icon: Mail },
              { name: 'Follow-up Vendas', icon: Users },
              { name: 'NPS Automático', icon: TrendingUp },
            ].map((template, index) => (
              <Button
                key={index}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 justify-start h-auto py-4"
              >
                <template.icon className="w-5 h-5 text-primary mr-3" />
                <div className="text-left">
                  <p className="font-bold">{template.name}</p>
                  <p className="text-xs text-white/60">Usar template</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
