#!/usr/bin/env powershell
# 🚀 EXTRAORDINÁRI.A. — SITE ONLINE AGORA (MODO FÁCIL)

Clear-Host
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  🚀 EXTRAORDINÁRI.A. BOTGPT — SITE 100% ONLINE AGORA        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

$dir = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite"
Set-Location $dir

# Step 1: Servidor Python
Write-Host "🚀 PASSO 1: Iniciando servidor local..." -ForegroundColor Cyan
Start-Process python -ArgumentList "-m http.server 8000" -WindowStyle Hidden
Start-Sleep -Seconds 3
Write-Host "   ✅ Servidor OK (porta 8000)" -ForegroundColor Green

# Step 2: Criar tunnel com localtunnel
Write-Host ""
Write-Host "🌐 PASSO 2: Criando URL pública..." -ForegroundColor Cyan
Write-Host "   ⏳ Aguarde..." -ForegroundColor Yellow

# Executar lt em primeiro plano para ver a URL
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║            INICIANDO LOCALTUNNEL - AGUARDE...               ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

lt --port 8000
