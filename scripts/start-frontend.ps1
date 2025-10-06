Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Push-Location $root
try {
  if (-not (Test-Path 'node_modules')) {
    Write-Host 'Installing Node deps for frontend...'
    try {
      npm.cmd ci --no-audit --no-fund
    } catch {
      Write-Warning "npm ci falhou, tentando 'npm install'..."
      npm.cmd install --no-audit --no-fund
    }
  }
  npx.cmd vite
}
finally {
  Pop-Location
}
