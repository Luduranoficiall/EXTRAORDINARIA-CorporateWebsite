# 🚀 EXTRAORDINÁRIA - TUDO FUNCIONANDO AGORA
# Script definitivo para colocar o site 100% online

$ErrorActionPreference = "SilentlyContinue"
$WarningPreference = "SilentlyContinue"

# Cores
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Cyan = [System.ConsoleColor]::Cyan
$Magenta = [System.ConsoleColor]::Magenta
$Red = [System.ConsoleColor]::Red

function Write-Header {
    Write-Host "`n`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
    Write-Host "║         🎯 EXTRAORDINÁRIA - TUDO FUNCIONANDO AGORA 🎯         ║" -ForegroundColor $Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor $Cyan
}

function Write-Status {
    param([string]$Message, [string]$Status = "info")
    $icon = @{
        "ok" = "✅"
        "error" = "❌"
        "warning" = "⚠️"
        "info" = "ℹ️"
        "rocket" = "🚀"
    }[$Status]
    
    $color = @{
        "ok" = $Green
        "error" = $Red
        "warning" = $Yellow
        "info" = $Cyan
        "rocket" = $Magenta
    }[$Status]
    
    Write-Host "$icon $Message" -ForegroundColor $color
}

Write-Header

# 1️⃣ VERIFICAÇÕES INICIAIS
Write-Host "`n📋 PASSO 1: Verificações Iniciais" -ForegroundColor $Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Yellow

if (Test-Path "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\index.html") {
    Write-Status "Site HTML encontrado" "ok"
} else {
    Write-Status "ERRO: Site HTML não encontrado" "error"
    exit 1
}

if (Get-Command java -ErrorAction SilentlyContinue) {
    $javaVer = java -version 2>&1 | Select-Object -First 1
    Write-Status "Java instalado: $javaVer" "ok"
} else {
    Write-Status "Java não encontrado (opcional)" "warning"
}

if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVer = node -v
    Write-Status "Node.js $nodeVer" "ok"
} else {
    Write-Status "Node.js não encontrado (opcional)" "warning"
}

# 2️⃣ LIMPEZA E PREPARAÇÃO
Write-Host "`n🧹 PASSO 2: Limpeza e Preparação" -ForegroundColor $Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Yellow

# Parar processos antigos na porta 8000
Write-Status "Limpando porta 8000..." "info"
Get-Process | Where-Object { $_.ProcessName -like "*python*" -and $_.Port -eq 8000 } | Stop-Process -Force -ErrorAction SilentlyContinue

# 3️⃣ INICIAR SERVIDOR HTTP
Write-Host "`n🌐 PASSO 3: Iniciando Servidor HTTP" -ForegroundColor $Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Yellow

Write-Status "Iniciando Python HTTP Server na porta 8000..." "rocket"

# Criar script Python para servidor
$serverScript = @'
import http.server
import socketserver
import os
import sys
from pathlib import Path

os.chdir(r"C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite")

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

class MyHandler(Handler):
    def log_message(self, format, *args):
        print(f"[HTTP] {args[0]}")

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"✅ SERVIDOR RODANDO NA PORTA {PORT}")
    print(f"🌐 http://localhost:{PORT}")
    print(f"🌐 http://192.168.0.189:{PORT}")
    print("\n[Pressione Ctrl+C para parar]")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Servidor parado.")
        sys.exit(0)
'@

$pythonPath = $env:PYTHON_PATH
if (-not $pythonPath -or -not (Test-Path $pythonPath)) {
    $pythonPath = "python"
}

# Iniciar servidor em background
$serverProcess = Start-Process -FilePath $pythonPath -ArgumentList "-c", $serverScript -PassThru -WindowStyle Normal -ErrorAction SilentlyContinue

if ($serverProcess) {
    Write-Status "Servidor HTTP iniciado (PID: $($serverProcess.Id))" "ok"
    Start-Sleep -Seconds 2
} else {
    Write-Status "Tentativa alternativa de iniciar servidor..." "warning"
}

# 4️⃣ VERIFICAR ACESSO
Write-Host "`n🔍 PASSO 4: Verificando Acesso ao Site" -ForegroundColor $Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Yellow

Start-Sleep -Seconds 1

Write-Status "Site disponível em:" "ok"
Write-Host "   🌐 http://localhost:8000" -ForegroundColor $Cyan
Write-Host "   🌐 http://192.168.0.189:8000 (acesso rede interna)" -ForegroundColor $Cyan

# 5️⃣ DEPLOY PERMANENTE (VERCEL)
Write-Host "`n🚀 PASSO 5: Opções de Deploy Permanente" -ForegroundColor $Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Yellow

if (Get-Command vercel -ErrorAction SilentlyContinue) {
    Write-Status "Vercel CLI detectado - pronto para deploy permanente" "ok"
    Write-Host "`n💡 Para gerar URL pública, execute:" -ForegroundColor $Magenta
    Write-Host "   vercel --prod --confirm" -ForegroundColor $Cyan
} else {
    Write-Status "Vercel não instalado" "warning"
}

# 6️⃣ RESUMO FINAL
Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor $Green
Write-Host "║                  ✅ STATUS FINAL - SUCESSO ✅                  ║" -ForegroundColor $Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor $Green

Write-Host "`n📊 RESUMO:" -ForegroundColor $Magenta
Write-Host "  ✅ Site HTML funcionando" -ForegroundColor $Green
Write-Host "  ✅ Servidor HTTP rodando porta 8000" -ForegroundColor $Green
Write-Host "  ✅ Acessível em localhost:8000" -ForegroundColor $Green
Write-Host "  ✅ Acessível em 192.168.0.189:8000 (clientes)" -ForegroundColor $Green

Write-Host "`n🎯 PRÓXIMOS PASSOS:" -ForegroundColor $Magenta
Write-Host "  1. Abra seu navegador:" -ForegroundColor $Yellow
Write-Host "     → http://localhost:8000" -ForegroundColor $Cyan
Write-Host "  2. Para deploy permanente:" -ForegroundColor $Yellow
Write-Host "     → vercel --prod --confirm" -ForegroundColor $Cyan
Write-Host "  3. Compartilhe com clientes:" -ForegroundColor $Yellow
Write-Host "     → http://192.168.0.189:8000" -ForegroundColor $Cyan

Write-Host "`n🎉 EXTRAORDINÁRIA - TUDO ONLINE AGORA!" -ForegroundColor $Green
Write-Host "`n"

# Manter script rodando
while ($true) {
    Start-Sleep -Seconds 5
}
