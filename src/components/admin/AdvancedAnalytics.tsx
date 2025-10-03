import { motion } from 'motion/react';
import {
  TrendingUp,
  Users,
  DollarSign,
  MousePointer,
  Clock,
  Target,
  ArrowUp,
  ArrowDown,
  Eye,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function AdvancedAnalytics() {
  const trafficData = [
    { name: 'Seg', visitantes: 245, leads: 32, conversoes: 8 },
    { name: 'Ter', visitantes: 312, leads: 45, conversoes: 12 },
    { name: 'Qua', visitantes: 389, leads: 52, conversoes: 15 },
    { name: 'Qui', visitantes: 421, leads: 61, conversoes: 18 },
    { name: 'Sex', visitantes: 467, leads: 73, conversoes: 22 },
    { name: 'Sáb', visitantes: 298, leads: 38, conversoes: 10 },
    { name: 'Dom', visitantes: 189, leads: 24, conversoes: 6 },
  ];

  const revenueData = [
    { month: 'Jun', revenue: 4200, trials: 15 },
    { month: 'Jul', revenue: 6800, trials: 23 },
    { month: 'Ago', revenue: 8900, trials: 31 },
    { month: 'Set', revenue: 12400, trials: 42 },
    { month: 'Out', revenue: 15700, trials: 54 },
  ];

  const sourceData = [
    { name: 'Google Ads', value: 35, color: '#4285F4' },
    { name: 'Orgânico', value: 28, color: '#34A853' },
    { name: 'Instagram', value: 18, color: '#E1306C' },
    { name: 'LinkedIn', value: 12, color: '#0077B5' },
    { name: 'Direto', value: 7, color: '#00d4ff' },
  ];

  const conversionFunnelData = [
    { stage: 'Visitantes', value: 2321, percentage: 100 },
    { stage: 'Leads', value: 325, percentage: 14 },
    { stage: 'Trials', value: 159, percentage: 7 },
    { stage: 'Clientes', value: 91, percentage: 4 },
  ];

  const topPages = [
    { page: '/BotGPT', views: 1234, convRate: '8.5%', avgTime: '4:32' },
    { page: '/Pricing', views: 987, convRate: '12.3%', avgTime: '3:45' },
    { page: '/Cases', views: 876, convRate: '6.2%', avgTime: '5:18' },
    { page: '/Solutions', views: 654, convRate: '7.8%', avgTime: '4:01' },
    { page: '/Blog', views: 543, convRate: '3.4%', avgTime: '6:22' },
  ];

  const metrics = [
    {
      title: 'Visitantes Únicos',
      value: '2,321',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Taxa de Conversão',
      value: '14.2%',
      change: '+5.8%',
      trend: 'up',
      icon: Target,
      color: 'text-green-400'
    },
    {
      title: 'Tempo Médio',
      value: '4:47',
      change: '+12%',
      trend: 'up',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      title: 'Taxa de Rejeição',
      value: '32.4%',
      change: '-8.2%',
      trend: 'down',
      icon: MousePointer,
      color: 'text-purple-400'
    },
    {
      title: 'Leads Gerados',
      value: '325',
      change: '+18.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-orange-400'
    },
    {
      title: 'MRR',
      value: 'R$ 15.7k',
      change: '+26.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border-white/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  <Badge 
                    variant="outline" 
                    className={`${
                      metric.trend === 'up' 
                        ? 'text-green-400 border-green-400/30' 
                        : 'text-red-400 border-red-400/30'
                    }`}
                  >
                    {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1 inline" /> : <ArrowDown className="w-3 h-3 mr-1 inline" />}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-3xl font-black mb-1">{metric.value}</p>
                <p className="text-sm text-white/60">{metric.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Tráfego e Conversões (7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34A853" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34A853" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="visitantes" 
                  stroke="#00d4ff" 
                  fillOpacity={1}
                  fill="url(#colorVisitantes)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversoes" 
                  stroke="#34A853" 
                  fillOpacity={1}
                  fill="url(#colorConversoes)" 
                  strokeWidth={2}
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Receita Mensal (MRR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="revenue" fill="#34A853" radius={[8, 8, 0, 0]} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Fontes de Tráfego
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={250}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex-1 space-y-3">
                {sourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-bold">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Funil de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">{stage.stage}</span>
                    <span className="text-white/60">
                      {stage.value.toLocaleString()} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className={`h-full flex items-center justify-center text-xs font-bold transition-all ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-purple-500' :
                        index === 2 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage >= 10 && `${stage.percentage}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-black flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Páginas Mais Acessadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-bold text-white/60">Página</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-white/60">Visualizações</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-white/60">Taxa Conversão</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-white/60">Tempo Médio</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold">{page.page}</td>
                    <td className="py-3 px-4">{page.views.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-primary/10 text-primary border-primary/30">
                        {page.convRate}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-white/60">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
