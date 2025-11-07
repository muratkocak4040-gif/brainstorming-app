# 🌐 Deployment Linkleri

## Netlify
- **Deployment Dashboard**: https://app.netlify.com/projects/shiny-platypus-1b488c/deploys/690e4dbf4194373bff005d50
- **Site URL**: https://shiny-platypus-1b488c.netlify.app (tahmin edilen)
- **Proje Adı**: shiny-platypus-1b488c

Netlify Dashboard'dan site URL'sini görmek için:
1. https://app.netlify.com adresine gidin
2. Projenize tıklayın
3. Site URL'si üst kısımda görünecektir

## Vercel
- **Site URL**: https://brainstorming-app-two.vercel.app

## GitHub
- **Repository**: https://github.com/muratkocak4040-gif/brainstorming-app

## Önemli Notlar

### MongoDB Connection String
Her iki platformda da (Netlify ve Vercel) MongoDB connection string'i environment variable olarak eklenmelidir:
- Key: `MONGODB_URI`
- Value: MongoDB connection string'iniz

### Otomatik Deploy
GitHub'a push yaptığınızda hem Netlify hem de Vercel otomatik olarak yeni deploy başlatır.

