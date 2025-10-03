import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você integraria com Zoho CRM ou backend
    console.log('Form submitted:', formData);
    alert('Mensagem enviada! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const handleWhatsApp = () => {
    // Substitua pelo número real de WhatsApp
    window.open('https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma EXPERIENCI.A.', '_blank');
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-secondary">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Vamos Transformar Juntos?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Entre em contato e descubra como podemos tornar sua empresa{' '}
            <span className="text-primary font-bold glow-text">EXTRAORDINÁRI.A</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-6">Envie sua Mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-bold">Nome Completo</label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary border-white/10 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">E-mail</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-secondary border-white/10 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">Telefone / WhatsApp</label>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-secondary border-white/10 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">Empresa</label>
                  <Input
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-secondary border-white/10 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">Mensagem</label>
                  <Textarea
                    placeholder="Conte-nos sobre seus desafios e objetivos..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-secondary border-white/10 focus:border-primary/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-black hover:bg-primary/90 font-black text-lg py-6"
                >
                  <span className="flex items-center justify-center gap-3">
                    Enviar Mensagem
                    <Send className="w-5 h-5" />
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-2xl p-8">
              <MessageCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-black mb-4">Atendimento Imediato</h3>
              <p className="text-white/70 mb-6">
                Fale agora com nossa equipe via WhatsApp e tire todas as suas dúvidas
              </p>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black"
              >
                <span className="flex items-center justify-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  Chamar no WhatsApp
                </span>
              </Button>
            </div>

            {/* Contact Details */}
            <div className="bg-card border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-6">Outras Formas de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">E-mail</p>
                    <a
                      href="mailto:contato@extraordinaria.ai"
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      contato@extraordinaria.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">Telefone</p>
                    <p className="text-white/70">(11) 9999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">Endereço Digital</p>
                    <p className="text-white/70">www.extraordinaria.ai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-6">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Instagram', handle: '@extraordinaria.ai' },
                  { name: 'LinkedIn', handle: 'EXTRAORDINÁRI.A.' },
                  { name: 'YouTube', handle: 'EXTRAORDINÁRI.A.' },
                  { name: 'TikTok', handle: '@extraordinaria.ai' },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="bg-secondary border border-white/10 hover:border-primary/50 rounded-lg p-4 transition-all text-left"
                  >
                    <p className="font-bold text-sm mb-1">{social.name}</p>
                    <p className="text-xs text-white/60">{social.handle}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
