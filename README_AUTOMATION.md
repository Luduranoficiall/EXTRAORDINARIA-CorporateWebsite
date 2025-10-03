O que o helper `scripts/setup-github.ps1` faz

- Inicializa um repositório Git local (se ainda não existir).
- Faz um commit inicial com todos os arquivos.
- Se o GitHub CLI (`gh`) estiver instalado e autenticado, tenta criar um repositório remoto no GitHub (privado por padrão) e vincular como `origin`.
- Opcionalmente dá push para `origin/main` se `-AutoPush $true` for passado.

Novos scripts disponíveis

- `scripts/push-to-github-via-token.ps1` — cria um repositório no GitHub usando a API e o token presente na variável de ambiente `GITHUB_TOKEN`, configura o remoto `origin` e faz o push inicial (main).
- `scripts/auto-backup-push.ps1` — comita mudanças locais (se houver) e faz push para `origin/main`.

Como usar com token (PowerShell):

```powershell
# Exporte seu token (somente nesta sessão)
$env:GITHUB_TOKEN = "ghp_xxxREPLACE_WITH_YOUR_TOKENxxx"
.\scripts\push-to-github-via-token.ps1 -RepoName "meu-repo" -Private:$true
```

Depois de criado o remoto, você pode usar o auto-push:

```powershell
.\scripts\auto-backup-push.ps1 -Message "auto: snapshot"

Comandos finais para instalar e preparar tudo (PowerShell)

1) Instalar dependências:

```powershell
npm install
```

2) Preparar Husky (cria a pasta .husky e ativa hooks):

```powershell
npm run prepare
```

3) Inicializar git (se necessário) e criar commit inicial:

```powershell
git init
git add -A
git commit -m "chore: initial commit"
```

4) Criar remoto e dar push (duas opções):

- Usando GitHub CLI (`gh`) — recomendado se já estiver autenticado:

```powershell
gh repo create nome-do-repo --private --source=. --remote=origin --push
```

- Usando token (script já incluso):

```powershell
$env:GITHUB_TOKEN = "ghp_xxxREPLACE_WITH_YOUR_TOKENxxx"
.\scripts\push-to-github-via-token.ps1 -RepoName "nome-do-repo" -Private:$true
Remove-Item Env:\GITHUB_TOKEN
```

5) Iniciar watcher de auto-backup (opcional):

```powershell
npm run auto-backup
```

Se ocorrerem erros durante `npm install` ou `npm run prepare`, cole a saída aqui e eu te ajudo a resolver.

Bootstrap (script único)

Se preferir um único script que tente instalar dependências, preparar Husky, inicializar git e opcionalmente criar/pushar um repositório remoto, execute o helper Windows:

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\bootstrap-windows.ps1 -RepoName "nome-do-repo" -CreateRemote -UseGh -AutoPush
```

Ou com token (se não tiver gh):

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\bootstrap-windows.ps1 -RepoName "nome-do-repo" -CreateRemote -UseToken -Token "ghp_xxx" -AutoPush
```
```

Como usar (PowerShell):

1. Abra PowerShell na pasta do projeto:

```powershell
cd 'C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite'
```

2. Rode o helper (exemplo):

```powershell
.\scripts\setup-github.ps1 -RepoName "meu-repo" -Private:$true -AutoPush:$false
```

Notas e segurança
- Se você optar por `-AutoPush $true`, certifique-se que está autenticado no GitHub (por `gh auth login` ou via HTTPS com credenciais).
- O script faz um commit automático. Revise os arquivos antes de executar.
