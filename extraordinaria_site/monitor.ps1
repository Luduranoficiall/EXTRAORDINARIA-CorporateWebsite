# EXTRAORDINARIA.AI - Monitor de Status
# Verifica e exibe status completo do sistema

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " EXTRAORDINARIA.AI - STATUS DO SISTEMA" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# 1. Servidor Local
Write-Host "SERVIDOR LOCAL:" -ForegroundColor White
$port8000 = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if ($port8000) {
    Write-Host "   [OK] Rodando na porta 8000" -ForegroundColor Green
    Write-Host "   URL: http://localhost:8000" -ForegroundColor Cyan
} else {
    Write-Host "   [X] Nao detectado na porta 8000" -ForegroundColor Red
    Write-Host "   Execute: python servidor_permanente.py`n" -ForegroundColor Yellow
}

# 2. Arquivos Principais
Write-Host "`nARQUIVOS PRINCIPAIS:" -ForegroundColor White
$files = @(
    "index.html",
    "dashboard.html",
    "servidor_permanente.py",
    "manifest.json",
    "service-worker.js",
    "analytics.js",
    "performance.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        $sizeKB = [math]::Round($size / 1KB, 2)
        Write-Host "   [OK] $file ($sizeKB KB)" -ForegroundColor Green
    } else {
        Write-Host "   [X] $file (nao encontrado)" -ForegroundColor Red
    }
}

# 3. Git Status
Write-Host "`nGIT STATUS:" -ForegroundColor White
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitStatus = git status --short
    if ($gitStatus) {
        Write-Host "   [!] Alteracoes nao commitadas:" -ForegroundColor Yellow
        $gitStatus | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
    } else {
        Write-Host "   [OK] Repositorio limpo (sem alteracoes)" -ForegroundColor Green
    }
    
    $branch = git branch --show-current
    $remote = git remote get-url origin
    Write-Host "   Branch: $branch" -ForegroundColor Cyan
    Write-Host "   Remote: $remote" -ForegroundColor Cyan
} else {
    Write-Host "   [X] Git nao instalado" -ForegroundColor Red
}

# 4. URLs Públicas
Write-Host "`nURLS PUBLICAS:" -ForegroundColor White
Write-Host "   GitHub Pages: https://luduranoficiall.github.io/EXTRAORDINARIA-CorporateWebsite/" -ForegroundColor Cyan
Write-Host "   GitHub Repo:  https://github.com/Luduranoficiall/EXTRAORDINARIA-CorporateWebsite" -ForegroundColor Cyan

# 5. Processos Python
Write-Host "`nPROCESSOS PYTHON:" -ForegroundColor White
$pythonProcs = Get-Process python -ErrorAction SilentlyContinue
if ($pythonProcs) {
    Write-Host "   [OK] $($pythonProcs.Count) processo(s) Python ativo(s)" -ForegroundColor Green
    $pythonProcs | ForEach-Object {
        $memMB = [math]::Round($_.WorkingSet64 / 1MB)
        Write-Host "      PID: $($_.Id) | Mem: $memMB MB" -ForegroundColor Gray
    }
} else {
    Write-Host "   [!] Nenhum processo Python detectado" -ForegroundColor Yellow
}

# 6. Sistema
Write-Host "`nSISTEMA:" -ForegroundColor White
$drive = Get-PSDrive C
$freeGB = [math]::Round($drive.Free / 1GB, 2)
$usedGB = [math]::Round($drive.Used / 1GB, 2)
$totalGB = [math]::Round(($drive.Free + $drive.Used) / 1GB, 2)
Write-Host "   Disco C: $usedGB GB usado / $totalGB GB total" -ForegroundColor Cyan
Write-Host "   Espaco livre: $freeGB GB" -ForegroundColor Cyan

# 7. Resumo Final
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " SISTEMA OPERACIONAL!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# 8. Ações Rápidas
Write-Host "ACOES RAPIDAS:" -ForegroundColor Yellow
Write-Host "   1. Iniciar servidor:  python servidor_permanente.py" -ForegroundColor Gray
Write-Host "   2. Deploy automatico: .\auto-deploy.ps1" -ForegroundColor Gray
Write-Host "   3. Ver este status:   .\monitor.ps1`n" -ForegroundColor Gray
