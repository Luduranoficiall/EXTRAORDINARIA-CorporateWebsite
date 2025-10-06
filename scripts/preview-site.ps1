Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Push-Location (Split-Path -Parent $PSScriptRoot)
try {
  if (-not (Test-Path 'node_modules')) { npm.cmd ci }
  npx.cmd vite build
  npx.cmd vite preview --host --port 8080 --strictPort
}
finally {
  Pop-Location
}
