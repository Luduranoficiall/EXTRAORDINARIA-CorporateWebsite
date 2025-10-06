<#
  Script de conveniência para build/test das linguagens.
  Rodar na raiz do repositório (CorporateWebsite).
#>

Push-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

try {
    Write-Host "[build-all] Building TypeScript..."
    Push-Location languages/typescript
    if (Test-Path package.json) { npm ci; npm run build }
    Pop-Location

    Write-Host "[build-all] Running Python tests..."
    Push-Location languages/python
    if (Test-Path requirements.txt) { python -m pip install --upgrade pip; pip install -r requirements.txt }
    if (Get-Command pytest -ErrorAction SilentlyContinue) { pytest -q } else { python -m pytest -q }
    Pop-Location

    Write-Host "[build-all] Building C..."
    Push-Location languages/c
    if (Test-Path Makefile) { & make all } else { gcc hello.c -o hello }
    Pop-Location

    Write-Host "[build-all] Building C++..."
    Push-Location languages/cpp
    if (!(Test-Path build)) { mkdir build }
    Push-Location build
    cmake ..
    cmake --build .
    Pop-Location
    Pop-Location

    Write-Host "[build-all] Building C# (.NET)..."
    Push-Location languages/csharp
    dotnet restore
    dotnet build --configuration Release
    Pop-Location

} finally {
    Pop-Location
}
