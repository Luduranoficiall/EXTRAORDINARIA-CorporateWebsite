# Script para iniciar backend e frontend (Windows PowerShell)
# Execute a partir da pasta extraordinaria_site

$backendPath = "c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\backend"
$frontendPath = "c:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\react_frontend"

Write-Host "Iniciando backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; .\venv\Scripts\activate; python server.py"

Start-Sleep -Seconds 2
Write-Host "Iniciando frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm install; npm start"
