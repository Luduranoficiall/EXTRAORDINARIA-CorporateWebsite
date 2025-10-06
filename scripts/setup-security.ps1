<#
Script para instalar dependências Python e gerar chaves de segurança de exemplo.
#>
Push-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)
try {
    Write-Host "[setup-security] Instalando dependências Python..."
    Push-Location ..\languages\python
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    Pop-Location

    Write-Host "[setup-security] Gerando chaves de exemplo (não comite essas chaves)..."
    Push-Location ..\security
    python keys_cli.py genrsa
    python keys_cli.py genfernet
    Pop-Location

} finally {
    Pop-Location
}
