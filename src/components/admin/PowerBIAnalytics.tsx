import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Filter,
  Calendar,
  Database,
  Brain,
  Zap,
  Target,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileSpreadsheet,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

export function PowerBIAnalytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [analyzing, setAnalyzing] = useState(false);

  // Mock data - Em produção, conectar com API real
  const revenueData = [
    { month: 'Jan', revenue: 45000, costs: 28000, profit: 17000 },
    { month: 'Fev', revenue: 52000, costs: 31000, profit: 21000 },
    { month: 'Mar', revenue: 61000, costs: 33000, profit: 28000 },
    { month: 'Abr', revenue: 58000, costs: 32000, profit: 26000 },
    { month: 'Mai', revenue: 73000, costs: 35000, profit: 38000 },
    { month: 'Jun', revenue: 89000, costs: 38000, profit: 51000 }
  ];

  const clientsData = [
    { month: 'Jan', novos: 12, ativos: 45, churn: 3 },
    { month: 'Fev', novos: 18, ativos: 60, churn: 2 },
    { month: 'Mar', novos: 25, ativos: 83, churn: 4 },
    { month: 'Abr', novos: 21, ativos: 100, churn: 5 },
    { month: 'Mai', novos: 32, ativos: 127, churn: 3 },
    { month: 'Jun', novos: 41, ativos: 165, churn: 2 }
  ];

  const serviceDistribution = [
    { name: 'Consultoria', value: 35, color: '#00d4ff' },
    { name: 'Chatbots', value: 28, color: '#4ade80' },
    { name: 'Automações', value: 22, color: '#f59e0b' },
    { name: 'Treinamentos', value: 15, color: '#8b5cf6' }
  ];

  const metricsData = [
    {
      title: 'Receita Total',
      value: 'R$ 378.000',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Clientes Ativos',
      value: '165',
      change: '+30%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Taxa Conversão',
      value: '68%',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-400'
    },
    {
      title: 'ROI Médio',
      value: '10.5x',
      change: '+2.1x',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-yellow-400'
    }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Oportunidade Detectada',
      description: 'Aumento de 40% em consultas sobre chatbots nos últimos 7 dias. Recomenda-se criar campanha focada.',
      confidence: 92,
      action: 'Criar Campanha'
    },
    {
      type: 'alert',
      title: 'Atenção Necessária',
      description: '3 clientes do plano Premium reduziram engajamento em 60%. Sugestão: contato proativo.',
      confidence: 87,
      action: 'Agendar Reuniões'
    },
    {
      type: 'prediction',
      title: 'Previsão de Crescimento',
      description: 'Com base nos padrões atuais, projeção de 52 novos clientes em Julho (+27% vs. Junho).',
      confidence: 78,
      action: 'Ver Detalhes'
    }
  ];

  const handleAIAnalysis = async () => {
    setAnalyzing(true);
    // Simulação de análise com IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalyzing(false);
  };

  const handleExportData = () => {
    // Exportar dados em CSV/Excel
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Mês,Receita,Custos,Lucro\n"
      + revenueData.map(row => `${row.month},${row.revenue},${row.costs},${row.profit}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analise-extraordinaria.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header com Controles */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black mb-2">
            Analytics <span className="text-primary">IA-Powered</span>
          </h2>
          <p className="text-white/60">
            Análise inteligente de dados e métricas de negócio
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleAIAnalysis}
            disabled={analyzing}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Brain className="w-4 h-4 mr-2" />
            {analyzing ? 'Analisando...' : 'Análise IA'}
          </Button>

          <Button onClick={handleExportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <metric.icon className={`w-10 h-10 ${metric.color}`} />
                  <Badge
                    variant={metric.trend === 'up' ? 'default' : 'destructive'}
                    className="font-bold"
                  >
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60 mb-1">{metric.title}</p>
                <p className="text-3xl font-black">{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Insights da IA */}
      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <div>
              <CardTitle>Insights Inteligentes</CardTitle>
              <CardDescription>Análises e recomendações geradas por IA</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    insight.type === 'opportunity' ? 'bg-green-400 animate-pulse' :
                    insight.type === 'alert' ? 'bg-yellow-400 animate-pulse' :
                    'bg-blue-400 animate-pulse'
                  }`} />
                  <h4 className="font-bold">{insight.title}</h4>
                </div>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  {insight.confidence}% confiança
                </Badge>
              </div>
              <p className="text-sm text-white/70 mb-3 ml-5">{insight.description}</p>
              <div className="flex items-center justify-between ml-5">
                <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">
                  {insight.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Gráficos */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="bg-card border border-white/10">
          <TabsTrigger value="revenue">
            <DollarSign className="w-4 h-4 mr-2" />
            Receita
          </TabsTrigger>
          <TabsTrigger value="clients">
            <Users className="w-4 h-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="services">
            <Activity className="w-4 h-4 mr-2" />
            Serviços
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle>Evolução de Receita e Lucro</CardTitle>
              <CardDescription>Análise mensal de performance financeira</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #ffffff20',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00d4ff"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Receita"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#4ade80"
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                    name="Lucro"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle>Crescimento de Clientes</CardTitle>
              <CardDescription>Novos clientes vs. Base ativa</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={clientsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #ffffff20',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="novos" fill="#00d4ff" name="Novos Clientes" />
                  <Bar dataKey="ativos" fill="#4ade80" name="Clientes Ativos" />
                  <Bar dataKey="churn" fill="#f59e0b" name="Churn" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle>Distribuição de Serviços</CardTitle>
              <CardDescription>Serviços mais contratados</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #ffffff20',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-white/10 hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Upload className="w-8 h-8 text-primary" />
              <CardTitle className="text-lg">Importar Dados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Conecte com Excel, CSV ou API externa
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10 hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-green-400" />
              <CardTitle className="text-lg">Conectar CRM</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Integre com Zoho, Salesforce ou HubSpot
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10 hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-purple-400" />
              <CardTitle className="text-lg">Configurar Alertas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Receba notificações automáticas por IA
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}