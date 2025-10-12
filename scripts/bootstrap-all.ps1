Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$logs = Join-Path $workspace 'logs'
if (!(Test-Path $logs)) { New-Item -ItemType Directory -Force -Path $logs | Out-Null }

Write-Host '[bootstrap-all] Instalação/validação automática iniciada...'

# 0) Garantir .env com defaults
& (Join-Path $workspace 'scripts\ensure-env.ps1')

# 1) Node.js deps (frontend)
Push-Location (Join-Path $workspace 'CorporateWebsite')
try {
  if (!(Test-Path 'node_modules')) {
    Write-Host '[bootstrap-all] Instalando dependências Node (frontend)...'
    try { npm.cmd ci --no-audit --no-fund } catch { npm.cmd install --no-audit --no-fund }
  }
} finally { Pop-Location }

# 2) Python deps (backend unificado)
$req = Join-Path $workspace 'CorporateWebsite\python-app\requirements.txt'
if (Test-Path $req) {
  Write-Host '[bootstrap-all] Instalando dependências Python (backend)...'
  py -3 -m pip install --user --upgrade pip | Out-Null
  py -3 -m pip install --user -r $req | Out-Null
}

# 3) .NET SDK local + restore/build/test
Write-Host '[bootstrap-all] Preparando .NET SDK local e executando build/test...'
& (Join-Path $workspace 'scripts\dotnet-bootstrap.ps1') *>&1 | Tee-Object -FilePath (Join-Path $logs 'dotnet-bootstrap-run.log')

Write-Host '[bootstrap-all] OK. Veja logs em' $logs
