$ErrorActionPreference = 'Stop'

Write-Host "[dotnet-bootstrap] Iniciando bootstrap do .NET SDK (sem admin)..."

# Instalação local dentro do workspace para evitar restrições do perfil/OneDrive
$WorkspaceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$DotnetDir = Join-Path $WorkspaceRoot ".dotnet"
$DotnetExe = Join-Path $DotnetDir "dotnet.exe"

if (!(Test-Path $DotnetDir)) {
  New-Item -ItemType Directory -Force -Path $DotnetDir | Out-Null
}

# Garantir TLS 1.2 para downloads
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}

$InstallScriptLocal = Join-Path $WorkspaceRoot "dotnet-install.ps1"
if (!(Test-Path $InstallScriptLocal)) {
  Write-Host "[dotnet-bootstrap] Baixando dotnet-install.ps1..."
  Invoke-WebRequest -UseBasicParsing -Uri "https://dot.net/v1/dotnet-install.ps1" -OutFile $InstallScriptLocal
}

if (!(Test-Path $DotnetExe)) {
  Write-Host "[dotnet-bootstrap] Instalando .NET SDK canal 8.0 em $DotnetDir ..."
  powershell -NoProfile -ExecutionPolicy Bypass -File $InstallScriptLocal -Channel 8.0 -InstallDir $DotnetDir
}

if (!(Test-Path $DotnetExe)) {
  throw "[dotnet-bootstrap] Falha ao instalar dotnet. Verifique conectividade de rede e tente novamente."
}

$env:PATH = "$DotnetDir;$DotnetDir\tools;" + $env:PATH

& $DotnetExe --info | Out-Host

# Caminho da solução
$SolutionPath = Join-Path $WorkspaceRoot "Extraordinaria.ai.sln"
if (!(Test-Path $SolutionPath)) {
  throw "[dotnet-bootstrap] Não encontrei Extraordinaria.ai.sln em $WorkspaceRoot"
}

Write-Host "[dotnet-bootstrap] Restaurando pacotes..."
& $DotnetExe restore $SolutionPath | Out-Host

Write-Host "[dotnet-bootstrap] Compilando solução..."
& $DotnetExe build $SolutionPath -c Release | Out-Host

Write-Host "[dotnet-bootstrap] Executando testes..."
& $DotnetExe test $SolutionPath -c Release --no-build | Out-Host

Write-Host "[dotnet-bootstrap] OK."
