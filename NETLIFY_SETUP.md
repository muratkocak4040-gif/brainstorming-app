# 🚀 Netlify Deployment Rehberi

## Netlify'a Deploy Etme

### Yöntem 1: Netlify Web Arayüzü (Önerilen)

1. **Netlify Hesabı Oluşturun**
   - https://www.netlify.com adresine gidin
   - "Sign up" butonuna tıklayın
   - GitHub hesabınızla giriş yapın

2. **Yeni Site Oluşturun**
   - Dashboard'da "Add new site" > "Import an existing project" seçeneğini seçin
   - GitHub'ı seçin ve repository'nizi bulun: `brainstorming-app`
   - "Connect" butonuna tıklayın

3. **Build Ayarları**
   - Build command: `npm run build` (otomatik olarak gelir)
   - Publish directory: `.next` (otomatik olarak gelir)
   - "Show advanced" butonuna tıklayın
   - Environment variables ekleyin:
     - Key: `MONGODB_URI`
     - Value: MongoDB connection string'iniz

4. **Deploy Et**
   - "Deploy site" butonuna tıklayın
   - Deploy tamamlandıktan sonra size verilen URL'yi kullanabilirsiniz

### Yöntem 2: Netlify CLI

1. **Netlify CLI Kurulumu**
```bash
npm install -g netlify-cli
```

2. **Netlify'a Giriş Yapın**
```bash
netlify login
```

3. **Site Oluşturun ve Deploy Edin**
```bash
cd brainstorming-app
netlify init
```
   - "Create & configure a new site" seçin
   - Site adını girin (veya varsayılanı kullanın)
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Environment Variable Ekleyin**
```bash
netlify env:set MONGODB_URI "your-mongodb-connection-string"
```

5. **Deploy Edin**
```bash
netlify deploy --prod
```

## Önemli Notlar

### MongoDB Connection String
Netlify'da da MongoDB connection string'i eklemeniz gerekiyor:
- Netlify Dashboard > Site settings > Environment variables
- Key: `MONGODB_URI`
- Value: MongoDB connection string'iniz

### Build Ayarları
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18 (otomatik olarak seçilir)

### Otomatik Deploy
GitHub'a push yaptığınızda Netlify otomatik olarak yeni deploy başlatır.

## Netlify vs Vercel

Her iki platform da çalışır:
- **Vercel**: https://brainstorming-app-two.vercel.app
- **Netlify**: Deploy ettikten sonra URL alacaksınız

## Sorun Giderme

### Build Hatası
- Node version 18 kullandığınızdan emin olun
- `npm install` komutunu çalıştırın
- Environment variables'ların doğru eklendiğinden emin olun

### MongoDB Bağlantı Hatası
- Netlify'da environment variable'ın eklendiğinden emin olun
- Connection string'in doğru formatta olduğundan emin olun
- MongoDB Atlas'ta Network Access ayarlarını kontrol edin

