const { writeTasks } = require('./fileDb');

const now = new Date().toISOString();

const tasks = [
  { id: 1, title: 'Veritabanı şemasını tasarla', description: 'Görev ve proje tabloları için şema hazırlanacak', status: 'completed', priority: 'high', assignee: 'musa', project: 'TaskFlow', dueDate: '2026-11-10', createdAt: now, updatedAt: now },
  { id: 2, title: 'Login ekranı backend', description: 'Kimlik doğrulama endpointleri yazılacak', status: 'in-progress', priority: 'high', assignee: 'ayse', project: 'TaskFlow', dueDate: '2026-11-25', createdAt: now, updatedAt: now },
  { id: 3, title: 'API dokümantasyonu', description: 'Tüm endpointler için örnek istek ve cevaplar yazılacak', status: 'pending', priority: 'medium', assignee: 'musa', project: 'TaskFlow', dueDate: '2026-11-30', createdAt: now, updatedAt: now },
  { id: 4, title: 'Postman testleri', description: 'CRUD endpointleri Postman ile test edilecek', status: 'pending', priority: 'low', assignee: 'mehmet', project: 'TaskFlow', dueDate: '2026-12-05', createdAt: now, updatedAt: now },
  { id: 5, title: 'Sunucu kurulumu', description: 'Express sunucusu ve klasör yapısı oluşturulacak', status: 'completed', priority: 'medium', assignee: 'ayse', project: 'Altyapı', dueDate: '2026-11-05', createdAt: now, updatedAt: now }
];

writeTasks(tasks);
console.log(`${tasks.length} örnek görev yüklendi.`);
