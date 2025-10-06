# GDriveAuthTool (.NET)

Utilitário em .NET que replica o script Python `gdrive_get_refresh_token.py` para autenticação do Google Drive.

Funcionalidades:
- Fluxo OAuth Installed App (local-server) para obter um `refresh_token`.
- Fluxo de código de dispositivo (device) para obter `refresh_token` via console.
- Validação de Service Account (com Domain-wide Delegation opcional via `--subject`).
- Escrita opcional de variáveis em um arquivo `.env`.

## Pré-requisitos
- .NET SDK 8.0+

## Como compilar
```powershell
# Na pasta do projeto
 dotnet restore
 dotnet build -c Release
```

## Como usar
```powershell
# Fluxo OAuth (local-server): abre o navegador e retorna o refresh token
# Use as variáveis GOOGLE_DRIVE_CLIENT_ID/GOOGLE_DRIVE_CLIENT_SECRET ou passe via flags

 dotnet run --project . -- --mode local-server --client-id "<CLIENT_ID>" --client-secret "<CLIENT_SECRET>" --write-dotenv .\.env

# Device code (console): não requer webserver local
 dotnet run --project . -- --mode device --client-id "<CLIENT_ID>" --client-secret "<CLIENT_SECRET>"

# Service Account: valida JSON via caminho ou variável de ambiente
 $Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON = "C:\\caminho\\service-account.json"
 dotnet run --project . -- --mode service-account --subject "impersonated@seu-dominio.com"
```

Observações:
- Caso não receba `refresh_token`, revogue o acesso nas permissões da sua conta Google e tente novamente garantindo consentimento offline.
- Scopes padrão: `https://www.googleapis.com/auth/drive.file`. Personalize com `--scopes` usando vírgula ou espaço.

## Paridade com Python
- `local-server` e `service-account` estão cobertos. O modo `device` (código de dispositivo) pode ser adicionado depois, se necessário.
