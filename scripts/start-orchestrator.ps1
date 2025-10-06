Param(
  [switch]$Install
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$appDir = Join-Path $root 'languages\python\ai_orchestrator'
Push-Location $appDir

try {
  $py = $env:PYTHON_EXE
  if (-not $py -or -not (Test-Path $py)) {
    $py = 'python'
  }
  if ($Install) {
    Write-Host 'Installing Python deps for orchestrator...'
    & $py -m pip install --upgrade pip
    try {
      & $py -m pip install -r requirements.txt
    } catch {
      Write-Warning "pip install falhou (site-packages não gravável?). Tentando com --user..."
      & $py -m pip install --user -r requirements.txt
    }
  }
  Write-Host "Starting uvicorn with: $py"
  & $py -m uvicorn app:app --host 0.0.0.0 --port 5050
}
finally {
  Pop-Location
}
