# 🚀 EXTRAORDINÁRIA.AI - Sistema Completo v2.0> LEGACY: este diretório foi substituído pelo projeto único `CorporateWebsite`.



![Status](https://img.shields.io/badge/Status-Online-success)# EXTRAORDINARIA (LEGACY)

![Version](https://img.shields.io/badge/Version-2.0-blue)

![License](https://img.shields.io/badge/License-Proprietário-red)Este projeto foi consolidado em um único repositório/projeto: `CorporateWebsite`.

Use os scripts e a documentação em:

## 📋 Visão Geral

```

**EXTRAORDINÁRIA.AI** é uma plataforma completa de transformação empresarial com Inteligência Artificial, oferecendo consultoria, gestão e inovação para empresas que desejam se diferenciar no mercado.CorporateWebsite/README.md

CorporateWebsite/scripts/start-all.ps1

### ✨ Novidades da Versão 2.0CorporateWebsite/scripts/start-backend-fast.ps1

CorporateWebsite/scripts/start-frontend.ps1

- ✅ **PWA (Progressive Web App)** - Instalável em dispositivos móveis```

- ✅ **Service Worker** - Funciona offline

- ✅ **Analytics Próprio** - Sistema de rastreamento sem dependências externasAs instruções abaixo são apenas históricas e não são mais mantidas. Prefira o `CorporateWebsite`.

- ✅ **Otimização de Performance** - Lazy loading, prefetch inteligente

- ✅ **SEO Avançado** - Sitemap, robots.txt, meta tags otimizadas## Requisitos

- ✅ **Segurança Reforçada** - Headers de segurança, CSP, HTTPS- Node.js (v16+ recomendado)

- ✅ **Deploy Automático** - Scripts para GitHub Pages e Vercel- Python 3.8+

- ✅ **Monitoramento** - Sistema de status em tempo real

## Backend (Python)

## 🚀 Início Rápido1. Abra o terminal e navegue até `extraordinaria_site/backend`



### Windows (Duplo clique)```powershell

```cd c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\backend

INICIAR-EXTRAORDINARIA.bat```

```

2. Crie e ative o ambiente virtual (Windows):

### Linha de Comando

```bash```powershell

python servidor_permanente.pypython -m venv venv

```.\venv\Scripts\activate

```

## 🌐 URLs

3. Instale dependências:

- **Local**: http://localhost:8000

- **Dashboard**: http://localhost:8000/dashboard.html```powershell

- **GitHub Pages**: https://luduranoficiall.github.io/EXTRAORDINARIA-CorporateWebsite/pip install -r requirements.txt

```

## 🔐 Credenciais Dashboard

4. Inicie o servidor:

- **Email**: ceo@extraordinaria.ai

- **Senha**: EXTRAORDINARIA2024```powershell

python server.py

## 📁 Arquivos Principais```



- `index.html` - Homepage (130 KB)O backend ficará disponível em `http://127.0.0.1:5000`. Endpoints de teste:

- `dashboard.html` - CEO Dashboard (35 KB)- `http://127.0.0.1:5000/api/test`

- `servidor_permanente.py` - Servidor HTTP- `http://127.0.0.1:5000/api/health`

- `service-worker.js` - PWA Offline

- `analytics.js` - Analytics próprio## Frontend (React)

- `performance.js` - Otimizações1. Abra outro terminal e navegue até `extraordinaria_site/react_frontend`



## 📊 Analytics no Console```powershell

cd c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\react_frontend

```javascript```

getAnalyticsStats()  // Ver estatísticas

trackEvent('nome', {dados})  // Rastrear evento2. Instale dependências e inicie o frontend:

getPerformanceScore()  // Score de performance

``````powershell

npm install

## 🚀 Deploy Automáticonpm start

```

```powershell

.\auto-deploy.ps1  # Deploy GitHub + VercelO frontend ficará disponível em `http://localhost:3000`.

.\monitor.ps1      # Status do sistema

```---



---Se algo falhar, copie o erro e cole aqui para que eu possa ajudar a resolver.



**Desenvolvido por EXTRAORDINÁRIA.AI** 💙## Integrações e Admin API


O projeto inclui um Admin API para gerenciar integrações com serviços externos. Antes de usar, configure as variáveis de ambiente abaixo no arquivo `.env` do backend (ou no seu ambiente):

- `ADMIN_KEY` - Chave secreta usada no cabeçalho `X-ADMIN-KEY` para acessar o admin API.
- `POWERBI_KEY` - Chave ou credenciais para Power BI (placeholder).
- `STRIPE_KEY` / `STRIPE_SECRET` - Chave da API do Stripe.
- `SALESFORCE_TOKEN` - Token para integração com Salesforce.
- `OPENAI_API_KEY` - Chave da OpenAI para o chatbot.
- `FIREBASE_CREDENTIALS` - JSON ou caminho para credenciais do Firebase.

### Iniciar o Admin API
1. No mesmo ambiente do backend, execute:

```powershell
cd c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\backend
.\venv\Scripts\activate
python admin_api.py
```

2. Endpoints principais (protegidos por `X-ADMIN-KEY`):

- `GET /admin/status` - Retorna o status de todas as integrações.
- `POST /admin/powerbi/embed` - Gera dados para embed (report_id, workspace_id).
- `POST /admin/stripe/create_payment` - Cria um payment intent (placeholder).
- `POST /admin/salesforce/push_lead` - Envia lead para Salesforce (placeholder).
- `POST /admin/chat` - Faz proxy para o `openai_wrapper.chat`.

Use um header `X-ADMIN-KEY: <ADMIN_KEY>` em todas as requisições para autenticar.

### Observações de segurança
- Não exponha o `admin_api.py` em produção sem HTTPS e regras de firewall.
- Troque a `ADMIN_KEY` por uma chave forte e armazene no cofre de segredos da sua infra.

Se quiser, eu posso provisionar scripts para criar tokens do Power BI, rotinas para sincronizar dados com o Power BI Service, e exemplos de relatórios embutidos no frontend (via iframe/embed token). Peça e eu preparo os próximos passos.