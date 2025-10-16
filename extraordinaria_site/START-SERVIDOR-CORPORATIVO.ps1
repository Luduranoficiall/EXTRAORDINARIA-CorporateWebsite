# ╔════════════════════════════════════════════════════════════════╗
# ║                                                                  ║
# ║     🚀 EXTRAORDINÁRIA.AI - SERVIDOR CORPORATIVO                 ║
# ║                                                                  ║
# ╚════════════════════════════════════════════════════════════════╝

Clear-Host

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                              ║" -ForegroundColor Cyan
Write-Host "║     🚀 EXTRAORDINÁRIA.AI - SERVIDOR CORPORATIVO              ║" -ForegroundColor Cyan
Write-Host "║                                                              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Diretório
$SITE_DIR = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site"

Write-Host "📁 Navegando para diretório...`n" -ForegroundColor Yellow

if (-not (Test-Path $SITE_DIR)) {
    Write-Host "❌ Erro: Diretório não encontrado!`n" -ForegroundColor Red
    exit 1
}

Set-Location $SITE_DIR
Write-Host "✅ Diretório carregado!`n" -ForegroundColor Green

# Menu
Write-Host "Escolha uma opção:`n" -ForegroundColor Cyan
Write-Host "1) Iniciar servidor HTTP (localhost:8000)" -ForegroundColor White
Write-Host "2) Iniciar com URL pública (localtunnel)" -ForegroundColor White
Write-Host "3) Parar todos os servidores" -ForegroundColor White
Write-Host "4) Verificar status completo`n" -ForegroundColor White

$choice = Read-Host "Digite a opção"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 Iniciando servidor HTTP na porta 8000...`n" -ForegroundColor Cyan
        Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "✅ Servidor disponível em: http://localhost:8000" -ForegroundColor Green
        Write-Host "✅ Rede interna: http://192.168.0.189:8000" -ForegroundColor Green
        Write-Host "═════════════════════════════════════════════════════════════════`n" -ForegroundColor Green
        http-server -p 8000 --cors
    }
    "2" {
        Write-Host "`n🌐 Iniciando com URL pública (localtunnel)...`n" -ForegroundColor Cyan
        
        # Verificar se localtunnel está instalado
        $lt_check = npm list -g localtunnel 2>&1 | Select-String "empty"
        if ($null -ne $lt_check) {
            Write-Host "📦 Instalando localtunnel...`n" -ForegroundColor Yellow
            npm install -g localtunnel --silent
        }
        
        # Iniciar servidor em background
        Write-Host "✅ Iniciando servidor HTTP...`n" -ForegroundColor Green
        Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd `"$SITE_DIR`" && http-server -p 8000 --cors" -NoNewWindow
        
        Start-Sleep -Seconds 2
        
        Write-Host "🌐 Gerando URL pública...`n" -ForegroundColor Cyan
        lt --port 8000 --subdomain extraordinaria
    }
    "3" {
        Write-Host "`n🛑 Parando servidores...`n" -ForegroundColor Yellow
        Get-Process http-server -ErrorAction SilentlyContinue | Stop-Process -Force
        Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*localtunnel*" } | Stop-Process -Force
        Write-Host "✅ Servidores parados!`n" -ForegroundColor Green
    }
    "4" {
        Write-Host "`n📊 Status Completo do Sistema`n" -ForegroundColor Cyan
        Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Green
        
        # Servidor HTTP
        $http_check = netstat -ano 2>&1 | Select-String ":8000"
        if ($http_check) {
            Write-Host "✅ Servidor HTTP: ATIVO (porta 8000)" -ForegroundColor Green
        } else {
            Write-Host "❌ Servidor HTTP: INATIVO" -ForegroundColor Red
        }
        
        # Arquivo index.html
        if (Test-Path "$SITE_DIR\index.html") {
            $size = (Get-Item "$SITE_DIR\index.html").Length
            Write-Host "✅ Site principal: index.html ($size bytes)" -ForegroundColor Green
        } else {
            Write-Host "❌ Site principal: ARQUIVO NÃO ENCONTRADO" -ForegroundColor Red
        }
        
        # Acessos
        Write-Host "`n🌐 Acessos disponíveis:" -ForegroundColor Cyan
        Write-Host "   • Local: http://localhost:8000" -ForegroundColor White
        Write-Host "   • Rede: http://192.168.0.189:8000" -ForegroundColor White
        Write-Host "   • Público: https://extraordinaria.loca.lt" -ForegroundColor White
        
        Write-Host "`n═════════════════════════════════════════════════════════════════`n" -ForegroundColor Green
    }
    default {
        Write-Host "`n❌ Opção inválida!`n" -ForegroundColor Red
    }
}
