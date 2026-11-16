# TaskFlow — Proje Tanıtım Dokümanı

**Görev ve Proje Yönetim Sistemi API'si**
Node.js ile Backend Programlama — Bitirme Projesi

## 1. Projenin Amacı

TaskFlow, bir yazılım ekibinin görevlerini, projelerini ve çalışanların sorumluluklarını tek bir sistem üzerinden takip edebilmesi için geliştirilmiş bir REST API'dir. Proje, Node.js ve Express.js ile sunucu geliştirme, REST API tasarımı, routing, middleware kullanımı, CRUD operasyonları ve JSON veri yönetimi konularının uygulamalı olarak gösterilmesini amaçlar.

## 2. Senaryo

Bir yazılım şirketi, ekip içindeki işlerin kimde olduğunu, hangi aşamada olduğunu ve ne kadar acil olduğunu takip etmekte zorlanmaktadır. TaskFlow ile:

- Yöneticiler yeni görev oluşturur ve görevi bir çalışana atar.
- Çalışanlar görevlerin durumunu (bekliyor, devam ediyor, tamamlandı) günceller.
- Görevlere öncelik (düşük, orta, yüksek), proje ve bitiş tarihi bilgisi verilir.
- Raporlama servisleri ile tamamlanan ve bekleyen işler, gecikmiş görevler ve kişi/proje bazlı dağılım tek istekle görülür.

## 3. Sistem Mimarisi

Proje katmanlı bir yapıda geliştirilmiştir:

| Katman | Görevi |
|--------|--------|
| `server.js` | Sunucuyu belirtilen portta başlatır |
| `app.js` | Express uygulamasını ve middleware sırasını tanımlar |
| `routes/` | Endpoint'leri ilgili controller fonksiyonlarına yönlendirir |
| `controllers/` | İstekleri işler, veriyi okur/yazar, cevap döndürür |
| `middlewares/` | Logger ve hata yönetimi |
| `utils/fileDb.js` | `tasks.json` dosyasına okuma/yazma işlemleri |

İstek akışı: **İstek → Logger → JSON parser → Router → Controller → JSON dosyası → Cevap**

## 4. Veri Modeli

| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | number | Otomatik artan benzersiz kimlik |
| `title` | string | Görev başlığı (zorunlu) |
| `description` | string | Görev açıklaması |
| `status` | string | `pending`, `in-progress`, `completed` (varsayılan: `pending`) |
| `priority` | string | `low`, `medium`, `high` (varsayılan: `medium`) |
| `assignee` | string | Görevin atandığı çalışan |
| `project` | string | Görevin ait olduğu proje |
| `dueDate` | string | Bitiş tarihi (YYYY-MM-DD) |
| `createdAt` | string | Oluşturulma zamanı (ISO) |
| `updatedAt` | string | Son güncelleme zamanı (ISO) |

## 5. Temel Özellikler

**Görev Yönetimi (CRUD)**

| İşlem | Endpoint |
|-------|----------|
| Görev ekleme | `POST /tasks` |
| Görev listeleme | `GET /tasks` |
| Görev detayı | `GET /tasks/:id` |
| Görev güncelleme | `PUT /tasks/:id` |
| Görev silme | `DELETE /tasks/:id` |

**Logger Middleware:** Her isteğin zaman damgası, HTTP metodu, endpoint'i, durum kodu ve süresi hem konsola hem `logs/requests.log` dosyasına yazılır.

Örnek log satırı: `[2026-11-16T01:23:05.921Z] DELETE /tasks/6 200 - 1ms`

**Raporlama Servisleri**

| Endpoint | Döndürdüğü bilgi |
|----------|------------------|
| `GET /reports/completed` | Tamamlanan görev sayısı ve listesi |
| `GET /reports/pending` | Bekleyen görev sayısı ve listesi |
| `GET /reports/summary` | Toplam görev, durum/öncelik/kişi/proje dağılımı, tamamlanma oranı, gecikmiş görev sayısı |

**Hata Yönetimi:** Eksik veya geçersiz veride `400`, bulunamayan görev veya endpoint'te `404`, bozuk JSON'da `400` ve açıklayıcı bir mesaj döner.

## 6. Kullanılan Teknolojiler

- Node.js, Express.js
- JSON dosyası ile veri saklama (`fs` modülü)
- Postman (test), Newman (Postman testlerini terminalden çalıştırma)
- Nodemon (geliştirme)

## 7. Test

Tüm endpoint'ler Postman koleksiyonu (`postman/TaskFlow.postman_collection.json`) ile test edilmiştir. Koleksiyon 13 istek ve 29 otomatik kontrol içerir; tüm kontroller başarılıdır. Ekran görüntüleri `docs/screenshots` klasöründedir.
