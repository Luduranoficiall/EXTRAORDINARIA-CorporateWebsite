Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot

Start-Process powershell -ArgumentList "-NoProfile","-ExecutionPolicy","Bypass","-File","`"$PSScriptRoot\start-orchestrator.ps1`"","-Install"
Start-Process powershell -ArgumentList "-NoProfile","-ExecutionPolicy","Bypass","-File","`"$PSScriptRoot\start-frontend.ps1`""

Write-Host "Services starting:"
Write-Host "- Orchestrator: http://localhost:5050/health"
Write-Host "- Checkout (Stripe via Orchestrator): http://localhost:5050/api/checkout"
Write-Host "- Frontend: http://localhost:3000"
