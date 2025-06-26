#!/bin/bash

# EstatePro GitHub Pages Deployment Guide
echo "🏠 EstatePro - GitHub Pages Deployment Setup"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - EstatePro Real Estate Platform"
else
    echo "✅ Git repository already initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please set up your GitHub repository:"
    echo "1. Create a new repository on GitHub named 'estate-pro-finder-main'"
    echo "2. Copy and run this command (replace 'yourusername' with your GitHub username):"
    echo ""
    echo "   git remote add origin https://github.com/yourusername/estate-pro-finder-main.git"
    echo ""
    echo "3. Then push your code:"
    echo "   git branch -M main"
    echo "   git push -u origin main"
else
    echo "✅ Git remote origin already configured"
    echo "🚀 Pushing to GitHub..."
    git add .
    git commit -m "Update: Ready for GitHub Pages deployment" || echo "No changes to commit"
    git push
fi

echo ""
echo "🌐 GitHub Pages Setup Instructions:"
echo "======================================"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Under 'Source', select 'GitHub Actions'"
echo "5. The workflow will automatically deploy your site"
echo ""
echo "📱 Your site will be available at:"
echo "   https://yourusername.github.io/estate-pro-finder-main/"
echo ""
echo "🔧 Don't forget to add your Supabase secrets:"
echo "1. Go to repository Settings > Secrets and variables > Actions"
echo "2. Add these repository secrets:"
echo "   - VITE_SUPABASE_URL: your_supabase_project_url"
echo "   - VITE_SUPABASE_ANON_KEY: your_supabase_anon_key"
echo ""
echo "✨ Deployment complete! Happy coding! 🎉"
