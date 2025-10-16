@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ════════════════════════════════════════════════════════════════
echo                    🚀 EXTRAORDINÁRIA.AI
echo                   SERVIDOR CORPORATIVO 2025
echo ════════════════════════════════════════════════════════════════
echo.
echo Iniciando servidor HTTP em porta 8000...
echo.

cd /d "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site"

REM Iniciar servidor HTTP
http-server -p 8000 --cors

echo.
pause
