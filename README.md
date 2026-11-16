# TaskFlow API

Görev ve Proje Yönetim Sistemi için Node.js + Express.js ile geliştirilmiş REST API.

## Özellikler

- Görev CRUD işlemleri (ekleme, listeleme, detay, güncelleme, silme)
- Logger middleware (her isteğin method, endpoint ve zaman damgası konsola ve `logs/requests.log` dosyasına yazılır)
- Raporlama servisleri (tamamlanan, bekleyen görevler ve genel sistem özeti)
- JSON dosyası ile kalıcı veri saklama (`src/data/tasks.json`)

## Gereksinimler

- [Node.js](https://nodejs.org) 18 veya üzeri
- [Postman](https://www.postman.com/downloads/) (test için)

## Kurulum

```bash
git clone <repo-adresi>
cd taskflow-api
npm install
```

## Çalıştırma

```bash
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır. Farklı port için: `PORT=4000 npm start`

Geliştirme modunda (dosya değişince otomatik yeniden başlar):

```bash
npm run dev
```

Örnek verileri sıfırlamak için:

```bash
npm run seed
```

## Endpointler

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/` | API durumu |
| POST | `/tasks` | Yeni görev ekle |
| GET | `/tasks` | Tüm görevleri listele |
| GET | `/tasks/:id` | Görev detayı |
| PUT | `/tasks/:id` | Görev güncelle |
| DELETE | `/tasks/:id` | Görev sil |
| GET | `/reports/completed` | Tamamlanan görev sayısı ve listesi |
| GET | `/reports/pending` | Bekleyen görev sayısı ve listesi |
| GET | `/reports/summary` | Genel sistem özeti |

Detaylı istek/cevap örnekleri: [docs/API.md](docs/API.md)

## Postman ile Test

1. Sunucuyu başlatın: `npm start`
2. Postman'de **Import** ile şu iki dosyayı içe aktarın:
   - `postman/TaskFlow.postman_collection.json`
   - `postman/TaskFlow.postman_environment.json`
3. Sağ üstten **TaskFlow Local** ortamını seçin.
4. Koleksiyona sağ tıklayıp **Run collection** deyin veya istekleri sırayla gönderin.

Koleksiyon; ekleme, listeleme, detay, güncelleme ve silme işlemlerini, hata durumlarını (400, 404) ve raporlama servislerini otomatik test eder.

Terminalden test (sunucu çalışırken, ayrı bir terminalde):

```bash
npm test
```

Test ekran görüntüleri: [docs/screenshots](docs/screenshots)

## Proje Yapısı

```
taskflow-api/
├── src/
│   ├── server.js              # Sunucuyu başlatır
│   ├── app.js                 # Express uygulaması ve middleware'ler
│   ├── config/constants.js    # Durum ve öncelik değerleri
│   ├── routes/                # Routing yapısı
│   ├── controllers/           # İş mantığı
│   ├── middlewares/           # Logger ve hata yönetimi
│   ├── utils/                 # JSON dosya işlemleri, seed
│   └── data/tasks.json        # Veri dosyası
├── postman/                   # Postman koleksiyonu ve ortamı
├── docs/                      # Dokümanlar ve ekran görüntüleri
└── logs/                      # İstek log dosyası
```

## Dokümanlar

- [Proje Tanıtım Dokümanı](docs/PROJE_TANITIM.md)
- [API Dokümantasyonu](docs/API.md)
