import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Olá! Sou o BOTGPT, assistente da EXTRAORDINÁRI.A. Como posso ajudar sua empresa a se tornar 10x melhor com IA?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const quickReplies = [
    'Agendar EXPERIENCI.A.',
    'Consultoria em IA',
    'Como funciona?',
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputMessage;
    if (!messageText.trim()) return;

    // Add user message
    setMessages([
      ...messages,
      { text: messageText, sender: 'user', timestamp: new Date() },
    ]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'Entendi! Nossa equipe entrará em contato para ajudar você. Posso ajudar com algo mais?';
      
      if (messageText.toLowerCase().includes('experienci')) {
        botResponse = 'Perfeito! A EXPERIENCI.A. é nosso diferencial: imersões práticas onde você SENTE como sua empresa pode se tornar DIFERENCI.A.DA. Quer agendar?';
      } else if (messageText.toLowerCase().includes('soluç') || messageText.toLowerCase().includes('consultoria')) {
        botResponse = 'Oferecemos: Consultoria Estratégica, Automações Inteligentes, Chatbots Personalizados e Treinamentos Práticos. Sobre qual deseja saber mais?';
      } else if (messageText.toLowerCase().includes('preço') || messageText.toLowerCase().includes('custo')) {
        botResponse = 'Criamos soluções personalizadas que geram resultados reais e reduzem custos. Agende uma EXPERIENCI.A. gratuita para receber uma proposta sob medida!';
      } else if (messageText.toLowerCase().includes('ia first') || messageText.toLowerCase().includes('diferencial')) {
        botResponse = 'Somos IA FIRST: unimos gestão, pessoas e IA de forma prática e inovadora. Nossa filosofia AI First . People Always. garante resultados sem perder a essência humana.';
      }

      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: 'bot', timestamp: new Date() },
      ]);
    }, 1000);

    setInputMessage('');
  };

  // focus management: focus input when opening, return focus to toggle when closing
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // attach escape key handler
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          toggleButtonRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [isOpen]);

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          ref={toggleButtonRef}
          aria-expanded={isOpen}
          aria-controls="chatbot-window"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-black shadow-lg glow-border"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            id="chatbot-window"
            className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-card border border-primary/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/30 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-black">BOTGPT</h3>
                  <p className="text-xs text-white/60">Assistente Virtual IA</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" role="log" aria-live="polite">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-black'
                        : 'bg-secondary border border-white/10'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-6 pb-4">
                <p className="text-xs text-white/60 mb-3">Respostas rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(reply)}
                      className="bg-secondary border border-white/10 hover:border-primary/50 rounded-full px-4 py-2 text-xs font-bold transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } }}
                  placeholder="Digite sua mensagem..."
                  aria-label="Mensagem do usuário"
                  className="flex-1 bg-secondary border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  aria-label="Enviar mensagem"
                  className="bg-primary text-black hover:bg-primary/90 px-4"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
