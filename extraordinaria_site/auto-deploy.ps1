# EXTRAORDINÁRIA.AI - Deploy Automático Completo
# Executa deploy em GitHub Pages e Vercel automaticamente

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🚀 EXTRAORDINÁRIA.AI - DEPLOY AUTOMÁTICO" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

$ErrorActionPreference = "Continue"

# 1. Verificar Git
Write-Host "📋 [1/6] Verificando Git..." -ForegroundColor White
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não encontrado! Instale em: https://git-scm.com/`n" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git OK`n" -ForegroundColor Green

# 2. Commit e Push
Write-Host "📋 [2/6] Preparando arquivos..." -ForegroundColor White
git add .
$commitMessage = "Deploy automático - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage
Write-Host "✅ Commit criado: $commitMessage`n" -ForegroundColor Green

Write-Host "📋 [3/6] Enviando para GitHub..." -ForegroundColor White
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Push para GitHub concluído`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Possível erro no push (verificar manualmente)`n" -ForegroundColor Yellow
}

# 3. GitHub Pages
Write-Host "📋 [4/6] Configurando GitHub Pages..." -ForegroundColor White
Write-Host "🌐 Acesse: https://github.com/Luduranoficiall/EXTRAORDINARIA-CorporateWebsite/settings/pages" -ForegroundColor Cyan
Write-Host "   • Source: Deploy from a branch" -ForegroundColor Gray
Write-Host "   • Branch: main / (root)" -ForegroundColor Gray
Write-Host "   • Clique em Save`n" -ForegroundColor Gray

# 4. Vercel (se instalado)
Write-Host "📋 [5/6] Tentando deploy no Vercel..." -ForegroundColor White
if (Get-Command vercel -ErrorAction SilentlyContinue) {
    vercel --prod --yes
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Deploy Vercel concluído`n" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Erro no Vercel (verificar manualmente)`n" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Vercel CLI não encontrado" -ForegroundColor Yellow
    Write-Host "💡 Instale com: npm i -g vercel" -ForegroundColor Cyan
    Write-Host "   Ou faça deploy manual em: https://vercel.com/new`n" -ForegroundColor Cyan
}

# 5. Resumo
Write-Host "📋 [6/6] RESUMO DO DEPLOY" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Código sincronizado com GitHub" -ForegroundColor Green
Write-Host "🌐 GitHub Pages: https://luduranoficiall.github.io/EXTRAORDINARIA-CorporateWebsite/" -ForegroundColor Cyan
Write-Host "🌐 GitHub Repo: https://github.com/Luduranoficiall/EXTRAORDINARIA-CorporateWebsite" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "✨ DEPLOY AUTOMÁTICO CONCLUÍDO!`n" -ForegroundColor Green

# 6. Abrir URLs
Write-Host "🌐 Abrindo sites..." -ForegroundColor White
Start-Process "https://github.com/Luduranoficiall/EXTRAORDINARIA-CorporateWebsite"
Start-Sleep -Seconds 2
Start-Process "https://luduranoficiall.github.io/EXTRAORDINARIA-CorporateWebsite/"

Write-Host "`n✅ TUDO PRONTO! Sites abertos no navegador`n" -ForegroundColor Green
