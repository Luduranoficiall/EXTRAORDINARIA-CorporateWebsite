<#
Bootstrap script (Windows PowerShell) - instala dependências, prepara husky, inicializa git
e opcionalmente cria um repositório no GitHub e faz push.

Uso exemplo (com gh):
PowerShell -ExecutionPolicy Bypass -File .\scripts\bootstrap-windows.ps1 -RepoName "meu-repo" -CreateRemote -UseGh -AutoPush

Uso exemplo (com token):
PowerShell -ExecutionPolicy Bypass -File .\scripts\bootstrap-windows.ps1 -RepoName "meu-repo" -CreateRemote -UseToken -Token "ghp_xxx" -AutoPush

Observações:
- Rode em PowerShell com privilégios de usuário (não precisa ser admin).
- O script tenta ser não interativo e falhará com mensagens claras se algo estiver faltando.
#>
param(
  [string]$RepoName = "",
  [switch]$CreateRemote,
  [switch]$UseGh,
  [switch]$UseToken,
  [string]$Token = "",
  [switch]$AutoPush
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Log { param($m) Write-Host "[bootstrap] $m" }
function Err { param($m) Write-Error "[bootstrap] $m" }

# Security: allow script execution for this process only
try { Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force } catch { }

$cwd = (Get-Location).Path
Log "Working directory: $cwd"
if ($cwd -match '(?i)OneDrive') {
  Write-Warning "Pasta localizada em OneDrive. Recomendo pausar a sincronização durante builds/installs para evitar problemas de bloqueio."
}

# Check prerequisites
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Err "npm não encontrado no PATH. Instale Node.js/NPM e tente novamente."; exit 2 }
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Err "git não encontrado no PATH. Instale Git e tente novamente."; exit 3 }

# 1) npm install
try {
  Log "Instalando dependências (npm install)..."
  npm install --no-audit --no-fund
  Log "npm install concluído."
} catch {
  Err "npm install falhou: $($_.Exception.Message)"
  exit 4
}

# 2) preparar husky
try {
  if (Get-Command npm -ErrorAction SilentlyContinue) {
    Log "Executando 'npm run prepare' para configurar Husky..."
    npm run prepare
  }
} catch {
  Write-Warning "npm run prepare falhou: $($_.Exception.Message)\nContinuando..."
}

# 3) git init / commit
$initialCommit = $false
if (-not (Test-Path .git)) {
  try {
    Log "Inicializando repositório git..."
    git init
    $initialCommit = $true
  } catch {
    Err "Falha ao inicializar git: $($_.Exception.Message)"
    exit 5
  }
} else {
  Log ".git já existe - pulando git init."
}

try {
  Log "Adicionando arquivos (git add -A)..."
  git add -A
  # somente commita se houver algo a commitar
  $status = git status --porcelain
  if ($status) {
    if ($initialCommit) {
      git commit -m "chore: initial commit (automated)"
      Log "Commit inicial criado."
    } else {
      try {
        git commit -m "chore: workspace changes (automated)" | Out-Null
      } catch {
        Log "Nada novo para commitar." | Out-Null
      }
    }
  } else {
    Log "Nenhuma mudança detectada para commitar."
  }
} catch {
  Write-Warning "git add/commit encontrou problemas: $($_.Exception.Message)"
}

# 4) Criar repositório remoto (opcional)
if ($CreateRemote) {
  if (-not $RepoName) { Err "Parameter -RepoName é necessário para criar um remoto."; exit 6 }

  if ($UseGh) {
    if (Get-Command gh -ErrorAction SilentlyContinue) {
      try {
        Log "Criando repositório via gh: $RepoName"
        gh repo create $RepoName --private --source=. --remote=origin --push --confirm
        Log "Repositório criado via gh e push realizado."
      } catch {
        Err "gh falhou: $($_.Exception.Message)"
        exit 7
      }
    } else {
      Err "gh CLI não encontrado. Instale e autentique com 'gh auth login', ou use a opção -UseToken com um PAT."
      exit 8
    }
  } elseif ($UseToken) {
    # token pode vir por parâmetro ou variavel de ambiente
    if (-not $Token) { $Token = $env:GITHUB_TOKEN }
    if (-not $Token) { Err "Token não fornecido. Passe -Token ou exporte GITHUB_TOKEN."; exit 9 }

    try {
      Log "Criando repositório via API GitHub usando token..."
      # define temporariamente a variável de ambiente esperada pelo script existente
      $origToken = $env:GITHUB_TOKEN
      $env:GITHUB_TOKEN = $Token
      .\scripts\push-to-github-via-token.ps1 -RepoName $RepoName -Private:$true
      # restaurar variável
      if ($null -ne $origToken) { $env:GITHUB_TOKEN = $origToken } else { Remove-Item Env:\GITHUB_TOKEN -ErrorAction SilentlyContinue }
      Log "push via token finalizado."
    } catch {
      Err "Falha ao criar remoto via token: $($_.Exception.Message)"
      exit 10
    }
  } else {
    Err "Opção inválida para criação de remoto. Use -UseGh ou -UseToken"
    exit 11
  }
}

# 5) Auto push final (se solicitado e origin existe)
if ($AutoPush) {
  try {
    $remote = git remote get-url origin 2>$null
    if (-not $remote) { Err "Remote 'origin' não encontrado. Não foi possível fazer push."; exit 12 }
    Log "Fazendo push para origin/main..."
    git branch -M main
    git push -u origin main
    Log "Push concluído."
  } catch {
    Err "Falha ao dar push: $($_.Exception.Message)"
    exit 13
  }
}

Log "Bootstrap finalizado com sucesso. Revise o repositório e workflows no GitHub quando aplicável."
exit 0
