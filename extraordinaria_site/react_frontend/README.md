# Extraordinária - Frontend

Este diretório contém o frontend React + TypeScript do site EXTRAORDINÁRI.A (BotGPT).

Passos rápidos para desenvolvimento (Windows):

1. Abrir um terminal CMD (recomendado quando o PowerShell tem política restrita):

   cd "c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\react_frontend"
   npm install
   npm run start

2. Para criar build de produção:

   npm run build

3. Verificação de tipos:

   npm run typecheck

Resolução de problemas comuns:

- "execução de scripts foi desabilitada": abra um terminal CMD ou execute PowerShell como Administrador e rode `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`.
- Se faltar dependências de tipos, rode: `npm install --save-dev @types/node @types/react @types/react-dom`.

Se quiser, eu posso rodar `npm run build` aqui e revisar qualquer erro que apareça. Basta autorizar.
