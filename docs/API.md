# TaskFlow API Dokümantasyonu

Temel adres: `http://localhost:3000`

Tüm istek ve cevaplar JSON formatındadır. `POST` ve `PUT` isteklerinde `Content-Type: application/json` başlığı gönderilmelidir.

## Değer Listeleri

- `status`: `pending`, `in-progress`, `completed`
- `priority`: `low`, `medium`, `high`

## Görevler

### Görev Ekle

`POST /tasks`

Yeni görev oluşturur. `title` zorunludur; `status` verilmezse `pending`, `priority` verilmezse `medium` atanır.

**İstek gövdesi:**

```json
{
  "title": "Raporlama ekranı",
  "description": "Özet raporu için arayüz",
  "priority": "high",
  "assignee": "lale",
  "project": "TaskFlow",
  "dueDate": "2026-12-20"
}
```

**Cevap (201):**

```json
{
  "success": true,
  "message": "Görev oluşturuldu",
  "data": {
    "id": 6,
    "title": "Raporlama ekranı",
    "description": "Özet raporu için arayüz",
    "status": "pending",
    "priority": "high",
    "assignee": "lale",
    "project": "TaskFlow",
    "dueDate": "2026-12-20",
    "createdAt": "2026-11-16T01:23:55.702Z",
    "updatedAt": "2026-11-16T01:23:55.702Z"
  }
}
```

### Görevleri Listele

`GET /tasks`

Tüm görevleri döndürür.

**Cevap (200):**

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "title": "Veritabanı şemasını tasarla",
      "description": "Görev ve proje tabloları için şema hazırlanacak",
      "status": "completed",
      "priority": "high",
      "assignee": "musa",
      "project": "TaskFlow",
      "dueDate": "2026-11-10",
      "createdAt": "2026-11-16T01:23:55.623Z",
      "updatedAt": "2026-11-16T01:23:55.623Z"
    },
    {
      "id": 2,
      "title": "Login ekranı backend",
      "description": "Kimlik doğrulama endpointleri yazılacak",
      "status": "in-progress",
      "priority": "high",
      "assignee": "ayse",
      "project": "TaskFlow",
      "dueDate": "2026-11-25",
      "createdAt": "2026-11-16T01:23:55.623Z",
      "updatedAt": "2026-11-16T01:23:55.623Z"
    },
    "..."
  ]
}
```

### Görev Detayı

`GET /tasks/:id`

Belirli bir görevi döndürür.

**Cevap (200):**

```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "Raporlama ekranı",
    "description": "Özet raporu için arayüz",
    "status": "pending",
    "priority": "high",
    "assignee": "lale",
    "project": "TaskFlow",
    "dueDate": "2026-12-20",
    "createdAt": "2026-11-16T01:23:55.702Z",
    "updatedAt": "2026-11-16T01:23:55.702Z"
  }
}
```

### Görev Güncelle

`PUT /tasks/:id`

Gönderilen alanları günceller; gönderilmeyen alanlar değişmez.

**İstek gövdesi:**

```json
{
  "status": "in-progress",
  "priority": "medium"
}
```

**Cevap (200):**

```json
{
  "success": true,
  "message": "Görev güncellendi",
  "data": {
    "id": 6,
    "title": "Raporlama ekranı",
    "description": "Özet raporu için arayüz",
    "status": "in-progress",
    "priority": "medium",
    "assignee": "lale",
    "project": "TaskFlow",
    "dueDate": "2026-12-20",
    "createdAt": "2026-11-16T01:23:55.702Z",
    "updatedAt": "2026-11-16T01:23:55.707Z"
  }
}
```

### Görev Sil

`DELETE /tasks/:id`

Görevi sistemden kaldırır ve silinen görevi döndürür.

**Cevap (200):**

```json
{
  "success": true,
  "message": "Görev silindi",
  "data": {
    "id": 6,
    "title": "Raporlama ekranı",
    "description": "Özet raporu için arayüz",
    "status": "in-progress",
    "priority": "medium",
    "assignee": "lale",
    "project": "TaskFlow",
    "dueDate": "2026-12-20",
    "createdAt": "2026-11-16T01:23:55.702Z",
    "updatedAt": "2026-11-16T01:23:55.707Z"
  }
}
```

## Raporlar

### Tamamlanan Görevler

`GET /reports/completed`

`completed` durumundaki görevlerin sayısını ve listesini döndürür.

**Cevap (200):**

```json
{
  "success": true,
  "data": {
    "count": 2,
    "tasks": [
      {
        "id": 1,
        "title": "Veritabanı şemasını tasarla",
        "description": "Görev ve proje tabloları için şema hazırlanacak",
        "status": "completed",
        "priority": "high",
        "assignee": "musa",
        "project": "TaskFlow",
        "dueDate": "2026-11-10",
        "createdAt": "2026-11-16T01:23:55.623Z",
        "updatedAt": "2026-11-16T01:23:55.623Z"
      },
      "..."
    ]
  }
}
```

### Bekleyen Görevler

`GET /reports/pending`

`pending` durumundaki görevlerin sayısını ve listesini döndürür.

**Cevap (200):**

```json
{
  "success": true,
  "data": {
    "count": 2,
    "tasks": [
      {
        "id": 3,
        "title": "API dokümantasyonu",
        "description": "Tüm endpointler için örnek istek ve cevaplar yazılacak",
        "status": "pending",
        "priority": "medium",
        "assignee": "musa",
        "project": "TaskFlow",
        "dueDate": "2026-11-30",
        "createdAt": "2026-11-16T01:23:55.623Z",
        "updatedAt": "2026-11-16T01:23:55.623Z"
      },
      "..."
    ]
  }
}
```

### Genel Sistem Özeti

`GET /reports/summary`

Toplam görev, durumlara göre sayılar, gecikmiş görevler (bitiş tarihi geçmiş ve tamamlanmamış), tamamlanma oranı (%) ve durum/öncelik/kişi/proje dağılımı.

**Cevap (200):**

```json
{
  "success": true,
  "data": {
    "totalTasks": 5,
    "completedTasks": 2,
    "pendingTasks": 2,
    "inProgressTasks": 1,
    "overdueTasks": 0,
    "completionRate": 40,
    "byStatus": {
      "pending": 2,
      "in-progress": 1,
      "completed": 2
    },
    "byPriority": {
      "low": 1,
      "medium": 2,
      "high": 2
    },
    "byAssignee": {
      "musa": 2,
      "ayse": 2,
      "mehmet": 1
    },
    "byProject": {
      "TaskFlow": 4,
      "Altyapı": 1
    },
    "generatedAt": "2026-11-16T01:23:55.710Z"
  }
}
```

## Hata Cevapları

### Eksik zorunlu alan

`POST /tasks`


**İstek gövdesi:**

```json
{
  "description": "başlıksız görev"
}
```

**Cevap (400):**

```json
{
  "success": false,
  "message": "title alanı zorunludur"
}
```

### Geçersiz değer

`PUT /tasks/:id`


**İstek gövdesi:**

```json
{
  "priority": "acil"
}
```

**Cevap (400):**

```json
{
  "success": false,
  "message": "priority şunlardan biri olmalıdır: low, medium, high"
}
```

### Görev bulunamadı

`GET /tasks/:id`


**Cevap (404):**

```json
{
  "success": false,
  "message": "Görev bulunamadı"
}
```

### Endpoint bulunamadı

`GET /projects`


**Cevap (404):**

```json
{
  "success": false,
  "message": "Endpoint bulunamadı: GET /projects"
}
```

