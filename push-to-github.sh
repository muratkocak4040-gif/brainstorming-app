#!/bin/bash

# GitHub Repository URL'ini buraya girin
# Örnek: https://github.com/kullaniciadi/brainstorming-app.git
REPO_URL=""

if [ -z "$REPO_URL" ]; then
    echo "Lütfen REPO_URL değişkenini düzenleyin ve GitHub repository URL'inizi girin"
    exit 1
fi

# Git remote ekle
git remote remove origin 2>/dev/null
git remote add origin $REPO_URL

# Main branch'e geç
git branch -M main

# Push et
git push -u origin main

echo "✅ Proje başarıyla GitHub'a yüklendi!"

