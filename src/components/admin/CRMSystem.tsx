import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  UserPlus,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  score: number;
  value: number;
  createdAt: string;
  lastContact: string;
  notes: string;
}

export function CRMSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const leads: Lead[] = [
    {
      id: '1',
      name: 'Carlos Mendes',
      email: 'carlos@pizzaria.com',
      phone: '(11) 98888-1234',
      company: 'Pizzaria Bella Massa',
      source: 'Website',
      status: 'qualified',
      score: 85,
      value: 1970,
      createdAt: '2025-10-01',
      lastContact: '2025-10-02',
      notes: 'Interessado em BotGPT Avançado. Agendar demo.'
    },
    {
      id: '2',
      name: 'Dra. Juliana Santos',
      email: 'juliana@clinica.com',
      phone: '(11) 97777-5678',
      company: 'Clínica Odontológica',
      source: 'Google Ads',
      status: 'proposal',
      score: 92,
      value: 4970,
      createdAt: '2025-09-28',
      lastContact: '2025-10-02',
      notes: 'Proposta Premium enviada. Aguardando aprovação.'
    },
    {
      id: '3',
      name: 'Roberto Alves',
      email: 'roberto@imobiliaria.com',
      phone: '(11) 96666-9012',
      company: 'Imobiliária Horizonte',
      source: 'LinkedIn',
      status: 'contacted',
      score: 68,
      value: 970,
      createdAt: '2025-10-02',
      lastContact: '2025-10-02',
      notes: 'Primeiro contato feito. Interessado em automação.'
    },
    {
      id: '4',
      name: 'Marina Costa',
      email: 'marina@academia.com',
      phone: '(11) 95555-3456',
      company: 'Academia FitLife',
      source: 'Instagram',
      status: 'new',
      score: 45,
      value: 0,
      createdAt: '2025-10-03',
      lastContact: '-',
      notes: 'Lead novo via Instagram. Preencher trial BotGPT.'
    },
    {
      id: '5',
      name: 'Paulo Ferreira',
      email: 'paulo@ecommerce.com',
      phone: '(11) 94444-7890',
      company: 'E-commerce ModaStyle',
      source: 'Website',
      status: 'won',
      score: 98,
      value: 4970,
      createdAt: '2025-09-20',
      lastContact: '2025-09-30',
      notes: 'Cliente fechado! Plano Premium. Onboarding completo.'
    },
  ];

  const statusColors = {
    new: 'bg-blue-500',
    contacted: 'bg-yellow-500',
    qualified: 'bg-purple-500',
    proposal: 'bg-orange-500',
    won: 'bg-green-500',
    lost: 'bg-red-500',
  };

  const statusLabels = {
    new: 'Novo',
    contacted: 'Contatado',
    qualified: 'Qualificado',
    proposal: 'Proposta',
    won: 'Ganho',
    lost: 'Perdido',
  };

  const stats = [
    {
      title: 'Total Leads',
      value: leads.length,
      change: '+12%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Qualificados',
      value: leads.filter(l => l.status === 'qualified').length,
      change: '+8%',
      icon: Star,
      color: 'text-purple-400'
    },
    {
      title: 'Taxa Conversão',
      value: '35%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'Pipeline Valor',
      value: `R$ ${(leads.reduce((acc, l) => acc + l.value, 0) / 1000).toFixed(1)}k`,
      change: '+23%',
      icon: DollarSign,
      color: 'text-yellow-400'
    },
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
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
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-3xl font-black mb-1">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CRM Table */}
      <Card className="bg-card border-white/10">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="text-2xl font-black flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Gestão de Leads
            </CardTitle>
            <Button className="bg-primary text-black hover:bg-primary/90 font-bold">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Lead
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, empresa ou email..."
                className="pl-10 bg-secondary border-white/10"
              />
            </div>
            
            <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-full md:w-auto">
              <TabsList className="bg-secondary">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="new">Novos</TabsTrigger>
                <TabsTrigger value="qualified">Qualificados</TabsTrigger>
                <TabsTrigger value="proposal">Proposta</TabsTrigger>
                <TabsTrigger value="won">Ganhos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Cliente</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Empresa</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Origem</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Score</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Valor</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Último Contato</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-white/60">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold">{lead.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-white/40" />
                          <p className="text-xs text-white/60">{lead.email}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-3 h-3 text-white/40" />
                          <p className="text-xs text-white/60">{lead.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-sm">{lead.company}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-xs">
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${statusColors[lead.status]} text-black text-xs`}>
                        {statusLabels[lead.status]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${lead.score >= 80 ? 'bg-green-400' : lead.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-primary">
                        {lead.value > 0 ? `R$ ${lead.value}` : '-'}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Clock className="w-3 h-3" />
                        {lead.lastContact}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-white/10">
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="w-4 h-4 mr-2" />
                            Ligar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar Follow-up
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Ver Histórico
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Nenhum lead encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
