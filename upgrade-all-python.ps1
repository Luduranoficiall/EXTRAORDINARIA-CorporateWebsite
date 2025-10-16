# Script para atualizar todos os projetos Python
Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║     ATUALIZAÇÃO AUTOMÁTICA DE PROJETOS PYTHON      ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

$pythonProjects = @(
    @{
        Name = "CorporateWebsite - Python Base"
        Path = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\python"
    },
    @{
        Name = "CorporateWebsite - AI Orchestrator"
        Path = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\python\ai_orchestrator"
    },
    @{
        Name = "CorporateWebsite - Python App"
        Path = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\python-app"
    },
    @{
        Name = "Extraordinaria Site - Backend"
        Path = "C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\backend"
    }
)

foreach ($project in $pythonProjects) {
    $projectPath = $project.Path
    $reqFile = "$projectPath\requirements.txt"
    
    if (Test-Path $reqFile) {
        Write-Host "📦 Processando: $($project.Name)" -ForegroundColor Cyan
        Write-Host "   Caminho: $projectPath" -ForegroundColor Gray
        
        Push-Location $projectPath
        
        # Criar venv se não existir
        if (!(Test-Path "venv")) {
            Write-Host "   ├─ Criando ambiente virtual..."
            python -m venv venv 2>&1 | Out-Null
        }
        
        # Ativar venv
        Write-Host "   ├─ Ativando venv..."
        & ".\venv\Scripts\Activate.ps1"
        
        # Atualizar pip e setuptools
        Write-Host "   ├─ Atualizando pip/setuptools/wheel..."
        python -m pip install --upgrade pip setuptools wheel 2>&1 | Out-Null
        
        # Atualizar requirements
        Write-Host "   ├─ Atualizando packages de requirements.txt..."
        pip install --upgrade -r requirements.txt 2>&1 | Out-Null
        
        # Gerar novo requirements.txt
        Write-Host "   ├─ Gerando requirements_updated.txt..."
        pip freeze | Out-File "requirements_updated.txt"
        
        Write-Host "   └─ ✅ Concluído" -ForegroundColor Green
        Write-Host ""
        
        Pop-Location
    }
}

Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║    ✅ ATUALIZAÇÃO PYTHON CONCLUÍDA COM SUCESSO!   ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green
