import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  Database,
  Users,
  Settings,
  LogOut,
  Brain,
  Zap,
  FileText,
  Calendar,
  MessageSquare,
  TrendingUp,
  Lock,
  Home,
  Grid3x3,
  Target,
  Activity,
  Workflow
} from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PowerBIAnalytics } from './admin/PowerBIAnalytics';
import { IntegrationsHub } from './admin/IntegrationsHub';
import { CRMSystem } from './admin/CRMSystem';
import { AdvancedAnalytics } from './admin/AdvancedAnalytics';
import { AutomationHub } from './admin/AutomationHub';
import { PerformanceMonitor } from './admin/PerformanceMonitor';
import { NotificationSystem } from './NotificationSystem';

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const quickStats = [
    {
      title: 'Clientes Ativos',
      value: '165',
      change: '+12%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 89K',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'Conversões',
      value: '68%',
      change: '+8%',
      icon: BarChart3,
      color: 'text-purple-400'
    },
    {
      title: 'Ferramentas',
      value: '17/17',
      change: '100%',
      icon: Zap,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <div className="border-b border-white/10 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-black">
                  Painel <span className="text-primary">CEO</span>
                </h1>
                <p className="text-xs text-white/60">EXTRAORDINÁRI.A. Admin Hub</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <NotificationSystem />
              
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-white/10 hover:border-primary/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-card border border-white/10 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics IA
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Grid3x3 className="w-4 h-4 mr-2" />
              Integrações
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <FileText className="w-4 h-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="crm" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Target className="w-4 h-4 mr-2" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="advanced-analytics" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Activity className="w-4 h-4 mr-2" />
              Analytics+
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Workflow className="w-4 h-4 mr-2" />
              Automações
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              <Zap className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-black text-lg mb-1">Área Exclusiva do CEO</h3>
                    <p className="text-white/70 text-sm">
                      Este painel contém todas as ferramentas de gestão, desenvolvimento e análise da EXTRAORDINÁRI.A.
                      Todas as integrações são invisíveis para clientes e acessíveis apenas por você.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card border-white/10 hover:border-primary/50 transition-all">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <stat.icon className={`w-10 h-10 ${stat.color}`} />
                          <span className="text-green-400 text-sm font-bold">{stat.change}</span>
                        </div>
                        <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                        <p className="text-3xl font-black">{stat.value}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Database className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">CRM & Vendas</CardTitle>
                        <CardDescription className="text-xs">Zoho + Salesforce</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30">
                      Acessar CRM
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">IA Studio</CardTitle>
                        <CardDescription className="text-xs">Gemini + NotebookLM</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/30">
                      Abrir Studio
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Chatbots</CardTitle>
                        <CardDescription className="text-xs">BOTGPT Manager</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">
                      Gerenciar Bots
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/30 hover:border-yellow-500/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Analytics</CardTitle>
                        <CardDescription className="text-xs">Power BI + GA4</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setActiveTab('analytics')}
                      className="w-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30"
                    >
                      Ver Dashboards
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Agendamentos</CardTitle>
                        <CardDescription className="text-xs">Calendly Manager</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30">
                      Ver Agenda
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30 hover:border-primary/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Automações</CardTitle>
                        <CardDescription className="text-xs">n8n + Zapier</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">
                      Configurar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <PowerBIAnalytics />
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <IntegrationsHub />
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-card border-white/10">
              <CardHeader>
                <CardTitle>Gestão de Clientes</CardTitle>
                <CardDescription>
                  CRM integrado com Zoho, Salesforce e Firebase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-black mb-2">
                    CRM em Desenvolvimento
                  </h3>
                  <p className="text-white/60 mb-6">
                    Integração completa com Zoho CRM e Salesforce em breve
                  </p>
                  <Button className="bg-primary text-black hover:bg-primary/90">
                    Conectar CRM Externo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="bg-card border-white/10">
              <CardHeader>
                <CardTitle>Gestão de Conteúdo</CardTitle>
                <CardDescription>
                  Blog, cases e materiais educativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-black mb-2">
                    CMS Personalizado
                  </h3>
                  <p className="text-white/60 mb-6">
                    Sistema de gerenciamento de conteúdo em desenvolvimento
                  </p>
                  <Button className="bg-primary text-black hover:bg-primary/90">
                    Criar Novo Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CRM Tab */}
          <TabsContent value="crm" className="space-y-6">
            <CRMSystem />
          </TabsContent>

          {/* Advanced Analytics Tab */}
          <TabsContent value="advanced-analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <AutomationHub />
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <PerformanceMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}