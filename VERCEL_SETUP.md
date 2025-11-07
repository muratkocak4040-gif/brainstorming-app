# 🔧 Vercel MongoDB Bağlantı Kurulumu

## ❌ Hata Mesajı
Eğer şu hatayı alıyorsanız:
```
Hata: Please define the MONGODB_URI environment variable inside .env.local
```

Bu, MongoDB bağlantı bilgisinin Vercel'de ayarlanmadığını gösterir.

## ✅ Çözüm: Vercel'de Environment Variable Ekleme

### Adım 1: Vercel Dashboard'a Gidin
1. https://vercel.com/muratkocak4040-gifs-projects/brainstorming-app adresine gidin
2. Üst menüden **Settings** (Ayarlar) sekmesine tıklayın
3. Sol menüden **Environment Variables** seçeneğine tıklayın

### Adım 2: Yeni Environment Variable Ekleyin
1. **Key** alanına: `MONGODB_URI` yazın
2. **Value** alanına: MongoDB connection string'inizi yapıştırın
3. **Environment** için: **Production**, **Preview**, ve **Development** seçeneklerini işaretleyin
4. **Add** butonuna tıklayın
5. **Save** butonuna tıklayın

### Adım 3: Yeni Deployment Yapın
1. Ana sayfaya dönün (Overview sekmesi)
2. Sağ üst köşedeki **"..."** menüsüne tıklayın
3. **Redeploy** seçeneğini seçin
4. Veya GitHub'a yeni bir commit push edin (otomatik deploy başlar)

## 🆓 MongoDB Atlas Kurulumu (Eğer MongoDB'niz Yoksa)

### 1. MongoDB Atlas Hesabı Oluşturun
1. https://www.mongodb.com/cloud/atlas adresine gidin
2. **"Try Free"** veya **"Sign Up"** butonuna tıklayın
3. Email ve şifre ile hesap oluşturun

### 2. Cluster Oluşturun
1. **"Build a Database"** butonuna tıklayın
2. **FREE** (M0) seçeneğini seçin
3. Cloud provider ve region seçin (önemli değil, varsayılanı seçebilirsiniz)
4. **"Create"** butonuna tıklayın
5. Cluster oluşturulmasını bekleyin (2-3 dakika sürebilir)

### 3. Database User Oluşturun
1. **"Database Access"** (sol menüden) seçeneğine tıklayın
2. **"Add New Database User"** butonuna tıklayın
3. Authentication Method: **Password** seçin
4. Username ve Password belirleyin (not edin, unutmayın!)
5. Database User Privileges: **"Read and write to any database"** seçin
6. **"Add User"** butonuna tıklayın

### 4. Network Access Ayarlayın
1. **"Network Access"** (sol menüden) seçeneğine tıklayın
2. **"Add IP Address"** butonuna tıklayın
3. **"Allow Access from Anywhere"** butonuna tıklayın (0.0.0.0/0)
4. **"Confirm"** butonuna tıklayın

### 5. Connection String Alın
1. **"Databases"** (sol menüden) seçeneğine tıklayın
2. Oluşturduğunuz cluster'ın yanındaki **"Connect"** butonuna tıklayın
3. **"Connect your application"** seçeneğini seçin
4. Driver: **Node.js**, Version: **5.5 or later** seçili olmalı
5. Connection string'i kopyalayın

**Connection string şu formatta olacak:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Connection String'i Düzenleyin
Connection string'deki `<username>` ve `<password>` kısımlarını, 3. adımda oluşturduğunuz kullanıcı adı ve şifre ile değiştirin.

Sonuna database adını ekleyin:
```
mongodb+srv://kullanici_adi:sifre@cluster0.xxxxx.mongodb.net/brainstorming?retryWrites=true&w=majority
```

### 7. Vercel'e Ekleyin
Yukarıdaki "Çözüm" bölümündeki adımları takip ederek bu connection string'i Vercel'e ekleyin.

## ✅ Kontrol
1. Vercel'de environment variable'ı ekledikten sonra
2. Yeni bir deployment yapın
3. Site URL'sine gidin
4. "Yeni Konu Oluştur" butonuna tıklayın
5. Hata mesajı görünmüyorsa başarılı! 🎉

## 📞 Yardım
Eğer sorun devam ederse:
1. Vercel Dashboard > Settings > Environment Variables'da MONGODB_URI'nin ekli olduğundan emin olun
2. Connection string'in doğru formatta olduğundan emin olun
3. MongoDB Atlas'ta Network Access ayarlarının doğru olduğundan emin olun
4. Yeni bir deployment yaptığınızdan emin olun

