# Orquestra instalação e subida do ambiente de desenvolvimento (Windows)
# - Garante .env com chaves necessárias
# - Instala dependências Node (CorporateWebsite)
# - Instala dependências Python (python-app), incluindo flasgger para Swagger
# - Valida TypeScript (tsc) e executa testes rápidos (pytest/vitest) se possível
# - Sobe backend e frontend
# - Executa health-check

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$site = Join-Path $workspace 'CorporateWebsite'
$backendDir = Join-Path $site 'python-app'
$healthScript = Join-Path $site 'scripts\health-check.ps1'
$logs = Join-Path $workspace 'logs'
if (!(Test-Path $logs)) { New-Item -ItemType Directory -Force -Path $logs | Out-Null }

Write-Host "[setup-dev] Passo 1/7: Garantindo .env..."
& (Join-Path $workspace 'scripts\ensure-env.ps1')

Write-Host "[setup-dev] Passo 2/7: Instalando dependências Node (frontend)..."
Push-Location $site
try {
  if (Test-Path 'package-lock.json') {
    npm.cmd ci --no-audit --no-fund 2>&1 | Tee-Object -FilePath (Join-Path $logs 'npm-ci.log') -Append | Out-Null
  } else {
    npm.cmd install --no-audit --no-fund 2>&1 | Tee-Object -FilePath (Join-Path $logs 'npm-install.log') -Append | Out-Null
  }
} finally { Pop-Location }

Write-Host "[setup-dev] Passo 3/7: Instalando dependências Python (backend)..."
Push-Location $backendDir
try {
  $py = (Get-Command py -ErrorAction SilentlyContinue).Source
  if (-not $py) { $py = (Get-Command python -ErrorAction SilentlyContinue).Source }
  if (-not $py) { throw "Python não encontrado no PATH." }
  & $py -m pip install --upgrade pip 2>&1 | Tee-Object -FilePath (Join-Path $logs 'pip-install.log') -Append | Out-Null
  & $py -m pip install -r requirements.txt 2>&1 | Tee-Object -FilePath (Join-Path $logs 'pip-install.log') -Append | Out-Null
  # Garantir flasgger para Swagger
  & $py -m pip install flasgger 2>&1 | Tee-Object -FilePath (Join-Path $logs 'pip-install.log') -Append | Out-Null
} finally { Pop-Location }

Write-Host "[setup-dev] Passo 4/7: Typecheck do frontend (tsc)..."
Push-Location $site
try {
  npx.cmd -y tsc -p tsconfig.json --noEmit 2>&1 | Tee-Object -FilePath (Join-Path $logs 'tsc.log') -Append | Out-Null
} finally { Pop-Location }

Write-Host "[setup-dev] Passo 5/7: Testes rápidos (Pytest/Vitest)..."
try {
  Push-Location $site
  py -3 -m pytest -q .\python-app\tests 2>&1 | Tee-Object -FilePath (Join-Path $logs 'pytest.log') -Append | Out-Null
  npx.cmd -y vitest run 2>&1 | Tee-Object -FilePath (Join-Path $logs 'vitest.log') -Append | Out-Null
} catch {
  Write-Warning "[setup-dev] Testes apresentaram falhas: $($_.Exception.Message). Verifique logs. Continuando subida do ambiente."
} finally { Pop-Location }

Write-Host "[setup-dev] Passo 6/7: Subindo backend e frontend..."
& (Join-Path $site 'scripts\start-backend-fast.ps1')
Start-Sleep -Seconds 5
Start-Process powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File',(Join-Path $site 'scripts\start-frontend.ps1') -WindowStyle Minimized

Write-Host "[setup-dev] Passo 7/7: Health-check (5000/3000)..."
& $healthScript

Write-Host "[setup-dev] Ambiente dev preparado. Logs em: $logs"
