Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$app = Join-Path $root 'languages\\python\\ai_orchestrator'

# Prefer configured venv Python if provided
$py = $env:PYTHON_EXE
if (-not $py -or -not (Test-Path $py)) {
  $py = 'python'
}

Push-Location $app
try {
  & $py -m pip install --upgrade pip
  & $py -m pip install -r requirements.txt pytest
  & $py -m pytest -q
}
finally {
  Pop-Location
}
