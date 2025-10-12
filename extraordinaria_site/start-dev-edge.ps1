# start-dev-edge.ps1
# Inicia backend e frontend em janelas separadas e abre Microsoft Edge com DevTools.
# Execute este script a partir da pasta extraordinaria_site:
#   cd C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site
#   .\start-dev-edge.ps1

$backendPath = Join-Path $PSScriptRoot 'backend'
$frontendPath = Join-Path $PSScriptRoot 'react_frontend'

Write-Host "[1/3] Iniciando backend em uma nova janela..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; if (!(Test-Path venv)) { python -m venv venv }; .\venv\Scripts\activate; pip install -r requirements.txt; python server.py"

Start-Sleep -Seconds 3

Write-Host "[2/3] Iniciando frontend em uma nova janela..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm install; npm start"

Start-Sleep -Seconds 6

# URL do frontend
$frontendUrl = 'http://localhost:3000'

# Localizações possíveis do executável do Edge
$edges = @(
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
)
$edgeExe = $null
foreach ($p in $edges) { if (Test-Path $p) { $edgeExe = $p; break } }

if (-not $edgeExe) {
    Write-Host "Não localizei o executável do Edge automaticamente. Tentando abrir usando o comando 'msedge'. Se não funcionar, abra o Edge manualmente e navegue para $frontendUrl" -ForegroundColor Yellow
    # Tenta abrir via alias
    Start-Process msedge -ArgumentList "--auto-open-devtools-for-tabs`, $frontendUrl" -ErrorAction SilentlyContinue
} else {
    Write-Host "[3/3] Abrindo Edge com DevTools na URL: $frontendUrl"
    Start-Process -FilePath $edgeExe -ArgumentList "--auto-open-devtools-for-tabs`, $frontendUrl"
}

Write-Host "Script iniciado. Verifique as janelas do backend e frontend. Se o Edge não abrir, abra manualmente e pressione F12 para DevTools." -ForegroundColor Green
