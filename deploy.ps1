# EstatePro GitHub Pages Deployment Guide
Write-Host "🏠 EstatePro - GitHub Pages Deployment Setup" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - EstatePro Real Estate Platform"
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Check if remote origin exists
$remoteExists = $false
try {
    git remote get-url origin | Out-Null
    $remoteExists = $true
} catch {
    $remoteExists = $false
}

if (-not $remoteExists) {
    Write-Host ""
    Write-Host "🔗 Please set up your GitHub repository:" -ForegroundColor Yellow
    Write-Host "1. Create a new repository on GitHub named 'estate-pro-finder-main'" -ForegroundColor White
    Write-Host "2. Copy and run this command (replace 'yourusername' with your GitHub username):" -ForegroundColor White
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/yourusername/estate-pro-finder-main.git" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "3. Then push your code:" -ForegroundColor White
    Write-Host "   git branch -M main" -ForegroundColor Magenta
    Write-Host "   git push -u origin main" -ForegroundColor Magenta
} else {
    Write-Host "✅ Git remote origin already configured" -ForegroundColor Green
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    git add .
    try {
        git commit -m "Update: Ready for GitHub Pages deployment"
    } catch {
        Write-Host "No changes to commit" -ForegroundColor Yellow
    }
    git push
}

Write-Host ""
Write-Host "🌐 GitHub Pages Setup Instructions:" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "1. Go to your GitHub repository" -ForegroundColor White
Write-Host "2. Click on 'Settings' tab" -ForegroundColor White
Write-Host "3. Scroll down to 'Pages' section" -ForegroundColor White
Write-Host "4. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
Write-Host "5. The workflow will automatically deploy your site" -ForegroundColor White
Write-Host ""
Write-Host "📱 Your site will be available at:" -ForegroundColor Cyan
Write-Host "   https://yourusername.github.io/estate-pro-finder-main/" -ForegroundColor Magenta
Write-Host ""
Write-Host "🔧 Don't forget to add your Supabase secrets:" -ForegroundColor Yellow
Write-Host "1. Go to repository Settings > Secrets and variables > Actions" -ForegroundColor White
Write-Host "2. Add these repository secrets:" -ForegroundColor White
Write-Host "   - VITE_SUPABASE_URL: your_supabase_project_url" -ForegroundColor Magenta
Write-Host "   - VITE_SUPABASE_ANON_KEY: your_supabase_anon_key" -ForegroundColor Magenta
Write-Host ""
Write-Host "✨ Deployment complete! Happy coding! 🎉" -ForegroundColor Green
