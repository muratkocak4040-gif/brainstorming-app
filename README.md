# 🧠 Beyin Fırtınası (Brainstorming App)

Modern ve kullanıcı dostu bir beyin fırtınası uygulaması. Kullanıcılar konular oluşturabilir ve diğer kullanıcılar bu konulara fikirlerini ekleyebilir.

## 🚀 Özellikler

- ✅ Konu oluşturma
- ✅ Fikir paylaşma
- ✅ Gerçek zamanlı fikir listesi
- ✅ Modern ve responsive tasarım
- ✅ MongoDB veritabanı entegrasyonu

## 🛠️ Teknolojiler

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **MongoDB** - Veritabanı
- **Mongoose** - MongoDB ODM

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd brainstorming-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. MongoDB bağlantı string'inizi `.env.local` dosyasına ekleyin:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainstorming?retryWrites=true&w=majority
```

4. Development server'ı başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 🌐 Deploy

### Vercel'e Deploy

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com) hesabınıza giriş yapın
3. "New Project" butonuna tıklayın
4. GitHub repositorinizi seçin
5. Environment variable olarak `MONGODB_URI` ekleyin
6. Deploy butonuna tıklayın

## 📝 Kullanım

1. Ana sayfada "Yeni Konu Oluştur" butonuna tıklayın
2. Konu başlığı, açıklama ve adınızı girin
3. Konu oluşturulduktan sonra, konu kartına tıklayarak detay sayfasına gidin
4. Detay sayfasında fikirlerinizi paylaşabilirsiniz
5. Diğer kullanıcıların fikirlerini görüntüleyebilirsiniz

## 📄 Lisans

MIT
