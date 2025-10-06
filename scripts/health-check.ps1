param(
  [int]$Retries = 30,
  [int]$DelaySeconds = 2
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Wait-HttpOk {
  param(
    [string]$Url,
    [string]$Name
  )
  for ($i=0; $i -lt $Retries; $i++) {
    try {
      $resp = Invoke-WebRequest -UseBasicParsing -Uri $Url -Method GET -TimeoutSec 5
      if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
        Write-Host "[$Name] OK $($resp.StatusCode) - $Url"
        return $true
      }
    } catch {
      Start-Sleep -Seconds $DelaySeconds
    }
  }
  Write-Error "[$Name] TIMEOUT - $Url"
  return $false
}

$ok1 = Wait-HttpOk -Url "http://localhost:5050/health" -Name "Orchestrator"
$ok2 = Wait-HttpOk -Url "http://localhost:3000" -Name "Frontend"

if ($ok1 -and $ok2) {
  Write-Host "All services healthy."
  exit 0
} else {
  Write-Error "Some services failed health check."
  exit 1
}
