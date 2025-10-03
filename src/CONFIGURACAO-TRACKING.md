# 🔧 Guia Rápido de Configuração de Tracking

## ⚡ Setup em 5 Minutos

### 1️⃣ Meta Pixel (Facebook/Instagram)

**Onde pegar o Pixel ID:**
1. Acesse: https://business.facebook.com/events_manager
2. Clique no seu Pixel
3. Copie o número de 15 dígitos (ex: 123456789012345)

**Onde configurar:**
- Arquivo: `/components/TrackingScripts.tsx`
- Linha: 13
- Trocar: `metaPixelId="YOUR_META_PIXEL_ID"`
- Por: `metaPixelId="123456789012345"`

### 2️⃣ Google Analytics 4

**Onde pegar o ID:**
1. Acesse: https://analytics.google.com
2. Admin → Propriedade → Streams de dados
3. Copie o código que começa com "G-" (ex: G-ABC123XYZ)

**Onde configurar:**
- Arquivo: `/components/TrackingScripts.tsx`
- Linha: 14
- Trocar: `googleAnalyticsId="G-XXXXXXXXXX"`
- Por: `googleAnalyticsId="G-ABC123XYZ"`

### 3️⃣ Google Ads

**Onde pegar o ID:**
1. Acesse: https://ads.google.com
2. Ferramentas → Medição → Conversões
3. Copie o código que começa com "AW-" (ex: AW-123456789)

**Onde configurar:**
- Arquivo: `/components/TrackingScripts.tsx`
- Linha: 15
- Trocar: `googleAdsId="AW-XXXXXXXXXX"`
- Por: `googleAdsId="AW-123456789"`

---

## 📊 Eventos Que São Tracked Automaticamente

### Meta Pixel Events
- ✅ `PageView` - Quando alguém acessa a landing page
- ✅ `Lead` - Quando alguém envia o formulário
- ✅ `Contact` - Quando alguém clica em telefone/WhatsApp
- ✅ `ViewContent` - Quando alguém interage com seções

### Google Analytics Events
- ✅ `page_view` - Visualização de página
- ✅ `generate_lead` - Formulário enviado
- ✅ `phone_click` - Clique em telefone
- ✅ `whatsapp_click` - Clique em WhatsApp

---

## 🔗 URLs Para Suas Campanhas

### Template Base
```
https://extraordinaria.ai/?ads=true&source=[REDE]&campaign=[NOME-CAMPANHA]
```

### Exemplos Prontos Para Usar

**Instagram Feed:**
```
https://extraordinaria.ai/?ads=true&source=instagram&campaign=feed-consultoria
```

**Facebook Carousel:**
```
https://extraordinaria.ai/?ads=true&source=facebook&campaign=carousel-pmes
```

**Google Search:**
```
https://extraordinaria.ai/?ads=true&source=google&campaign=search-ia
```

**LinkedIn Sponsored:**
```
https://extraordinaria.ai/?ads=true&source=linkedin&campaign=b2b-executivos
```

---

## ✅ Como Testar Se Está Funcionando

### 1. Meta Pixel
1. Instale a extensão "Meta Pixel Helper" no Chrome
2. Acesse sua landing page com `?ads=true`
3. Veja se o pixel está disparando eventos (ícone verde)

### 2. Google Analytics
1. Acesse o Google Analytics
2. Relatórios em tempo real → Eventos
3. Abra sua landing page em outra aba
4. Veja se aparece o evento `page_view`

### 3. Formulário
1. Preencha o formulário de teste
2. Verifique se os eventos `Lead` (Meta) e `generate_lead` (GA) disparam
3. Confirme que aparece a tela de "Obrigado"

---

## 🎯 Dicas de Otimização

### Para Melhor Performance
1. Use URLs diferentes para cada campanha (tracking)
2. Teste A/B com diferentes headlines
3. Mude os badges de urgência ("Vagas limitadas")
4. Ajuste o formulário (menos campos = mais conversões)

### Segmentação Recomendada
- **Idade:** 25-55 anos
- **Interesses:** Empreendedorismo, Tecnologia, IA, Gestão
- **Comportamento:** Engajamento com conteúdo B2B
- **Localização:** Brasil (principais capitais)

---

## 📞 Contatos Para Suporte

**Marketing Digital:**
- Email: marketing@extraordinaria.ai

**Suporte Técnico:**
- Email: tech@extraordinaria.ai

**CEO (Humberto Duran):**
- Email: humberto@extraordinaria.ai

---

**Última atualização:** Outubro 2024
**Versão:** 1.0