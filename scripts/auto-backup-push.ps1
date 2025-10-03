<#
Script que comita mudanças na branch atual e faz push para origin/main.
Uso: .\scripts\auto-backup-push.ps1 -Message "Snapshot"
#>
param(
  [string]$Message = "auto: snapshot"
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git não encontrado. Instale git e tente novamente."
  exit 1
}

# adicionar tudo e tentar commitar
git add -A
try {
  git commit -m $Message
} catch {
  Write-Host "Nada novo para commitar ou commit falhou. Continuando."
}

# push para origin/main
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  Write-Error "Remote 'origin' não configurado. Use scripts/push-to-github-via-token.ps1 ou configure o remote manualmente."
  exit 1
}

try {
  git push origin HEAD:main
  Write-Host "Push realizado para origin/main."
} catch {
  Write-Error "Falha ao dar push: $($_.Exception.Message)"
  exit 1
}
