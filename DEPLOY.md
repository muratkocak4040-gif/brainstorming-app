# 🚀 Deployment Rehberi

## GitHub'a Yükleme

1. GitHub'da yeni bir repository oluşturun:
   - https://github.com/new adresine gidin
   - Repository adı: `brainstorming-app` (veya istediğiniz bir isim)
   - Public veya Private seçin
   - "Initialize this repository with a README" seçeneğini işaretlemeyin
   - "Create repository" butonuna tıklayın

2. Lokal projeyi GitHub'a push edin:
```bash
git remote add origin https://github.com/KULLANICI_ADI/brainstorming-app.git
git branch -M main
git push -u origin main
```

**Not:** `KULLANICI_ADI` yerine kendi GitHub kullanıcı adınızı yazın.

## Vercel'e Deploy

1. https://vercel.com adresine gidin ve GitHub hesabınızla giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Environment Variables ekleyin:
   - Key: `MONGODB_URI`
   - Value: MongoDB connection string'iniz
5. "Deploy" butonuna tıklayın
6. Deploy tamamlandıktan sonra size verilen URL'yi kullanabilirsiniz

## MongoDB Atlas Kurulumu (Ücretsiz)

1. https://www.mongodb.com/cloud/atlas adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni bir cluster oluşturun (Free tier seçin)
4. Database Access bölümünden kullanıcı oluşturun
5. Network Access bölümünden IP adresinizi ekleyin (veya 0.0.0.0/0 - tüm IP'lere izin ver)
6. Clusters sayfasına dönün ve "Connect" butonuna tıklayın
7. "Connect your application" seçeneğini seçin
8. Connection string'i kopyalayın ve `MONGODB_URI` olarak kullanın

**Örnek Connection String:**
```
mongodb+srv://kullanici_adi:sifre@cluster0.xxxxx.mongodb.net/brainstorming?retryWrites=true&w=majority
```

