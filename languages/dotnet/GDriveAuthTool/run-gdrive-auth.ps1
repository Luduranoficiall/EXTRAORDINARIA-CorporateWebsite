# Uso rápido do GDriveAuthTool
param(
  [ValidateSet('local-server','device','service-account')]
  [string]$Mode = 'local-server',
  [string]$ClientId,
  [string]$ClientSecret,
  [string]$Scopes,
  [string]$DotEnv,
  [string]$ServiceAccountFile,
  [string]$Subject
)

$ErrorActionPreference = 'Stop'
$proj = "$(Split-Path -Parent $MyInvocation.MyCommand.Path)\GDriveAuthTool.csproj"
$bin  = "$(Split-Path -Parent $MyInvocation.MyCommand.Path)\bin\Release\net9.0\win-x64\publish\GDriveAuthTool.exe"

if(!(Test-Path $bin)){
  Write-Host 'Publicando GDriveAuthTool (win-x64)...'
  & dotnet publish $proj -c Release -r win-x64 --self-contained:$false | Out-Host
}

$argv = @('--mode', $Mode)
if($ClientId){ $argv += @('--client-id', $ClientId) }
if($ClientSecret){ $argv += @('--client-secret', $ClientSecret) }
if($Scopes){ $argv += @('--scopes', $Scopes) }
if($DotEnv){ $argv += @('--write-dotenv', $DotEnv) }
if($ServiceAccountFile){ $argv += @('--service-account-file', $ServiceAccountFile) }
if($Subject){ $argv += @('--subject', $Subject) }

& $bin @argv | Out-Host
