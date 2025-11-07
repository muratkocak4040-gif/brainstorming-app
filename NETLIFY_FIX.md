# 🔧 Netlify Build Hatası Çözümü

## Sorun
Netlify'da build hatası alıyorsanız, muhtemelen şu nedenlerden biri olabilir:

1. **@netlify/plugin-nextjs plugin'i eksik**
2. **Publish directory yanlış ayarlanmış**
3. **Node version uyumsuzluğu**
4. **MongoDB connection string eksik (runtime hatası)**

## Çözüm Adımları

### 1. Netlify Dashboard'da Build Ayarlarını Kontrol Edin

Netlify Dashboard'da:
1. Site ayarlarına gidin
2. **Build & deploy** > **Build settings** bölümüne gidin
3. Şu ayarların olduğundan emin olun:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (veya boş bırakın, plugin otomatik ayarlar)
   - **Node version**: `18` (veya `20`)

### 2. Netlify Plugin'inin Yüklendiğinden Emin Olun

`netlify.toml` dosyasında plugin tanımlı olmalı:
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Bu plugin otomatik olarak Netlify tarafından yüklenir, manuel yükleme gerekmez.

### 3. Environment Variables Ekleyin

Netlify Dashboard'da:
1. **Site settings** > **Environment variables**
2. Yeni variable ekleyin:
   - Key: `MONGODB_URI`
   - Value: MongoDB connection string'iniz
   - Scope: All scopes (Production, Deploy previews, Branch deploys)

### 4. Yeni Deploy Yapın

1. Netlify Dashboard'da **Deploys** sekmesine gidin
2. **Trigger deploy** > **Clear cache and deploy site** seçin
3. Deploy'in tamamlanmasını bekleyin

### 5. Build Loglarını Kontrol Edin

Eğer hata devam ederse:
1. **Deploys** sekmesine gidin
2. Başarısız deploy'a tıklayın
3. **Show all logs** butonuna tıklayın
4. Hata mesajını kopyalayın ve kontrol edin

## Yaygın Hatalar ve Çözümleri

### Hata: "Cannot find module"
**Çözüm**: `package.json` dosyasında tüm bağımlılıkların `dependencies` altında olduğundan emin olun (devDependencies değil, eğer build sırasında gerekiyorsa).

### Hata: "Build failed"
**Çözüm**: 
- Build loglarını kontrol edin
- Yerel olarak `npm run build` komutunu çalıştırın
- Hata varsa düzeltin

### Hata: "MongoDB connection failed"
**Çözüm**: 
- Environment variable'ın eklendiğinden emin olun
- Connection string'in doğru formatta olduğundan emin olun
- MongoDB Atlas'ta Network Access ayarlarını kontrol edin

## Test Etme

1. Netlify'da deploy'in başarılı olduğundan emin olun
2. Site URL'sine gidin
3. Uygulamanın çalıştığını test edin
4. MongoDB bağlantısını test edin (konu oluşturmayı deneyin)

## Destek

Eğer sorun devam ederse:
- Netlify build loglarını paylaşın
- Yerel build loglarını paylaşın
- Hata mesajının tam halini paylaşın

