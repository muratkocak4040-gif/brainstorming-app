# GitHub ve Vercel Kurulum Adımları

## 1. GitHub'da Repository Oluşturun

1. https://github.com/new adresine gidin
2. Repository name: `brainstorming-app`
3. Public seçin (veya Private)
4. "Initialize this repository with a README" seçeneğini İŞARETLEMEYİN
5. "Create repository" butonuna tıklayın

## 2. Projeyi GitHub'a Push Edin

Repository oluşturduktan sonra aşağıdaki komutları çalıştırın:

```bash
cd C:\DATA\Desktop\ödev\brainstorming-app
git remote add origin https://github.com/muratkocak4040-gif/brainstorming-app.git
git branch -M main
git push -u origin main
```

## 3. Vercel'e Deploy Edin

1. https://vercel.com adresine gidin
2. "Sign Up" veya "Login" butonuna tıklayın (GitHub ile giriş yapın)
3. "Add New Project" butonuna tıklayın
4. GitHub repository'nizi seçin (`brainstorming-app`)
5. Environment Variables ekleyin:
   - Key: `MONGODB_URI`
   - Value: MongoDB connection string'iniz (MongoDB Atlas'tan alabilirsiniz)
6. "Deploy" butonuna tıklayın
7. Deploy tamamlandıktan sonra size verilen URL'yi kullanabilirsiniz

## MongoDB Atlas Kurulumu (Ücretsiz)

Eğer MongoDB connection string'iniz yoksa:

1. https://www.mongodb.com/cloud/atlas adresine gidin
2. Ücretsiz hesap oluşturun
3. Free tier cluster oluşturun
4. Database Access'te kullanıcı oluşturun
5. Network Access'te IP adresinizi ekleyin (veya 0.0.0.0/0)
6. Connect > "Connect your application" seçeneğini seçin
7. Connection string'i kopyalayın ve Vercel'de `MONGODB_URI` olarak ekleyin

## GitHub Proje Linki

Projeyi GitHub'a push ettikten sonra:
**https://github.com/muratkocak4040-gif/brainstorming-app**

## Vercel Site URL'si

Vercel'e deploy ettikten sonra Vercel dashboard'dan URL'yi görebilirsiniz.
Genellikle şu formatta olur:
**https://brainstorming-app.vercel.app** (veya size özel bir URL)

