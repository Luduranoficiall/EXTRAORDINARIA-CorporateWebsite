$ErrorActionPreference = 'Stop'

Write-Host "[run-all-tests] Iniciando execução completa de testes (.NET + Python + Frontend)…"
$WorkspaceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$LogsDir = Join-Path $WorkspaceRoot 'logs'
if (!(Test-Path $LogsDir)) { New-Item -ItemType Directory -Force -Path $LogsDir | Out-Null }

# =================== .NET (restore/build/test) ===================
Write-Host "[run-all-tests] Preparando .NET SDK local…"
$DotnetDir = Join-Path $WorkspaceRoot '.dotnet'
$DotnetExe = Join-Path $DotnetDir 'dotnet.exe'
if (!(Test-Path $DotnetDir)) { New-Item -ItemType Directory -Force -Path $DotnetDir | Out-Null }
$InstallScript = Join-Path $WorkspaceRoot 'dotnet-install.ps1'
if (!(Test-Path $InstallScript)) {
  try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
  Invoke-WebRequest -UseBasicParsing -Uri 'https://dot.net/v1/dotnet-install.ps1' -OutFile $InstallScript
}
if (!(Test-Path $DotnetExe)) {
  Write-Host "[run-all-tests] Instalando .NET SDK 8 (local no workspace)…"
  powershell -NoProfile -ExecutionPolicy Bypass -File $InstallScript -Channel 8.0 -InstallDir $DotnetDir | Tee-Object -FilePath (Join-Path $LogsDir 'dotnet-install.log') | Out-Null
}
if (!(Test-Path $DotnetExe)) { throw "Falha ao instalar dotnet SDK" }
$env:PATH = "$DotnetDir;$DotnetDir\tools;" + $env:PATH

$Sln = Join-Path $WorkspaceRoot 'Extraordinaria.ai.sln'
if (Test-Path $Sln) {
  Write-Host "[run-all-tests] dotnet restore/build/test na solução…"
  & $DotnetExe --info | Tee-Object -FilePath (Join-Path $LogsDir 'dotnet-info.log') | Out-Null
  & $DotnetExe restore $Sln | Tee-Object -FilePath (Join-Path $LogsDir 'dotnet-restore.log') | Out-Null
  $dotnetRestore=$LASTEXITCODE
  & $DotnetExe build $Sln -c Release | Tee-Object -FilePath (Join-Path $LogsDir 'dotnet-build.log') | Out-Null
  $dotnetBuild=$LASTEXITCODE
  & $DotnetExe test $Sln -c Release --no-build | Tee-Object -FilePath (Join-Path $LogsDir 'dotnet-test.log') | Out-Null
  $dotnetTest=$LASTEXITCODE
} else {
  Write-Warning "[run-all-tests] Solução .NET não encontrada; pulando etapa .NET"
  $dotnetRestore=0; $dotnetBuild=0; $dotnetTest=0
}

# =================== Python backend (pytest) ===================
Write-Host "[run-all-tests] Instalando dependências Python e executando pytest…"
$Requirements = Join-Path $WorkspaceRoot 'CorporateWebsite\python-app\requirements.txt'
if (Test-Path $Requirements) {
  py -3 -m pip install --user -r $Requirements | Tee-Object -FilePath (Join-Path $LogsDir 'pip-install.log') | Out-Null
}
py -3 -m pytest -q (Join-Path $WorkspaceRoot 'CorporateWebsite\python-app\tests\test_api.py') 2>&1 | Tee-Object -FilePath (Join-Path $LogsDir 'pytest.log') | Out-Null
$pytestCode=$LASTEXITCODE

# =================== Frontend (Vitest) ===================
Write-Host "[run-all-tests] Executando testes do frontend (Vitest)…"
$FrontendDir = Join-Path $WorkspaceRoot 'CorporateWebsite'
Push-Location $FrontendDir
if (!(Test-Path 'node_modules')) { npm.cmd install | Tee-Object -FilePath (Join-Path $LogsDir 'npm-install.log') | Out-Null }
npx.cmd -y vitest run 2>&1 | Tee-Object -FilePath (Join-Path $LogsDir 'vitest.log') | Out-Null
$vitestCode=$LASTEXITCODE
Pop-Location

# =================== Resumo ===================
$status = @{
  dotnet_restore = $dotnetRestore
  dotnet_build   = $dotnetBuild
  dotnet_test    = $dotnetTest
  pytest         = $pytestCode
  vitest         = $vitestCode
}
Write-Host "[run-all-tests] Status: " ($status | ConvertTo-Json -Compress)

if (($dotnetRestore -ne 0) -or ($dotnetBuild -ne 0) -or ($dotnetTest -ne 0) -or ($pytestCode -ne 0) -or ($vitestCode -ne 0)) {
  Write-Error "Uma ou mais etapas falharam. Verifique os logs em: $LogsDir"
  exit 1
}

Write-Host "[run-all-tests] Todos os testes concluídos com sucesso. Logs em: $LogsDir"
exit 0
