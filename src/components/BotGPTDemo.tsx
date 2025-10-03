import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Bot, User, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function BotGPTDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! 👋 Sou o assistente virtual da Pizzaria Bella Massa. Como posso ajudar você hoje?',
      time: '14:30',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    '🍕 Ver cardápio',
    '📍 Endereço e horários',
    '💰 Fazer pedido',
    '⏱️ Tempo de entrega',
  ];

  const botResponses: { [key: string]: string } = {
    'ver cardápio': '🍕 Aqui está nosso cardápio:\n\n🔸 Pizza Margherita - R$ 45\n🔸 Pizza Calabresa - R$ 48\n🔸 Pizza Portuguesa - R$ 52\n🔸 Pizza Quatro Queijos - R$ 55\n\nTodas as pizzas vêm em tamanho grande (8 fatias). Qual você gostaria de pedir?',
    'endereço': '📍 Estamos localizados na Av. Paulista, 1000 - São Paulo\n\n⏰ Horários:\nSeg a Qui: 18h - 23h\nSex a Dom: 18h - 00h\n\nFazemos entrega em todo o centro!',
    'fazer pedido': 'Ótimo! 🎉 Para fazer seu pedido, me diga:\n\n1️⃣ Qual pizza você quer?\n2️⃣ Endereço de entrega\n3️⃣ Forma de pagamento (Pix, Cartão ou Dinheiro)\n\nJá tem essas informações?',
    'tempo': '⏱️ Nosso tempo médio de entrega é:\n\n🏃‍♂️ 30-40 minutos para região central\n🚗 45-60 minutos para outras regiões\n\nDepois que você fizer o pedido, eu envio o link de rastreamento!',
    'default': 'Entendi! Um momento que vou transferir você para um atendente humano para resolver isso da melhor forma. ⚡',
  };

  const handleSend = (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const newUserMessage = {
      type: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');

    // Simulate bot typing and response
    setTimeout(() => {
      const lowerMessage = messageText.toLowerCase();
      let botResponse = botResponses.default;

      if (lowerMessage.includes('cardápio') || lowerMessage.includes('pizza') || lowerMessage.includes('menu')) {
        botResponse = botResponses['ver cardápio'];
      } else if (lowerMessage.includes('endereço') || lowerMessage.includes('local') || lowerMessage.includes('horário')) {
        botResponse = botResponses['endereço'];
      } else if (lowerMessage.includes('pedido') || lowerMessage.includes('pedir') || lowerMessage.includes('comprar')) {
        botResponse = botResponses['fazer pedido'];
      } else if (lowerMessage.includes('entrega') || lowerMessage.includes('tempo') || lowerMessage.includes('demora')) {
        botResponse = botResponses['tempo'];
      }

      const newBotMessage = {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/20 to-transparent border-primary/30 p-12 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-black" />
            </div>
            
            <h3 className="text-3xl font-black mb-4">Demonstração Interativa</h3>
            <p className="text-white/70 mb-8 text-lg">
              Veja como seria seu bot atendendo clientes 24/7. Este é um exemplo de pizzaria, mas funciona para qualquer negócio!
            </p>

            <Button
              onClick={() => setIsOpen(true)}
              className="bg-primary text-black hover:bg-primary/90 font-black text-xl px-12 py-6"
            >
              Iniciar Demonstração
              <MessageSquare className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-sm text-white/50 mt-4">
              ✓ Totalmente funcional ✓ Teste à vontade
            </p>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-card border-primary/30 overflow-hidden shadow-2xl shadow-primary/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-black p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-lg">BotGPT - Pizzaria Demo</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-sm text-black/80">Online 24/7</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="hover:bg-black/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="bg-secondary/50 p-6 h-96 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'bot' ? 'bg-primary' : 'bg-white'
                      }`}>
                        {message.type === 'bot' ? (
                          <Bot className="w-4 h-4 text-black" />
                        ) : (
                          <User className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'bot' 
                            ? 'bg-card border border-white/10' 
                            : 'bg-primary text-black'
                        }`}>
                          <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                        </div>
                        <p className="text-xs text-white/40 mt-1 px-2">{message.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="bg-secondary/30 p-4 border-t border-white/10">
                <p className="text-xs text-white/60 mb-3">Respostas rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Badge
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 cursor-pointer px-4 py-2"
                    >
                      {reply}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="bg-card p-4 border-t border-white/10">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="bg-secondary border-white/10 focus:border-primary/50"
                />
                <Button
                  onClick={() => handleSend()}
                  className="bg-primary text-black hover:bg-primary/90 font-black px-6"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-white/40 mt-2 text-center">
                💡 Experimente perguntar sobre cardápio, endereço, pedidos ou entrega
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Badge className="bg-primary/10 border border-primary/30 text-primary px-6 py-3">
              ⚡ Este é apenas um exemplo - seu bot será personalizado para SEU negócio!
            </Badge>
          </div>
        </motion.div>
      )}
    </div>
  );
}
