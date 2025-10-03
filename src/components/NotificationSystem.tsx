import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  X,
  Mail,
  DollarSign,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface Notification {
  id: string;
  type: 'lead' | 'sale' | 'alert' | 'message' | 'meeting';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'lead',
      title: 'Novo Lead - BotGPT',
      description: 'Marina Costa preencheu trial do BotGPT',
      time: '2 min atrás',
      read: false,
      icon: UserPlus,
      color: 'text-blue-400'
    },
    {
      id: '2',
      type: 'sale',
      title: 'Nova Venda! 🎉',
      description: 'Plano Premium - R$ 4.970,00',
      time: '15 min atrás',
      read: false,
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      id: '3',
      type: 'message',
      title: 'Mensagem no Chat',
      description: 'Carlos Mendes: Quando começa o onboarding?',
      time: '1 hora atrás',
      read: false,
      icon: MessageSquare,
      color: 'text-purple-400'
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Reunião em 30 minutos',
      description: 'Demo BotGPT com Dra. Juliana Santos',
      time: 'Hoje 14:30',
      read: true,
      icon: Calendar,
      color: 'text-yellow-400'
    },
    {
      id: '5',
      type: 'alert',
      title: 'Meta do mês atingida!',
      description: '15 novos clientes - Meta: 12',
      time: '2 horas atrás',
      read: true,
      icon: TrendingUp,
      color: 'text-green-400'
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Simulate new notification
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'lead',
        title: 'Novo Lead - Website',
        description: 'Roberto Silva solicitou contato',
        time: 'Agora',
        read: false,
        icon: UserPlus,
        color: 'text-blue-400'
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setShowPopup(true);
      
      setTimeout(() => setShowPopup(false), 5000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Notification Popup Toast */}
      <AnimatePresence>
        {showPopup && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '50%' }}
            animate={{ opacity: 1, y: 20, x: '50%' }}
            exit={{ opacity: 0, y: -50, x: '50%' }}
            className="fixed top-0 right-1/2 translate-x-1/2 z-50 w-96"
          >
            <Card className="bg-card border-primary/30 shadow-2xl shadow-primary/20">
              <div className="p-4 flex items-start gap-3">
                <div className={`w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {notifications[0].icon && (() => {
                    const IconComponent = notifications[0].icon;
                    return <IconComponent className={`w-5 h-5 ${notifications[0].color}`} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h4 className="font-black mb-1">{notifications[0].title}</h4>
                  <p className="text-sm text-white/70">{notifications[0].description}</p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Bell */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-black text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent 
          align="end" 
          className="w-96 bg-card border-white/10 p-0 shadow-xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-lg">Notificações</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  Marcar todas como lidas
                </Button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-white/60">
                {unreadCount} {unreadCount === 1 ? 'nova' : 'novas'}
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {(() => {
                          const IconComponent = notification.icon;
                          return <IconComponent className={`w-5 h-5 ${notification.color}`} />;
                        })()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`font-bold text-sm ${!notification.read ? 'text-white' : 'text-white/80'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-white/60 mb-2 line-clamp-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/40">{notification.time}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-white/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-white/10">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-primary hover:text-primary/80 hover:bg-primary/10"
              >
                Ver todas as notificações
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
