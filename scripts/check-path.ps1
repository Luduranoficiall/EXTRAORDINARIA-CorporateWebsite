<#
check-path.ps1

Executa diagnósticos para um caminho e grava resultados em scripts\path-check.log.

Uso:
  PowerShell -ExecutionPolicy Bypass -File .\scripts\check-path.ps1 -Path "C:\caminho\para\pasta"

Opções:
  -FixOwner   : (OPCIONAL, perigoso) executa takeown / icacls para tomar posse e conceder controle total ao usuário atual.
  -OpenExplorer : (OPCIONAL) abre o Explorer na pasta (útil para forçar download do OneDrive).
  -UseLongPath : (OPCIONAL) tenta acessar o caminho usando o prefixo \\?\ para contornar limites de comprimento.

Por padrão, o script NÃO altera permissões nem propriedade sem -FixOwner.
#>

param(
  [string]$Path = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai",
  [switch]$FixOwner,
  [switch]$OpenExplorer,
  [switch]$UseLongPath
)

$log = Join-Path -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition) -ChildPath "path-check.log"
if (Test-Path $log) { Remove-Item $log -Force }
function L { param($s) $t = (Get-Date).ToString('s'); "$t - $s" | Tee-Object -FilePath $log -Append }

L "Iniciando check-path.ps1 para: $Path"

try {
  L "1) Test-Path"
  $exists = Test-Path -LiteralPath $Path
  L "Test-Path: $exists"

  L "2) Resolve-Path"
  try { $resolved = Resolve-Path -LiteralPath $Path -ErrorAction Stop; L "Resolve-Path: $resolved" } catch { L "Resolve-Path falhou: $($_.Exception.Message)" }

  L "3) Listar pasta pai (Get-ChildItem no pai)"
  try { $parent = Split-Path -Parent $Path; L "Pai: $parent"; Get-ChildItem -LiteralPath $parent -Force -ErrorAction Stop | Select-Object Name,Mode,Length | Out-String | Tee-Object -FilePath $log -Append } catch { L "Listagem falhou: $($_.Exception.Message)" }

  L "4) Tentar entrar na pasta (Set-Location)"
  try { Set-Location -LiteralPath $Path -ErrorAction Stop; L "Set-Location OK (agora em $(Get-Location))" } catch { L "Set-Location falhou: $($_.Exception.Message)" }

  L "5) Get-Acl (permissões)"
  try { $acl = Get-Acl -LiteralPath $Path; $acl | Format-List | Out-String | Tee-Object -FilePath $log -Append } catch { L "Get-Acl falhou: $($_.Exception.Message)" }

  if ($OpenExplorer) {
    L "6) Abrindo Explorer para forçar download / acesso (Start-Process)"
    try { Start-Process explorer -ArgumentList ($Path) -ErrorAction Stop; L "Explorer aberto em $Path" } catch { L "Falha ao abrir Explorer: $($_.Exception.Message)" }
  } else { L "6) (pulando abrir Explorer)" }

  if ($UseLongPath) {
    L "7) Tentando acesso via caminho longo (\\?\ prefix)"
    $long = $Path
    if ($long -notlike '\\?\*') { $long = "\\?\$long" }
    try { Set-Location -LiteralPath $long -ErrorAction Stop; L "Set-Location com prefixo long-path OK" } catch { L "Set-Location long-path falhou: $($_.Exception.Message)" }
  } else { L "7) (pulando tentativa long-path)" }

  if ($FixOwner) {
    L "8) ALTERAÇÃO DE PROPRIEDADE/PERMS (operation will run takeown/icacls)"
    try {
      $user = $env:USERNAME
      L "Executando: takeown /F \"$Path\" /R /D Y"
      & takeown /F "$Path" /R /D Y 2>&1 | Tee-Object -FilePath $log -Append
      L "Executando: icacls \"$Path\" /grant \"$user\":F /T"
      & icacls "$Path" /grant "$user`:F" /T 2>&1 | Tee-Object -FilePath $log -Append
      L "takeown/icacls executados"
    } catch { L "Falha em takeown/icacls: $($_.Exception.Message)" }
  } else { L "8) (não alterando propriedade/perms; passe -FixOwner para aplicar)" }

  L "Concluído. Verifique o log: $log"
} catch {
  L "Erro inesperado: $($_.Exception.Message)"
}
