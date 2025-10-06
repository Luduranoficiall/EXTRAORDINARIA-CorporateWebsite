Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$nodeDir = Join-Path $root 'languages\node'
Push-Location $nodeDir
try {
  if (-not (Test-Path 'node_modules')) {
    Write-Host 'Installing Node deps for payments...'
    npm.cmd ci
  }
  $env:PORT = '5003'
  node server_payments.js
}
finally {
  Pop-Location
}
