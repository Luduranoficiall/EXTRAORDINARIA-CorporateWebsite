param(
  [string]$RepoName = "corporate-website-development",
  [bool]$Private = $true
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git não encontrado. Instale git e tente novamente."
  exit 1
}

$token = $env:GITHUB_TOKEN
if (-not $token) {
  Write-Error "Variável de ambiente GITHUB_TOKEN não encontrada. Exporte um token com scope 'repo' e tente novamente."
  exit 1
}

$body = @{ name = $RepoName; private = $Private } | ConvertTo-Json

$headers = @{ Authorization = "token $token"; "User-Agent" = "ps-script" }

try {
  $resp = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
} catch {
  Write-Error "Falha ao criar repositório via API GitHub: $($_.Exception.Message)"
  exit 1
}

# pegar URL clone
$cloneUrl = $resp.clone_url
if (-not $cloneUrl) {
  Write-Error "Resposta inesperada da API; não encontrou clone_url."
  exit 1
}

# configurar origin
try {
  git remote remove origin 2>$null
} catch { }

git remote add origin $cloneUrl
Write-Host "Remote 'origin' configurado para: $cloneUrl"

# push
git branch -M main
Write-Host "Fazendo push da branch main..."
# usar token em URL para evitar prompt (HTTPS)
$remoteWithToken = $cloneUrl -replace 'https://', "https://$token@"
try {
  git push -u $remoteWithToken main
  Write-Host "Push realizado com sucesso. Removendo token da configuração remota."
  git remote set-url origin $cloneUrl
} catch {
  Write-Error "Falha ao dar push: $($_.Exception.Message)"
  exit 1
}

Write-Host "Repositório criado e push inicial efetuado."