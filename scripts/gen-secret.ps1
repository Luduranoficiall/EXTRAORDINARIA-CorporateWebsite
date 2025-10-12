Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try {
  $py = (Get-Command py -ErrorAction SilentlyContinue).Source
  if (-not $py) { $py = (Get-Command python -ErrorAction SilentlyContinue).Source }
  if (-not $py) { throw "Python não encontrado no PATH." }
  $code = @'
from cryptography.fernet import Fernet
print(Fernet.generate_key().decode())
'@
  & $py -c $code
} catch {
  Write-Error "Falha ao gerar chave: $_"
  exit 1
}
