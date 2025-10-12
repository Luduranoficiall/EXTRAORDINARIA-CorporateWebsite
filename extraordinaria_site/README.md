> LEGACY: este diretório foi substituído pelo projeto único `CorporateWebsite`.

# EXTRAORDINARIA (LEGACY)

Este projeto foi consolidado em um único repositório/projeto: `CorporateWebsite`.
Use os scripts e a documentação em:

```
CorporateWebsite/README.md
CorporateWebsite/scripts/start-all.ps1
CorporateWebsite/scripts/start-backend-fast.ps1
CorporateWebsite/scripts/start-frontend.ps1
```

As instruções abaixo são apenas históricas e não são mais mantidas. Prefira o `CorporateWebsite`.

## Requisitos
- Node.js (v16+ recomendado)
- Python 3.8+

## Backend (Python)
1. Abra o terminal e navegue até `extraordinaria_site/backend`

```powershell
cd c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\backend
```

2. Crie e ative o ambiente virtual (Windows):

```powershell
python -m venv venv
.\venv\Scripts\activate
```

3. Instale dependências:

```powershell
pip install -r requirements.txt
```

4. Inicie o servidor:

```powershell
python server.py
```

O backend ficará disponível em `http://127.0.0.1:5000`. Endpoints de teste:
- `http://127.0.0.1:5000/api/test`
- `http://127.0.0.1:5000/api/health`

## Frontend (React)
1. Abra outro terminal e navegue até `extraordinaria_site/react_frontend`

```powershell
cd c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\react_frontend
```

2. Instale dependências e inicie o frontend:

```powershell
npm install
npm start
```

O frontend ficará disponível em `http://localhost:3000`.

---

Se algo falhar, copie o erro e cole aqui para que eu possa ajudar a resolver.

## Integrações e Admin API

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