# 📊 EXPANSÃ.O ADS – Guia de Implementação

## 🎯 Visão Geral

Sistema completo de Landing Pages otimizadas para campanhas de tráfego pago (Meta Ads, Google Ads, LinkedIn Ads) com tracking de conversão integrado.

---

## 🚀 Como Acessar a Landing Page de ADS

### URL Principal
```
https://extraordinaria.ai/?ads=true
```

### URLs com Tracking Personalizado

#### Meta Ads (Facebook/Instagram)
```
https://extraordinaria.ai/?ads=true&source=meta&campaign=instagram-feed-q1
https://extraordinaria.ai/?ads=true&source=facebook&campaign=facebook-carousel
```

#### Google Ads
```
https://extraordinaria.ai/?ads=true&source=google&campaign=search-ia-consultoria
https://extraordinaria.ai/?ads=true&source=google&campaign=display-pmes
```

#### LinkedIn Ads
```
https://extraordinaria.ai/?ads=true&source=linkedin&campaign=linkedin-b2b-2024
```

#### TikTok Ads
```
https://extraordinaria.ai/?ads=true&source=tiktok&campaign=tiktok-creators
```

---

## 🎨 Estrutura da Landing Page

### Elementos Otimizados para Conversão

1. **Hero Section Above-the-Fold**
   - Headline impactante com proposta de valor clara
   - Formulário de captura de leads visível sem scroll
   - Badge de urgência/escassez (vagas limitadas)
   - Prova social com estrelas e números

2. **Benefícios Visuais**
   - 4 benefícios principais com ícones coloridos
   - Dados quantificáveis (40%, 70%, 10x)
   - Foco em resultados tangíveis

3. **Formulário de Lead**
   - 5 campos otimizados (nome, email, telefone, empresa, interesse)
   - Tracking automático de conversões
   - Página de obrigado com próximos passos

4. **Prova Social**
   - Números de empresas transformadas
   - ROI médio e satisfação
   - Depoimentos de clientes reais

5. **Soluções em Destaque**
   - 4 soluções principais com badges de destaque
   - Features bullet points
   - CTA secundários

6. **Depoimentos**
   - 3 casos de sucesso com resultados
   - Nomes e empresas reais
   - Badges com métricas de resultado

7. **Garantias**
   - 4 garantias para reduzir fricção
   - Ícones de segurança e confiança

8. **CTA Final**
   - Última oportunidade com urgência
   - Botão grande e destacado
   - Scroll automático para formulário

---

## 📈 Configuração de Tracking

### 1. Meta Pixel (Facebook/Instagram)

No arquivo `/components/TrackingScripts.tsx`, substitua:
```typescript
metaPixelId="YOUR_META_PIXEL_ID"
```

Por:
```typescript
metaPixelId="123456789012345"  // Seu Pixel ID real
```

**Eventos Tracked Automaticamente:**
- `PageView` - Visualização da landing page
- `Lead` - Submissão do formulário
- `Contact` - Clique em telefone/WhatsApp
- `ViewContent` - Interação com seções

### 2. Google Analytics 4

Substitua:
```typescript
googleAnalyticsId="G-XXXXXXXXXX"
```

Por:
```typescript
googleAnalyticsId="G-ABC123XYZ"  // Seu ID do GA4
```

### 3. Google Ads Conversion

Substitua:
```typescript
googleAdsId="AW-XXXXXXXXXX"
```

Por:
```typescript
googleAdsId="AW-123456789"  // Seu ID de conversão
```

---

## 🔗 Configuração de URLs para Campanhas

### Estrutura Recomendada de UTMs

#### Meta Ads
```
?ads=true
&source=meta
&utm_source=facebook
&utm_medium=paid_social
&utm_campaign=q1-2024-consultoria
&utm_content=carousel-ia
&utm_term=consultoria-ia
```

#### Google Ads
```
?ads=true
&source=google
&utm_source=google
&utm_medium=cpc
&utm_campaign=search-ia-2024
&utm_content=anuncio-a
&utm_term=consultoria+inteligencia+artificial
```

### Exemplos de Campanhas Específicas

**Campanha 1: Instagram Feed - Consultoria**
```
https://extraordinaria.ai/?ads=true&source=instagram&campaign=feed-consultoria-pmes&utm_medium=paid_social
```

**Campanha 2: Google Search - Chatbots**
```
https://extraordinaria.ai/?ads=true&source=google&campaign=search-chatbot&utm_medium=cpc&interest=chatbot
```

**Campanha 3: LinkedIn - B2B Executivos**
```
https://extraordinaria.ai/?ads=true&source=linkedin&campaign=linkedin-ceos&utm_medium=paid_social
```

---

## 📱 Redes Sociais da EXTRAORDINÁRI.A.

### Links Oficiais

- **Instagram:** [@extraordinaria.ai](https://instagram.com/extraordinaria.ai)
- **LinkedIn:** [EXTRAORDINÁRI.A.](https://linkedin.com/company/extraordinaria)
- **YouTube:** [Canal EXTRAORDINARIA](https://youtube.com/@extraordinaria)
- **Facebook:** [extraordinaria.ai](https://facebook.com/extraordinaria.ai)
- **TikTok:** [@extraordinaria.ai](https://tiktok.com/@extraordinaria.ai)
- **Website:** [www.extraordinaria.ai](https://extraordinaria.ai)

### Seção de Redes Sociais

Integrada no site principal em:
```
https://extraordinaria.ai/#social
```

Com tracking automático de cliques em todas as redes sociais.

---

## 🎯 Segmentação de Público-Alvo

### Personas Recomendadas

#### 1. **Empreendedor Digital (25-45 anos)**
- Interesse: Automação, Produtividade, IA
- Canais: Instagram, YouTube, TikTok
- Mensagem: "Automatize e escale seu negócio"

#### 2. **Gestor de PME (35-55 anos)**
- Interesse: Redução de custos, Eficiência
- Canais: LinkedIn, Google Search, Facebook
- Mensagem: "Reduza custos em 70% com IA"

#### 3. **CEO/Fundador (40-60 anos)**
- Interesse: Transformação digital, Competitividade
- Canais: LinkedIn, Google Search
- Mensagem: "Torne sua empresa DIFERENCI.A.DA"

#### 4. **Gerente de Vendas (30-50 anos)**
- Interesse: Aumentar vendas, Chatbots
- Canais: LinkedIn, Instagram, Facebook
- Mensagem: "Aumente vendas em 40% com chatbots"

---

## 💰 Sugestões de Orçamento

### Meta Ads (Instagram/Facebook)
- **Budget Inicial:** R$ 50-100/dia
- **Objetivo:** Geração de Leads
- **Formato:** Carousel, Single Image, Video
- **Público:** 100k-500k pessoas (interesse em IA, tecnologia, empreendedorismo)

### Google Ads
- **Budget Inicial:** R$ 70-150/dia
- **Objetivo:** Conversões (Leads)
- **Tipo:** Search + Display
- **Palavras-chave:** 
  - "consultoria inteligência artificial"
  - "automação empresarial"
  - "chatbot para empresas"
  - "transformação digital"

### LinkedIn Ads
- **Budget Inicial:** R$ 100-200/dia
- **Objetivo:** Geração de Leads B2B
- **Formato:** Sponsored Content, Message Ads
- **Segmentação:** CEOs, Diretores, Gestores (100+ funcionários)

---

## 📊 KPIs Recomendados

### Métricas de Campanha
- **CPM (Custo por Mil Impressões):** < R$ 30
- **CPC (Custo por Clique):** < R$ 3
- **CTR (Taxa de Cliques):** > 2%
- **CPL (Custo por Lead):** < R$ 50
- **Taxa de Conversão:** > 5%

### Métricas de Landing Page
- **Bounce Rate:** < 40%
- **Tempo na Página:** > 2 minutos
- **Taxa de Preenchimento:** > 30%
- **Taxa de Conclusão do Formulário:** > 80%

---

## 🔧 Integrações Recomendadas

### CRM (Zoho)
Conectar formulário de leads diretamente ao Zoho CRM:
```typescript
// Em /components/LandingPageAds.tsx
const response = await fetch('https://api.zoho.com/crm/v2/Leads', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ZOHO_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: [formData]
  })
});
```

### WhatsApp Business API
Envio automático de mensagem de boas-vindas após lead.

### Email Marketing (RD Station, MailChimp)
Automação de nutrição de leads.

---

## 📝 Copy Sugerido para Anúncios

### Headlines (20 variações)
1. "Sua Empresa Pode Ser DIFERENCI.A.DA"
2. "Transforme Seu Negócio com IA em 30 Dias"
3. "Reduza Custos em 70% com Inteligência Artificial"
4. "Aumente Vendas em 40% com Chatbots 24/7"
5. "IA FIRST: A Nova Era dos Negócios"
6. "Consultoria Gratuita: Descubra o Poder da IA"
7. "Automações que Economizam 40h/semana"
8. "Seja Extraordinário, Não Comum"
9. "ROI 10x com Inteligência Artificial"
10. "Atendimento 24/7 no Automático"

### Descrições (5 variações)
1. "Consultoria, automações, chatbots e treinamentos em IA. Resultados reais, redução de custos e aumento de competitividade. Agende sua EXPERIENCI.A. gratuita."

2. "Somos IA FIRST: unimos gestão, pessoas e tecnologia para transformar negócios. Mais de 150 empresas transformadas. Seja a próxima."

3. "Descubra como sua empresa pode se tornar DIFERENCI.A.DA com soluções práticas de IA. Consultoria gratuita sem compromisso."

4. "Chatbots que vendem 24/7, automações que economizam tempo, treinamentos que capacitam equipes. Transformação garantida."

5. "IA que gera resultados reais: +40% vendas, -70% custos, +5x produtividade. Agende agora e comprove."

### CTAs
- "Agende sua EXPERIENCI.A. Gratuita"
- "Quero Transformar Meu Negócio"
- "Descubra Como Ser DIFERENCI.A.DA"
- "Consultoria Gratuita - Vagas Limitadas"
- "Comece Sua Transformação Agora"

---

## 🎬 Formatos de Criativos

### Imagens Estáticas
- **Tamanho:** 1080x1080 (quadrado) ou 1080x1920 (stories)
- **Elementos:** Logo, headline, benefício principal, CTA
- **Cores:** Fundo preto, texto branco, destaques em azul (#00d4ff)

### Carrosels
- **Slides:** 3-5 imagens
- **Conteúdo:** 1) Problema, 2) Solução, 3) Benefícios, 4) Prova Social, 5) CTA

### Vídeos
- **Duração:** 15-30 segundos
- **Estrutura:** Problema (3s) → Solução (10s) → Benefício (7s) → CTA (5s)
- **Legendas:** Sempre incluir (80% assistem sem som)

---

## ✅ Checklist de Lançamento

### Pré-Lançamento
- [ ] Configurar Meta Pixel ID
- [ ] Configurar Google Analytics ID
- [ ] Configurar Google Ads Conversion ID
- [ ] Testar formulário de leads
- [ ] Verificar tracking de eventos
- [ ] Configurar integração com CRM
- [ ] Criar campanhas nas plataformas
- [ ] Preparar criativos (imagens/vídeos)
- [ ] Definir orçamentos diários
- [ ] Configurar públicos personalizados

### Pós-Lançamento
- [ ] Monitorar métricas diariamente
- [ ] Ajustar lances e orçamentos
- [ ] A/B test de criativos
- [ ] A/B test de copy
- [ ] Otimizar palavras-chave (Google)
- [ ] Expandir públicos semelhantes
- [ ] Implementar retargeting
- [ ] Nutrição de leads via email

---

## 🆘 Suporte

Para dúvidas ou suporte técnico sobre a implementação das campanhas ADS:

📧 Email: tech@extraordinaria.ai
📱 WhatsApp: (11) 9XXXX-XXXX
🌐 Website: www.extraordinaria.ai

---

## 📄 Licença

Documento confidencial da EXTRAORDINÁRI.A. - Todos os direitos reservados © 2024