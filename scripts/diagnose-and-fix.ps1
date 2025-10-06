<#
diagnose-and-fix.ps1
Uso: abra PowerShell na raiz do projeto e rode:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\diagnose-and-fix.ps1

O script:
- checa versões do Node/npm/git/gh
- valida package.json
- tenta `npm ci`, salva logs em logs/npm-ci.log
- se falhar, tenta `npm install --legacy-peer-deps` como fallback
- tenta `npm run build`, salva logs em logs/npm-build.log
- no final mostra resumo e as últimas linhas dos logs para você colar aqui
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "== Diagnóstico e tentativa de correção automática - Extraordinaria.ai -> CorporateWebsite ==" -ForegroundColor Cyan

# Caminho do projeto (diretório pai do script)
$projRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $projRoot
Write-Host "Projeto: $projRoot" -ForegroundColor Green

# Informações de ambiente
function TryCmd([string]$cmd, [string]$label) {
    try {
        Write-Host ("-> {0}:" -f $label) -ForegroundColor Yellow -NoNewline
        $out = & $cmd 2>&1
        Write-Host " OK" -ForegroundColor Green
        return $out
    } catch {
        Write-Host " ERRO" -ForegroundColor Red
        return $_.Exception.Message
    }
}

TryCmd 'node --version' 'Node version'
TryCmd 'npm --version' 'NPM version'
TryCmd 'git --version' 'Git version'
TryCmd 'gh --version' 'GH CLI version (if instalado)'

# Validar package.json
Write-Host "\nValidando package.json..." -ForegroundColor Yellow
$pkgValid = $true
try {
    node -e "const fs=require('fs');JSON.parse(fs.readFileSync('package.json','utf8')); console.log('OK')" | Out-Null
    Write-Host "package.json: JSON válido" -ForegroundColor Green
} catch {
    Write-Host "package.json inválido: $($_.Exception.Message)" -ForegroundColor Red
    $pkgValid = $false
}

if (-not $pkgValid) {
    Write-Host "Corrija o package.json e rode novamente este script." -ForegroundColor Red
    exit 1
}

# Criar logs dir
$logsDir = Join-Path $projRoot 'logs'
if (!(Test-Path $logsDir)) { New-Item -ItemType Directory -Path $logsDir | Out-Null }

# NPM CI
Write-Host "\nExecutando: npm ci (logs em logs/npm-ci.log)" -ForegroundColor Yellow
$ciLog = Join-Path $logsDir 'npm-ci.log'
if (Test-Path $ciLog) { Remove-Item $ciLog -Force }

$proc = Start-Process -FilePath 'npm' -ArgumentList 'ci' -NoNewWindow -PassThru -RedirectStandardOutput $ciLog -RedirectStandardError $ciLog -Wait
$ciExit = $proc.ExitCode
Write-Host "npm ci exit code: $ciExit"

if ($ciExit -ne 0) {
    Write-Host "npm ci falhou. Tentando fallback: npm install --legacy-peer-deps (logs em logs/npm-ci-fallback.log)" -ForegroundColor Yellow
    $fallbackLog = Join-Path $logsDir 'npm-ci-fallback.log'
    if (Test-Path $fallbackLog) { Remove-Item $fallbackLog -Force }
    $proc2 = Start-Process -FilePath 'npm' -ArgumentList 'install','--legacy-peer-deps' -NoNewWindow -PassThru -RedirectStandardOutput $fallbackLog -RedirectStandardError $fallbackLog -Wait
    $fbExit = $proc2.ExitCode
    Write-Host "npm install --legacy-peer-deps exit code: $fbExit"
    if ($fbExit -ne 0) {
        Write-Host "Ambas tentativas de instalar falharam. Vou mostrar as últimas 200 linhas dos logs." -ForegroundColor Red
        if (Test-Path $ciLog) { Write-Host "\n=== Últimas linhas de logs/npm-ci.log ==="; Get-Content $ciLog -Tail 200 }
        if (Test-Path $fallbackLog) { Write-Host "\n=== Últimas linhas de logs/npm-ci-fallback.log ==="; Get-Content $fallbackLog -Tail 200 }
        Write-Host "\nCole aqui as linhas acima (ou anexe os arquivos logs/*.log)." -ForegroundColor Cyan
        exit 1
    } else {
        Write-Host "Fallback npm install concluiu com sucesso." -ForegroundColor Green
    }
} else {
    Write-Host "npm ci concluiu com sucesso." -ForegroundColor Green
}

# Build
Write-Host "\nExecutando: npm run build (logs em logs/npm-build.log)" -ForegroundColor Yellow
$buildLog = Join-Path $logsDir 'npm-build.log'
if (Test-Path $buildLog) { Remove-Item $buildLog -Force }
$procB = Start-Process -FilePath 'npm' -ArgumentList 'run','build' -NoNewWindow -PassThru -RedirectStandardOutput $buildLog -RedirectStandardError $buildLog -Wait
$buildExit = $procB.ExitCode
Write-Host "npm run build exit code: $buildExit"

if ($buildExit -ne 0) {
    Write-Host "Build falhou — exibindo últimas 300 linhas de logs de build:" -ForegroundColor Red
    if (Test-Path $buildLog) { Get-Content $buildLog -Tail 300 }
    Write-Host "\nCole as linhas acima aqui para que eu possa corrigir os erros." -ForegroundColor Cyan
    exit 1
} else {
    Write-Host "Build concluído com sucesso." -ForegroundColor Green
}

# Resumo final
Write-Host "\n== Resumo ==" -ForegroundColor Cyan
Write-Host "npm ci exit code: $ciExit"
Write-Host "npm run build exit code: $buildExit"

Write-Host "\nLogs gerados (copie-os se precisar):" -ForegroundColor Yellow
Get-ChildItem $logsDir | ForEach-Object { Write-Host $_.FullName }

Write-Host "\nSe tudo OK, diga 'feito'. Se houver erros acima, cole-os aqui para eu corrigir." -ForegroundColor Green

exit 0
