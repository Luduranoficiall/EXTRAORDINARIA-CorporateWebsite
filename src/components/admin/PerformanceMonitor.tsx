import { motion } from 'motion/react';
import {
  Zap,
  Activity,
  Server,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function PerformanceMonitor() {
  const metrics = [
    {
      name: 'Page Load Time',
      value: '1.2s',
      status: 'excellent',
      target: '< 2s',
      icon: Zap,
      percentage: 90
    },
    {
      name: 'Time to Interactive',
      value: '2.1s',
      status: 'good',
      target: '< 3s',
      icon: Activity,
      percentage: 75
    },
    {
      name: 'Server Response',
      value: '180ms',
      status: 'excellent',
      target: '< 200ms',
      icon: Server,
      percentage: 95
    },
    {
      name: 'Database Queries',
      value: '45ms',
      status: 'excellent',
      target: '< 100ms',
      icon: Database,
      percentage: 98
    },
  ];

  const vitals = [
    {
      metric: 'LCP',
      value: '1.8s',
      status: 'good',
      description: 'Largest Contentful Paint'
    },
    {
      metric: 'FID',
      value: '8ms',
      status: 'good',
      description: 'First Input Delay'
    },
    {
      metric: 'CLS',
      value: '0.05',
      status: 'good',
      description: 'Cumulative Layout Shift'
    },
    {
      metric: 'TTFB',
      value: '180ms',
      status: 'good',
      description: 'Time to First Byte'
    },
  ];

  const errors = [
    {
      type: 'JavaScript Error',
      count: 3,
      last: '2 horas atrás',
      severity: 'low'
    },
    {
      type: 'API Timeout',
      count: 1,
      last: '5 horas atrás',
      severity: 'medium'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-400';
      case 'good':
        return 'text-blue-400';
      case 'needs-improvement':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-white/60';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-black mb-1">Performance Monitor</h2>
              <p className="text-sm text-white/70">Monitoramento em tempo real da performance do site</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                Tudo Operacional
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-primary" />
                  <Badge 
                    variant="outline"
                    className={`${getStatusColor(metric.status)} border-current`}
                  >
                    {metric.status}
                  </Badge>
                </div>

                <p className="text-3xl font-black mb-1">{metric.value}</p>
                <p className="text-sm text-white/60 mb-3">{metric.name}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Target: {metric.target}</span>
                    <span className="text-white/50">{metric.percentage}%</span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-black flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Core Web Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitals.map((vital, index) => (
              <div 
                key={index}
                className="bg-secondary/50 border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-black">{vital.metric}</h3>
                  <Badge 
                    variant="outline"
                    className="bg-green-500/20 text-green-400 border-green-400/30"
                  >
                    {vital.status}
                  </Badge>
                </div>
                <p className="text-3xl font-black text-primary mb-2">{vital.value}</p>
                <p className="text-sm text-white/60">{vital.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Errors & Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Erros Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {errors.length > 0 ? (
              <div className="space-y-4">
                {errors.map((error, index) => (
                  <div 
                    key={index}
                    className="bg-secondary/50 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold">{error.type}</h4>
                      <Badge 
                        variant="outline"
                        className={`${
                          error.severity === 'low' 
                            ? 'text-yellow-400 border-yellow-400/30' 
                            : 'text-orange-400 border-orange-400/30'
                        }`}
                      >
                        {error.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{error.count} ocorrências</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {error.last}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-white/60">Nenhum erro detectado</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Uptime & Disponibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Uptime (30 dias)</span>
                  <span className="text-2xl font-black text-green-400">99.97%</span>
                </div>
                <Progress value={99.97} className="h-3" />
              </div>

              <div className="bg-secondary/50 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">Status Atual</span>
                  <Badge className="bg-green-500 text-black">Operacional</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-white/50">CDN</p>
                    <p className="font-bold text-green-400">Online</p>
                  </div>
                  <div>
                    <p className="text-white/50">API</p>
                    <p className="font-bold text-green-400">Online</p>
                  </div>
                  <div>
                    <p className="text-white/50">Database</p>
                    <p className="font-bold text-green-400">Online</p>
                  </div>
                  <div>
                    <p className="text-white/50">Storage</p>
                    <p className="font-bold text-green-400">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
