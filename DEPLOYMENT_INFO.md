# 🚀 Deployment Bilgileri

## GitHub Repository
**URL:** https://github.com/muratkocak4040-gif/brainstorming-app

## Vercel Proje
**Dashboard:** https://vercel.com/muratkocak4040-gifs-projects/brainstorming-app

## Canlı Site URL'si
Vercel dashboard'unuzda "Domains" sekmesinden veya Production Deployment bölümünden URL'yi görebilirsiniz.

Genellikle şu formatta olur:
- `https://brainstorming-app.vercel.app`
- veya `https://brainstorming-app-[username].vercel.app`

## Önemli Notlar

### MongoDB Connection String
Vercel'de Environment Variables bölümüne `MONGODB_URI` eklemeniz gerekiyor.

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. Settings > Environment Variables
4. Key: `MONGODB_URI`
5. Value: MongoDB connection string'iniz
6. Save

### MongoDB Atlas Kurulumu (Eğer yoksa)
1. https://www.mongodb.com/cloud/atlas adresine gidin
2. Ücretsiz hesap oluşturun
3. Free tier cluster oluşturun
4. Database Access'te kullanıcı oluşturun
5. Network Access'te IP adresinizi ekleyin (0.0.0.0/0 - tüm IP'lere izin)
6. Connect > "Connect your application" seçeneğini seçin
7. Connection string'i kopyalayın

**Örnek Connection String:**
```
mongodb+srv://kullanici_adi:sifre@cluster0.xxxxx.mongodb.net/brainstorming?retryWrites=true&w=majority
```

## Test Etme
1. Site URL'sine gidin
2. "Yeni Konu Oluştur" butonuna tıklayın
3. Bir konu oluşturun
4. Konuya fikir ekleyin
5. Her şey çalışıyorsa başarılı! 🎉

