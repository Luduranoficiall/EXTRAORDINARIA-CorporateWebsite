Python (AI Orchestrator + utilitários)

- AI Orchestrator completo em `ai_orchestrator/` (IA, Storage, Pagamentos, Analytics, Data API)
- Notebook Assistente (resumos + QA com fontes) em `ai_orchestrator/services/notebook_service.py`, exposto via endpoints:
	- `GET /notebook/embed.js` (script para embutir botão/ painel)
	- `POST /notebook/summarize` { urls: string[] }
	- `POST /notebook/qa` { urls: string[], question: string }
- Exemplos equivalentes: `cpp_equivalent.py`, `hello_cpp_equivalent.py`
- Automação: `gh_push_via_token.py`

Instalação de utilitários (não confundir com os requisitos do Orchestrator):

```powershell
python -m pip install -r requirements.txt
```

Como usar o Notebook (local):

1. Inicie o Orchestrator (porta 5050). Em seguida, numa página HTML de teste, inclua:

```html
<script src="http://localhost:5050/notebook/embed.js" async></script>
```

2. Clique em “Notebook”, cole URLs de artigos/páginas, e faça perguntas. As respostas são baseadas apenas nas fontes.
