Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$envExample = Join-Path $workspace 'CorporateWebsite\.env.example'
$envFile = Join-Path $workspace 'CorporateWebsite\.env'

if (!(Test-Path $envFile)) {
  if (!(Test-Path $envExample)) { throw ".env.example não encontrado em $envExample" }
  Copy-Item $envExample $envFile -Force
  (Get-Content $envFile) |
    ForEach-Object {
      $_ -replace '^#\s*AI_PROVIDER=stub', 'AI_PROVIDER=stub' `
         -replace '^#\s*MODEL_GPT_CODE=gpt-5-codex', 'MODEL_GPT_CODE=gpt-5-codex' `
         -replace '^#\s*MODEL_GPT_GENERAL=gpt-5', 'MODEL_GPT_GENERAL=gpt-5' `
         -replace '^#\s*AUTH_BEARER=change_this_in_prod', 'AUTH_BEARER=dev_token' `
         -replace '^#\s*FLASK_ENV=development', 'FLASK_ENV=development'
    } | Set-Content $envFile -Encoding UTF8
  Write-Host "[ensure-env] .env criado em $envFile (ajuste a OPENAI_API_KEY para produção)"
} else {
  Write-Host "[ensure-env] .env já existe em $envFile"
}

# (Re)carregar conteúdo após possível criação/modificação
$content = Get-Content $envFile -Raw

# Garantir SECRET_MASTER_KEY presente
if ($content -notmatch "(?m)^SECRET_MASTER_KEY=") {
  $secret = $null
  try {
    $secret = & (Join-Path $workspace 'scripts\gen-secret.ps1')
  } catch {
    Write-Warning "[ensure-env] gen-secret.ps1 falhou: $_"
  }
  if (-not $secret) {
    # Fallback PowerShell: gerar 32 bytes e codificar em Base64 url-safe (compatível com Fernet)
    try {
      $bytes = New-Object byte[] 32
      [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
      $b64 = [Convert]::ToBase64String($bytes)
      $b64 = $b64.Replace('+','-').Replace('/','_')
      # manter '=' de padding para compatibilidade
      $secret = $b64
      Write-Host "[ensure-env] SECRET_MASTER_KEY gerada via fallback PowerShell."
    } catch {
      Write-Warning "[ensure-env] Falha no fallback PowerShell para SECRET_MASTER_KEY: $_"
    }
  }
  if ($secret) {
    Add-Content -Path $envFile -Value "`nSECRET_MASTER_KEY=$secret"
    Write-Host "[ensure-env] SECRET_MASTER_KEY adicionada ao .env"
  } else {
    Write-Warning "[ensure-env] Não foi possível gerar SECRET_MASTER_KEY automaticamente. Adicione manualmente."
  }
  # atualizar $content após append
  $content = Get-Content $envFile -Raw
}

# Garantir placeholders úteis
function Ensure-Line($key, $value) {
  if ($content -notmatch "(?m)^$key=") {
    Add-Content -Path $envFile -Value "$key=$value"
    Write-Host "[ensure-env] $key adicionado ao .env"
    # refresh content para próximas verificações
    $script:content = Get-Content $envFile -Raw
  }
}

Ensure-Line -key 'APP_NAME' -value 'EXTRAORDINARIA'
Ensure-Line -key 'ADMIN_PASSWORD' -value 'change_this_in_prod'
Ensure-Line -key 'VITE_ADMIN_PASSWORD' -value 'change_this_in_prod'
