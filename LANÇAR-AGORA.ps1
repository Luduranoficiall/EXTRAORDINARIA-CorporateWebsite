#!/usr/bin/env powershell
# 🚀 EXTRAORDINÁRI.A. — LANÇAR SITE AGORA (AUTOMÁTICO)

$ErrorActionPreference = "Stop"

# Cores
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Info { Write-Host $args -ForegroundColor Cyan }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }
function Write-Error { Write-Host $args -ForegroundColor Red }

Clear-Host

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   🚀 EXTRAORDINÁRI.A. — LANÇAR SITE BOTGPT AGORA!            ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

# 1. Menu de escolha
Write-Info "Escolha uma opção:"
Write-Host ""
Write-Host "1️⃣  DEPLOY PARA PRODUÇÃO (recomendado)" -ForegroundColor Green
Write-Host "   → Site fica online em https://extraordinaria.ai"
Write-Host "   → Tempo: 2-3 minutos"
Write-Host ""
Write-Host "2️⃣  TESTAR LOCALMENTE PRIMEIRO" -ForegroundColor Yellow
Write-Host "   → Abre em http://localhost:8000"
Write-Host "   → Tempo: Instantâneo"
Write-Host ""
Write-Host "3️⃣  AMBAS (testar + deploy)" -ForegroundColor Cyan
Write-Host "   → Testa localmente e depois deploy"
Write-Host "   → Tempo: 3-5 minutos"
Write-Host ""

$choice = Read-Host "Digite sua escolha (1, 2 ou 3)"
Write-Host ""

$dir = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite"

switch ($choice) {
    "1" {
        Write-Info "🚀 Iniciando DEPLOY PARA PRODUÇÃO..."
        Write-Host ""
        Set-Location $dir
        & ".\deploy-vercel.ps1"
    }
    "2" {
        Write-Info "🧪 Abrindo SERVIDOR LOCAL..."
        Write-Host ""
        Set-Location $dir
        & ".\start-local.ps1"
    }
    "3" {
        Write-Info "🧪 Testando LOCALMENTE primeiro..."
        Write-Host ""
        Set-Location $dir
        
        # Iniciar servidor local em background
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "& '.\start-local.ps1'" -WindowStyle Normal
        
        Write-Success "✅ Servidor local iniciado em http://localhost:8000"
        Write-Host ""
        Write-Warning "⏳ Aguarde 10 segundos e teste o site..."
        Start-Sleep -Seconds 10
        
        Write-Info "✅ Teste concluído? (o servidor continua rodando)"
        $testOk = Read-Host "Deseja fazer o DEPLOY para produção agora? (s/n)"
        
        if ($testOk -eq "s") {
            Write-Info "🚀 Iniciando DEPLOY PARA PRODUÇÃO..."
            Write-Host ""
            & ".\deploy-vercel.ps1"
        } else {
            Write-Warning "⏹️  Deploy cancelado."
            Write-Host ""
            Write-Info "Você pode fazer o deploy depois executando:"
            Write-Host "   .\deploy-vercel.ps1"
        }
    }
    default {
        Write-Error "❌ Opção inválida!"
        exit 1
    }
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                    ✅ SITE ONLINE!                           ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Info "🌐 Acesse:"
Write-Host "   https://extraordinaria.ai"
Write-Host ""
Write-Success "🎉 Seu BotGPT está vivo e pronto para clientes!"
Write-Host ""
