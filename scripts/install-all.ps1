<#
Instala dependências e executa builds para os subprojetos do repositório.
Uso:
  PowerShell -ExecutionPolicy Bypass -File .\scripts\install-all.ps1

O script detecta automaticamente arquivos package.json, requirements.txt,
pom.xml e projetos .csproj e tenta instalar/compilar cada um.
#>

$ErrorActionPreference = 'Stop'
function Log($msg) { $ts = (Get-Date).ToString('s'); "$ts - $msg" | Tee-Object -FilePath scripts\install-all.log -Append }

if (Test-Path scripts\install-all.log) { Remove-Item scripts\install-all.log -ErrorAction SilentlyContinue }
New-Item -ItemType File -Path scripts\install-all.log -Force | Out-Null

Log "Iniciando instalação de dependências para o repositório $(Get-Location)"

# Helpers
function HasCmd($cmd) { try { & $cmd --version > $null 2>&1; return $true } catch { return $false } }

# 1) Node / npm projects
if (HasCmd 'npm') {
  Log "npm detectado"
  $pkgFiles = Get-ChildItem -Path . -Recurse -Filter package.json -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
  foreach ($pkg in $pkgFiles) {
    $dir = Split-Path $pkg -Parent
    Push-Location $dir
    Log "Executando npm install em: $dir"
    try {
      if (Test-Path package-lock.json) { npm ci --prefer-offline --no-audit 2>&1 | Tee-Object -FilePath "$(Resolve-Path .)\npm-install.log" -Append; Log "npm ci OK em ${dir}" } else { npm install --no-audit 2>&1 | Tee-Object -FilePath "$(Resolve-Path .)\npm-install.log" -Append; Log "npm install OK em ${dir}" }
    } catch {
      Log "ERRO npm em ${dir}: $($_.Exception.Message)"
    }
    Pop-Location
  }
} else { Log "npm NÃO detectado; pulando instalações npm" }

# 2) Python requirements
if (HasCmd 'python') {
  Log "python detectado"
  $reqFiles = Get-ChildItem -Path . -Recurse -Filter requirements*.txt -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
  foreach ($req in $reqFiles) {
    $dir = Split-Path $req -Parent
    Push-Location $dir
    Log "Instalando requirements em: $dir"
    try {
      python -m pip install -r (Split-Path $req -Leaf) 2>&1 | Tee-Object -FilePath "$(Resolve-Path .)\pip-install.log" -Append
      Log "pip install OK em ${dir}"
    } catch {
      Log "ERRO pip em ${dir}: $($_.Exception.Message)"
    }
    Pop-Location
  }
} else { Log "python NÃO detectado; pulando instalações pip" }

# 3) Maven projects
if (HasCmd 'mvn') {
  Log "mvn detectado"
  $poms = Get-ChildItem -Path . -Recurse -Filter pom.xml -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
  foreach ($p in $poms) {
    $dir = Split-Path $p -Parent
    Push-Location $dir
    Log "Executando mvn package em: $dir"
    try {
      mvn -DskipTests clean package 2>&1 | Tee-Object -FilePath "$(Resolve-Path .)\mvn-build.log" -Append
      Log "mvn OK em ${dir}"
    } catch {
      Log "ERRO mvn em ${dir}: $($_.Exception.Message)"
    }
    Pop-Location
  }
} else { Log "mvn NÃO detectado; pulando builds Maven" }

# 4) .NET projects
if (HasCmd 'dotnet') {
  Log "dotnet detectado"
  $csprojs = Get-ChildItem -Path . -Recurse -Filter *.csproj -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
  foreach ($c in $csprojs) {
    $dir = Split-Path $c -Parent
    Push-Location $dir
    Log "Executando dotnet restore/build em: $dir"
    try {
      dotnet restore 2>&1 | Tee-Object -FilePath "$(Resolve-Path .)\dotnet-restore.log" -Append
      dotnet build --no-restore 2>&1 | Tee-Object -FilePath "$(Resolve-Path .)\dotnet-build.log" -Append
      Log "dotnet OK em ${dir}"
    } catch {
      Log "ERRO dotnet em ${dir}: $($_.Exception.Message)"
    }
    Pop-Location
  }
} else { Log "dotnet NÃO detectado; pulando builds .NET" }

Log "Fim do script install-all.ps1. Verifique scripts\install-all.log para detalhes." 
