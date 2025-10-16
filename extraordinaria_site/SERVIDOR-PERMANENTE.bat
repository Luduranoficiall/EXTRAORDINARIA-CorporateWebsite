@echo off
REM ╔════════════════════════════════════════════════════════════╗
REM ║                                                            ║
REM ║  🚀 EXTRAORDINÁRIA.AI - SERVIDOR PERMANENTE               ║
REM ║                                                            ║
REM ║  Este arquivo inicia o servidor e mantém ele rodando      ║
REM ║  sempre. Se parar, reinicia automaticamente.              ║
REM ║                                                            ║
REM ╚════════════════════════════════════════════════════════════╝

setlocal enabledelayedexpansion

title 🚀 EXTRAORDINÁRIA.AI - Servidor HTTP Permanente

cd /d "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site"

:restart
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║      🚀 EXTRAORDINÁRIA.AI - SERVIDOR PERMANENTE            ║
echo ║                                                            ║
echo ║      Status: RODANDO NA PORTA 8000                         ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📂 Diretório: %CD%
echo.
echo 🌐 ACESSOS:
echo    • Local: http://localhost:8000
echo    • Rede: http://192.168.0.189:8000
echo.
echo � Dica: Use http://192.168.0.189:8000 para compartilhar
echo    com clientes na mesma rede!
echo.
echo ⏳ Servidor rodando... Pressione Ctrl+C para parar
echo.

http-server -p 8000 --cors

if errorlevel 1 (
    echo.
    echo ⚠️  Servidor parou. Reiniciando em 5 segundos...
    timeout /t 5
    goto restart
)
