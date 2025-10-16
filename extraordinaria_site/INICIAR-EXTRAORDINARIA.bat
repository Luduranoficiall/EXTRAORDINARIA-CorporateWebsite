@echo off
REM EXTRAORDINÁRIA.AI - Launcher Completo e Otimizado
REM Versão 2.0 - Com verificações automáticas e melhorias

chcp 65001 >nul
color 0B
title EXTRAORDINÁRIA.AI - Sistema Iniciando...
cls

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║          🚀 EXTRAORDINÁRIA.AI - SISTEMA COMPLETO                ║
echo ║                      Versão 2.0 Otimizada                       ║
echo ║                                                                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM === VERIFICAÇÕES ===
echo [1/5] � Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERRO: Python não encontrado!
    echo 💡 Baixe em: https://www.python.org/downloads/
    pause
    exit /b 1
)
python --version
echo ✅ Python OK
echo.

echo [2/5] 📁 Verificando arquivos...
if not exist "index.html" (
    echo ❌ ERRO: index.html não encontrado!
    pause
    exit /b 1
)
if not exist "servidor_permanente.py" (
    echo ❌ ERRO: servidor_permanente.py não encontrado!
    pause
    exit /b 1
)
echo ✅ Arquivos principais encontrados
echo.

echo [3/5] 🔌 Verificando porta 8000...
netstat -ano | findstr ":8000" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Porta 8000 em uso! Liberando...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 2 >nul
)
echo ✅ Porta 8000 disponível
echo.

echo [4/5] 📦 Instalando dependências...
pip install -q flask flask-cors >nul 2>&1
echo ✅ Dependências OK
echo.

echo [5/5] 🚀 Iniciando servidor...
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
echo    ✅ EXTRAORDINÁRIA.AI ONLINE E OTIMIZADO!
echo.
echo    🌐 ACESSOS:
echo       • Local:        http://localhost:8000
echo       • Dashboard:    http://localhost:8000/dashboard.html
echo       • Analytics:    Integrado (console do navegador)
echo       • PWA:          Habilitado (instalável)
echo.
echo    🔐 CREDENCIAIS DASHBOARD:
echo       • Email: ceo@extraordinaria.ai
echo       • Senha: EXTRAORDINARIA2024
echo.
echo    ✨ NOVOS RECURSOS v2.0:
echo       ✓ Service Worker (funciona offline)
echo       ✓ Analytics próprio (sem Google)
echo       ✓ Otimização de performance automática
echo       ✓ PWA instalável em mobile
echo       ✓ Monitoramento de status
echo       ✓ Deploy automático GitHub/Vercel
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
echo ⚠️  Pressione Ctrl+C para parar o servidor
echo.

REM Abrir navegador após 3 segundos
start /min cmd /c "timeout /t 3 >nul & start http://localhost:8000"

REM Iniciar servidor
python servidor_permanente.py

REM Se servidor parar
echo.
echo ⚠️  Servidor finalizado
echo.
pause
