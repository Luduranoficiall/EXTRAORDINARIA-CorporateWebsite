Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host '[gitkraken-cli] Tentando instalar via winget/choco/scoop ou binário manual.'
function Try-Cmd($cmd) { try { & $cmd --version | Out-Null; return $true } catch { return $false } }

if (Try-Cmd 'gk') { Write-Host 'gk já instalado.'; exit 0 }

if (Get-Command winget -ErrorAction SilentlyContinue) {
  try {
    winget install --id GitKraken.CLI -e --silent; if (Try-Cmd 'gk') { exit 0 }
  } catch {}
}
if (Get-Command choco -ErrorAction SilentlyContinue) {
  try {
    choco install gitkraken-cli -y --no-progress; if (Try-Cmd 'gk') { exit 0 }
  } catch {}
}
if (Get-Command scoop -ErrorAction SilentlyContinue) {
  try {
    scoop install gitkraken-cli; if (Try-Cmd 'gk') { exit 0 }
  } catch {}
}

Write-Warning 'Não consegui instalar gk automaticamente (winget/choco/scoop ausentes). Baixe manualmente: https://www.gitkraken.com/cli'
exit 1
