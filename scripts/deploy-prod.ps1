Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$site = Join-Path $workspace 'CorporateWebsite'

Write-Host '[deploy-prod] Garantindo .env com defaults...'
& (Join-Path $workspace 'scripts\ensure-env.ps1')

Write-Host '[deploy-prod] Construindo imagens (frontend + backend)...'
Push-Location $site
try {
  docker compose -f docker-compose.prod.yml build
  docker compose -f docker-compose.prod.yml up -d
} finally { Pop-Location }

Write-Host '[deploy-prod] OK. Acesse:'
Write-Host ' - Frontend: http://localhost:8080'
Write-Host ' - Backend/Swagger: http://localhost:5000/apidocs/'
