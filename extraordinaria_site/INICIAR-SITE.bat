@echo off
chcp 65001 >nul
color 0A
title EXTRAORDINÁRIA.AI - Servidor Permanente

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║         🚀 EXTRAORDINÁRIA.AI - INICIANDO SERVIDOR...          ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Verificar se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python não encontrado! Instalando...
    echo.
    echo Por favor, instale Python em: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python detectado!
echo.
echo 🔄 Iniciando servidor permanente...
echo.

REM Iniciar servidor Python
python servidor_permanente.py

pause
