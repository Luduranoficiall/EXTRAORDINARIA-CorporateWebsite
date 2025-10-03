import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Database,
  Zap,
  DollarSign,
  MessageSquare,
  Video,
  FileText,
  Code,
  Cloud,
  Smartphone,
  Brain,
  CheckCircle2,
  XCircle,
  Settings,
  ExternalLink,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  status: 'connected' | 'disconnected' | 'error';
  url: string;
  features: string[];
  color: string;
}

export function IntegrationsHub() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'powerbi',
      name: 'Power BI',
      description: 'Análise de dados e dashboards interativos',
      icon: Database,
      category: 'analytics',
      status: 'connected',
      url: 'https://app.powerbi.com',
      features: ['Dashboards', 'Relatórios', 'Análise IA'],
      color: 'text-yellow-400'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Pagamentos e gestão financeira',
      icon: DollarSign,
      category: 'payments',
      status: 'connected',
      url: 'https://stripe.com/br',
      features: ['Pagamentos', 'Assinaturas', 'Análises'],
      color: 'text-purple-400'
    },
    {
      id: 'firebase',
      name: 'Firebase',
      description: 'Backend e autenticação',
      icon: Cloud,
      category: 'backend',
      status: 'connected',
      url: 'https://firebase.google.com',
      features: ['Auth', 'Database', 'Hosting'],
      color: 'text-orange-400'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM e gestão de clientes',
      icon: Users,
      category: 'crm',
      status: 'disconnected',
      url: 'https://www.salesforce.com/br',
      features: ['CRM', 'Vendas', 'Marketing'],
      color: 'text-blue-400'
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      description: 'IA para pesquisa e análise',
      icon: Brain,
      category: 'ai',
      status: 'connected',
      url: 'https://notebooklm.google.com',
      features: ['Pesquisa IA', 'Sínteses', 'Insights'],
      color: 'text-green-400'
    },
    {
      id: 'gemini',
      name: 'Google AI Studio',
      description: 'Modelos de IA generativa',
      icon: Zap,
      category: 'ai',
      status: 'connected',
      url: 'https://aistudio.google.com',
      features: ['GPT', 'Gemini', 'Prompts'],
      color: 'text-cyan-400'
    },
    {
      id: 'veo',
      name: 'Google Veo',
      description: 'Geração de vídeo com IA',
      icon: Video,
      category: 'ai',
      status: 'disconnected',
      url: 'https://deepmind.google/models/veo',
      features: ['Vídeo IA', 'Edição', 'Animação'],
      color: 'text-red-400'
    },
    {
      id: 'clickup',
      name: 'ClickUp',
      description: 'Gestão de projetos e tarefas',
      icon: CheckCircle2,
      category: 'productivity',
      status: 'connected',
      url: 'https://clickup.com',
      features: ['Tarefas', 'Projetos', 'Time'],
      color: 'text-pink-400'
    },
    {
      id: 'replit',
      name: 'Replit',
      description: 'IDE e desenvolvimento colaborativo',
      icon: Code,
      category: 'development',
      status: 'disconnected',
      url: 'https://replit.com',
      features: ['Código', 'Deploy', 'Colaboração'],
      color: 'text-orange-400'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      description: 'Desenvolvimento mobile',
      icon: Smartphone,
      category: 'development',
      status: 'disconnected',
      url: 'https://flutter.dev',
      features: ['Apps', 'Cross-platform', 'UI'],
      color: 'text-blue-400'
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      description: 'Machine Learning e IA',
      icon: Brain,
      category: 'ai',
      status: 'disconnected',
      url: 'https://www.tensorflow.org',
      features: ['ML', 'Modelos', 'Treinamento'],
      color: 'text-yellow-400'
    },
    {
      id: 'wix',
      name: 'Wix',
      description: 'Criação de sites',
      icon: FileText,
      category: 'development',
      status: 'disconnected',
      url: 'https://pt.wix.com',
      features: ['Sites', 'Templates', 'Editor'],
      color: 'text-purple-400'
    },
    {
      id: 'pippit',
      name: 'Pippit AI',
      description: 'Automação de vendas com IA',
      icon: MessageSquare,
      category: 'ai',
      status: 'disconnected',
      url: 'https://www.pippit.ai/pt-br',
      features: ['Vendas', 'WhatsApp', 'IA'],
      color: 'text-green-400'
    },
    {
      id: 'trae',
      name: 'Trae AI',
      description: 'Assistente virtual inteligente',
      icon: Brain,
      category: 'ai',
      status: 'disconnected',
      url: 'https://www.trae.ai',
      features: ['Chatbot', 'IA', 'Atendimento'],
      color: 'text-cyan-400'
    },
    {
      id: 'askcodi',
      name: 'AskCodi',
      description: 'Assistente de código com IA',
      icon: Code,
      category: 'ai',
      status: 'disconnected',
      url: 'https://www.askcodi.com',
      features: ['Código', 'IA', 'Autocomplete'],
      color: 'text-red-400'
    },
    {
      id: 'mgx',
      name: 'MGX.dev',
      description: 'Desenvolvimento AI-powered',
      icon: Zap,
      category: 'development',
      status: 'disconnected',
      url: 'https://mgx.dev',
      features: ['Dev IA', 'Templates', 'Deploy'],
      color: 'text-pink-400'
    },
    {
      id: 'base44',
      name: 'Base44',
      description: 'Plataforma de IA empresarial',
      icon: Database,
      category: 'ai',
      status: 'disconnected',
      url: 'https://base44.com',
      features: ['IA Corp', 'Análise', 'Integração'],
      color: 'text-indigo-400'
    }
  ]);

  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas', count: integrations.length },
    { id: 'ai', label: 'Inteligência Artificial', count: integrations.filter(i => i.category === 'ai').length },
    { id: 'analytics', label: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length },
    { id: 'crm', label: 'CRM', count: integrations.filter(i => i.category === 'crm').length },
    { id: 'payments', label: 'Pagamentos', count: integrations.filter(i => i.category === 'payments').length },
    { id: 'development', label: 'Desenvolvimento', count: integrations.filter(i => i.category === 'development').length },
    { id: 'productivity', label: 'Produtividade', count: integrations.filter(i => i.category === 'productivity').length }
  ];

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        return {
          ...integration,
          status: integration.status === 'connected' ? 'disconnected' : 'connected'
        };
      }
      return integration;
    }));
  };

  const filteredIntegrations = filter === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === filter);

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const totalCount = integrations.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black mb-2">
            Central de <span className="text-primary">Integrações</span>
          </h2>
          <p className="text-white/60">
            Todas as ferramentas conectadas ao ecossistema EXTRAORDINÁRI.A.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-card border border-primary/30 rounded-xl px-6 py-3">
            <p className="text-sm text-white/60 mb-1">Status</p>
            <p className="text-2xl font-black text-primary">
              {connectedCount}/{totalCount}
            </p>
          </div>

          <Button className="bg-primary text-black hover:bg-primary/90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sincronizar Todas
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <Tabs value={filter} onValueChange={setFilter} className="space-y-4">
        <TabsList className="bg-card border border-white/10 flex-wrap h-auto">
          {categories.map(category => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-black"
            >
              {category.label}
              <Badge variant="outline" className="ml-2 border-primary/50 text-primary">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`bg-card border-white/10 hover:border-primary/50 transition-all h-full ${
                  integration.status === 'connected' ? 'ring-1 ring-primary/20' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${integration.color.split('-')[1]}-500/20 to-transparent flex items-center justify-center border border-white/10`}>
                        <integration.icon className={`w-6 h-6 ${integration.color}`} />
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={integration.status === 'connected' ? 'default' : 'secondary'}
                          className={integration.status === 'connected' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                        >
                          {integration.status === 'connected' ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {integration.status === 'connected' ? 'Ativo' : 'Inativo'}
                        </Badge>

                        <Switch
                          checked={integration.status === 'connected'}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                      </div>
                    </div>

                    <CardTitle className="text-xl">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {integration.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="border-white/20 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => window.open(integration.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Abrir
                        </Button>

                        <Button
                          size="sm"
                          className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Config
                        </Button>
                      </div>

                      {/* API Status */}
                      {integration.status === 'connected' && (
                        <div className="pt-3 border-t border-white/10">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/50">API Status</span>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-green-400 font-bold">Online</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Setup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              IA Configurada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-primary mb-2">
              {integrations.filter(i => i.category === 'ai' && i.status === 'connected').length}/
              {integrations.filter(i => i.category === 'ai').length}
            </p>
            <p className="text-sm text-white/60">Ferramentas de IA ativas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Sincronização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-green-400 mb-2">98%</p>
            <p className="text-sm text-white/60">Taxa de uptime total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Automações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-purple-400 mb-2">24</p>
            <p className="text-sm text-white/60">Processos automatizados</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Users = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);