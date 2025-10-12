import React, { useState } from 'react';
import { MessageCircle, Clock, TrendingUp, CheckCircle, Zap, ArrowRight, Star, X } from './icons';

type Plan = { name: string; price: number; description: string; features: string[]; highlight: boolean; cta: string };
type UseCase = { icon: string; title: string; problem: string; solution: string };
type Testimonial = { name: string; business: string; text: string; rating: number };
type FormData = { name: string; email: string; phone: string; company: string };

const BotGPTLanding: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', company: '' });

  const plans: Plan[] = [
    { name: 'Essencial', price: 97, description: 'Perfeito para começar a automatizar', features: ['Atendimento 24/7 no WhatsApp', 'FAQ inteligente com até 50 respostas', 'Captura de leads automática', 'Relatórios básicos mensais', 'Suporte por e-mail', '1 canal de atendimento'], highlight: false, cta: 'Começar Agora' },
    { name: 'Avançado', price: 197, description: 'O mais popular entre nossos clientes', features: ['Tudo do plano Essencial', 'Atendimento em site + WhatsApp', 'Agendamento automático integrado', 'FAQ ilimitado com IA', 'Integração com Google Calendar', 'Relatórios avançados semanais', 'Suporte prioritário (chat)', '2 canais de atendimento'], highlight: true, cta: 'Escolher Avançado' },
    { name: 'Premium', price: 497, description: 'Solução completa para crescer sem limites', features: ['Tudo do plano Avançado', 'Integração com CRM/ERP', 'Branding 100% personalizado', 'WhatsApp + Site + Instagram + Facebook', 'Automação de vendas com IA', 'Relatórios em tempo real + BI', 'Suporte VIP (WhatsApp direto)', 'Canais ilimitados', 'Consultoria mensal inclusa'], highlight: false, cta: 'Quero o Premium' }
  ];

  const useCases: UseCase[] = [
    { icon: '🍕', title: 'Restaurantes & Delivery', problem: 'Perdem pedidos por demora no atendimento', solution: 'Bot recebe pedidos 24h, envia para cozinha e confirma entrega automaticamente' },
    { icon: '🏥', title: 'Clínicas & Consultórios', problem: 'Agenda lotada de ligações e confirmações', solution: 'Pacientes agendam sozinhos, bot confirma consulta e envia lembretes' },
    { icon: '🏠', title: 'Imobiliárias', problem: 'Leads perdidos fora do horário comercial', solution: 'Bot qualifica leads, envia fotos de imóveis e agenda visitas' },
    { icon: '💇', title: 'Salões & Academias', problem: 'Tempo perdido com agendamentos manuais', solution: 'Clientes agendam pelo WhatsApp, bot gerencia horários e envia lembretes' }
  ];

  const testimonials: Testimonial[] = [
    { name: 'Carlos Silva', business: 'Pizzaria Sabor & Arte', text: 'Aumentamos 40% nos pedidos noturnos. O bot responde na hora e não perde nenhum cliente!', rating: 5 },
    { name: 'Dra. Marina Costa', business: 'Clínica Vitalis', text: 'Reduzi 3h/dia de telefonemas. Agora os pacientes agendam sozinhos pelo WhatsApp.', rating: 5 },
    { name: 'Pedro Mendes', business: 'Imóveis Prime', text: 'O bot qualifica os leads antes de eu atender. Só falo com quem está realmente interessado!', rating: 5 }
  ];

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value } as unknown as FormData);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    alert(`Obrigado! Entraremos em contato em breve via WhatsApp: ${formData.phone}`);
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', company: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className="w-12 h-12 text-blue-400" aria-hidden="true" />
            <h1 className="text-6xl font-bold">Bot<span className="text-blue-400">GPT</span></h1>
          </div>
          <p className="text-center text-gray-400 text-xl mb-8">by <span className="text-blue-400 font-bold">EXTRAORDINÁ.RIA.</span></p>
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 leading-tight">Seu Atendente Virtual<br />que <span className="text-blue-400">Nunca Dorme</span></h2>
          <p className="text-2xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">Atenda clientes 24h, feche vendas no WhatsApp e automatize agendamentos enquanto você dorme. Tudo isso sem contratar mais funcionários.</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 flex items-center gap-3" aria-label="Testar grátis por 7 dias">Testar Grátis por 7 Dias <ArrowRight className="w-6 h-6" aria-hidden="true" /></button>
            <button onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-10 py-5 rounded-lg font-bold text-xl transition-all duration-300 hover:scale-105" aria-label="Ver demonstração">Ver Demonstração</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center"><Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" aria-hidden="true" /><h3 className="text-4xl font-bold text-blue-400 mb-2">24/7</h3><p className="text-gray-400">Atendimento Ininterrupto</p></div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center"><TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-3" aria-hidden="true" /><h3 className="text-4xl font-bold text-blue-400 mb-2">+40%</h3><p className="text-gray-400">Aumento em Vendas</p></div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center"><Zap className="w-12 h-12 text-blue-400 mx-auto mb-3" aria-hidden="true" /><h3 className="text-4xl font-bold text-blue-400 mb-2">3 Dias</h3><p className="text-gray-400">Para Estar Funcionando</p></div>
          </div>
        </div>
      </div>

      {/* Problem / Solution */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Você está <span className="text-red-500">perdendo dinheiro</span> agora mesmo</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div className="bg-red-900/20 border-2 border-red-500 p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-6 text-red-400">❌ Sem BotGPT</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3"><span className="text-red-400 text-xl mt-1">•</span><span>Clientes mandam mensagem fora do horário e você perde a venda</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 text-xl mt-1">•</span><span>Sua equipe gasta horas respondendo as mesmas perguntas</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 text-xl mt-1">•</span><span>Leads desistem porque demorou para responder</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 text-xl mt-1">•</span><span>Você precisa contratar mais gente para atender mais</span></li>
              </ul>
            </div>
            <div className="bg-green-900/20 border-2 border-green-500 p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-6 text-green-400">✅ Com BotGPT</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3"><CheckCircle className="text-green-400 w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" /><span>Atende clientes 24h, sábado, domingo e feriados</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-green-400 w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" /><span>Responde instantaneamente perguntas frequentes</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-green-400 w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" /><span>Captura e qualifica leads automaticamente</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-green-400 w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" /><span>Escala sem precisar contratar mais pessoas</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-6">Cada cliente que não responde é <span className="text-red-400">dinheiro deixado na mesa</span></p>
            <button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 rounded-lg font-bold text-2xl transition-all duration-300 hover:scale-105" aria-label="Resolver isso agora">Resolver Isso Agora</button>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div id="cases" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-6">BotGPT Funciona para o <span className="text-blue-400">Seu Negócio</span></h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">Já estamos transformando atendimento em diversos setores</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-blue-400 transition-all duration-300">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-red-400 mb-3 font-semibold">Problema: {useCase.problem}</p>
                <p className="text-green-400">Solução: {useCase.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Como Funciona? <span className="text-blue-400">Simples assim</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center"><div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">1</div><h3 className="text-2xl font-bold mb-4">Você Contrata</h3><p className="text-gray-400">Escolhe seu plano, faz o cadastro e pronto. Sem burocracia, sem complicação.</p></div>
            <div className="text-center"><div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">2</div><h3 className="text-2xl font-bold mb-4">Nós Configuramos</h3><p className="text-gray-400">Em até 3 dias úteis, seu bot está pronto e personalizado com as cores e informações da sua empresa.</p></div>
            <div className="text-center"><div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">3</div><h3 className="text-2xl font-bold mb-4">Você Fatura Mais</h3><p className="text-gray-400">O bot começa a atender 24h, você acompanha tudo pelo painel e vê seus resultados crescendo.</p></div>
          </div>
          <div className="text-center mt-12"><p className="text-2xl font-bold text-blue-400 mb-4">Teste GRÁTIS por 7 dias. Sem cartão de crédito. Sem compromisso.</p><button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all duration-300 hover:scale-105" aria-label="Começar teste grátis">Começar Teste Grátis</button></div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div id="plans" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-6">Escolha Seu <span className="text-blue-400">Plano</span></h2>
          <p className="text-xl text-gray-400 text-center mb-16">Todos os planos incluem 7 dias de teste grátis</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <div key={idx} className={`bg-gray-900 border-2 p-8 rounded-lg relative ${plan.highlight ? 'border-blue-400 transform scale-105' : 'border-gray-800'}`}>
                {plan.highlight && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-bold">MAIS POPULAR</div>}
                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6"><span className="text-5xl font-bold text-blue-400">R$ {plan.price}</span><span className="text-gray-400">/mês</span></div>
                <button onClick={() => handlePlanSelect(plan)} className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 mb-6 ${plan.highlight ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`} aria-label={`Selecionar plano ${plan.name}`}>{plan.cta}</button>
                <ul className="space-y-3">{plan.features.map((feature, fIdx) => <li key={fIdx} className="flex items-start gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-900 py-20"><div className="container mx-auto px-6"><h2 className="text-5xl font-bold text-center mb-16">O Que Nossos Clientes <span className="text-blue-400">Dizem</span></h2><div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">{testimonials.map((t, i) => <div key={i} className="bg-gray-800 border border-gray-700 p-8 rounded-lg"><div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400" />)}</div><p className="text-gray-300 mb-6 italic">"{t.text}"</p><div><p className="font-bold">{t.name}</p><p className="text-gray-400 text-sm">{t.business}</p></div></div>)}</div></div></div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20"><div className="container mx-auto px-6 text-center"><h2 className="text-5xl font-bold mb-6">Pronto para Parar de Perder Vendas?</h2><p className="text-2xl mb-8 max-w-3xl mx-auto">Teste o BotGPT grátis por 7 dias e veja seus resultados crescerem sem esforço. Cancele quando quiser, sem multa, sem pegadinhas.</p><button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 rounded-lg font-bold text-2xl transition-all duration-300 hover:scale-105" aria-label="Começar teste grátis agora">Começar Teste Grátis Agora</button><p className="mt-6 text-blue-100">⚡ Configuração em até 3 dias úteis • 💳 Sem cartão de crédito no trial</p></div></div>

      {/* Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-md w-full p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Fechar modal"><X className="w-6 h-6" aria-hidden="true" /></button>
            <h3 className="text-3xl font-bold mb-4">Plano <span className="text-blue-400">{selectedPlan.name}</span></h3>
            <p className="text-4xl font-bold text-blue-400 mb-6">R$ {selectedPlan.price}/mês</p>
            <div className="space-y-4">
              <div><label className="block text-gray-300 mb-2 font-semibold">Nome Completo</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none" placeholder="Seu nome" /></div>
              <div><label className="block text-gray-300 mb-2 font-semibold">E-mail</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none" placeholder="seu@email.com" /></div>
              <div><label className="block text-gray-300 mb-2 font-semibold">WhatsApp</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none" placeholder="(11) 99999-9999" /></div>
              <div><label className="block text-gray-300 mb-2 font-semibold">Empresa</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none" placeholder="Nome da sua empresa" /></div>
              <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 mt-6" aria-label="Iniciar teste grátis por 7 dias">Iniciar Teste Grátis por 7 Dias</button>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">🔒 Seus dados estão seguros • Não solicitamos cartão de crédito</p>
          </div>
        </div>
      )}

      <footer className="bg-black border-t border-gray-800 py-8"><div className="container mx-auto px-6 text-center text-gray-400"><p className="mb-2"><span className="font-bold text-white">BotGPT</span> by <span className="text-blue-400 font-bold">EXTRAORDINÁ.RIA.</span></p><p>AI First . People Always.</p><p className="mt-4 text-sm">contato@extraordinaria.ai • WhatsApp: +55 11 99999-9999</p></div></footer>
    </div>
  );
};

export default BotGPTLanding;
