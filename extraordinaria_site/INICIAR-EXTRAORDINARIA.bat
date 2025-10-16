@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║          🚀 EXTRAORDINÁRIA.AI - SISTEMA PYTHON                  ║
echo ║                                                                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo 📋 Iniciando sistema completo...
echo.

cd /d "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site"

echo ✅ Verificando Python...
python --version
echo.

echo ✅ Instalando dependências (se necessário)...
pip install -q flask flask-cors
echo.

echo 🚀 Iniciando servidor Flask...
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
echo    ✅ EXTRAORDINÁRIA.AI INICIADO COM SUCESSO!
echo.
echo    📱 Acesse:
echo       Local:         http://localhost:8000
echo       Rede:          http://192.168.0.189:8000
echo.
echo    🔐 CEO Dashboard:  http://localhost:8000/dashboard
echo       Email: ceo@extraordinaria.ai
echo       Senha: EXTRAORDINARIA2024
echo.
echo ════════════════════════════════════════════════════════════════════
echo.

python app.py

pause
