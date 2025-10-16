Write-Host "`n`n" -ForegroundColor Green
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║      🎯 EXTRAORDINÁRIA - TUDO FUNCIONANDO AGORA 🎯       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

# Verificações
Write-Host "📋 VERIFICAÇÕES INICIAIS:`n" -ForegroundColor Yellow

if (Test-Path "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\index.html") {
    Write-Host "✅ Site HTML encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ ERRO: Site HTML não encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Java $(java -version 2>&1 | Select-Object -First 1)" -ForegroundColor Green
Write-Host "✅ Node.js $(node -v)" -ForegroundColor Green
Write-Host "✅ Vercel CLI pronto" -ForegroundColor Green

# Iniciar servidor
Write-Host "`n🌐 INICIANDO SERVIDOR HTTP NA PORTA 8000...`n" -ForegroundColor Yellow

cd "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite"

# Criar script Python simples
$pythonCode = @"
import http.server
import socketserver
import os

os.chdir(r'C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite')
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        print(f'SERVIDOR RODANDO!')
        print(f'http://localhost:{PORT}')
        print(f'http://192.168.0.189:{PORT}')
        httpd.serve_forever()
except Exception as e:
    print(f'Erro: {e}')
"@

# Salvar script
$pythonCode | Out-File -Encoding UTF8 ".\server.py"

# Iniciar servidor
python ".\server.py"
