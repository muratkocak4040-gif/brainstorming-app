#!/bin/bash

# Netlify CLI ile deploy script

echo "🚀 Netlify'a deploy ediliyor..."

# Netlify'a giriş yap (eğer yapılmadıysa)
netlify login

# Site oluştur ve deploy et
netlify init

# Environment variable ekle (MongoDB connection string)
echo "MongoDB connection string'inizi girin:"
read MONGODB_URI
netlify env:set MONGODB_URI "$MONGODB_URI"

# Production'a deploy et
netlify deploy --prod

echo "✅ Deploy tamamlandı!"

