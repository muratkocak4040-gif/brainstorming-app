# PowerShell script for Windows
# GitHub Repository URL'ini buraya girin
# Örnek: https://github.com/kullaniciadi/brainstorming-app.git
$REPO_URL = ""

if ([string]::IsNullOrEmpty($REPO_URL)) {
    Write-Host "Lütfen REPO_URL değişkenini düzenleyin ve GitHub repository URL'inizi girin" -ForegroundColor Red
    exit 1
}

# Git remote ekle
git remote remove origin 2>$null
git remote add origin $REPO_URL

# Main branch'e geç
git branch -M main

# Push et
git push -u origin main

Write-Host "✅ Proje başarıyla GitHub'a yüklendi!" -ForegroundColor Green

