# Task Management API - Laravel Backend

Backend API untuk aplikasi Task Management menggunakan Laravel 11+ dengan autentikasi Laravel Sanctum.

## 📋 Deskripsi Proyek

Proyek ini adalah REST API untuk aplikasi manajemen tugas (task management) yang menyediakan:
- Autentikasi pengguna dengan Laravel Sanctum
- CRUD operations untuk tasks
- Sistem prioritas dan status untuk tasks
- Database SQLite untuk development

## 🛠️ Teknologi yang Digunakan

- **Framework**: Laravel 11+
- **Database**: SQLite (development)
- **Authentication**: Laravel Sanctum
- **API**: RESTful API
- **CORS**: Dikonfigurasi untuk frontend React

## 📁 Struktur Proyek

```
backend/
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/           # Controllers untuk autentikasi
│   │   └── TaskController.php  # Controller untuk CRUD tasks
│   └── Models/
│       ├── Task.php        # Model Task
│       └── User.php        # Model User
├── database/
│   ├── migrations/         # File migrasi database
│   └── database.sqlite     # Database SQLite
├── routes/
│   ├── api.php            # Route API
│   └── auth.php           # Route autentikasi
└── config/
    ├── cors.php           # Konfigurasi CORS
    └── sanctum.php        # Konfigurasi Sanctum
```

## 🚀 Instalasi dan Setup

### 1. Clone Repository
```bash
cd backend
```

### 2. Install Dependencies
```bash
composer install
```

### 3. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Database Setup
```bash
# Jalankan migrasi
php artisan migrate

# (Opsional) Jalankan seeder jika ada
php artisan db:seed
```

### 5. Jalankan Server
```bash
php artisan serve
```

Server akan berjalan di: `http://localhost:8000`

## 🔐 Autentikasi

Proyek ini menggunakan **Laravel Sanctum** untuk autentikasi API.

### Register
```http
POST /api/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

### Login
```http
POST /api/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

### Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

## 📚 API Endpoints

### Tasks CRUD

Semua endpoint tasks memerlukan autentikasi (Bearer Token).

#### 1. Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}
```

**Response:**
```json
{
    "data": [
        {
            "id": 1,
            "title": "Task Title",
            "description": "Task Description",
            "status": "todo",
            "priority": "medium",
            "due_date": "2024-12-25",
            "user_id": 1,
            "created_at": "2024-12-21T10:00:00.000000Z",
            "updated_at": "2024-12-21T10:00:00.000000Z"
        }
    ]
}
```

#### 2. Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "New Task",
    "description": "Task description",
    "status": "todo",
    "priority": "high",
    "due_date": "2024-12-25"
}
```

#### 3. Get Single Task
```http
GET /api/tasks/{id}
Authorization: Bearer {token}
```

#### 4. Update Task
```http
PUT /api/tasks/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "Updated Task",
    "description": "Updated description",
    "status": "in_progress",
    "priority": "low",
    "due_date": "2024-12-30"
}
```

#### 5. Delete Task
```http
DELETE /api/tasks/{id}
Authorization: Bearer {token}
```

## 📊 Data Models

### Task Model
```php
// Atribut yang dapat diisi
$fillable = [
    'title',
    'description', 
    'status',
    'priority',
    'due_date',
    'user_id'
];

// Status yang valid
status: 'todo' | 'in_progress' | 'completed'

// Priority yang valid  
priority: 'low' | 'medium' | 'high'
```

### User Model
```php
// Relasi dengan Task
public function tasks()
{
    return $this->hasMany(Task::class);
}
```

## 🔧 Konfigurasi

### Environment Variables (.env)
```env
APP_NAME="Task Management API"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### CORS Configuration
CORS sudah dikonfigurasi untuk menerima request dari frontend React (`localhost:3000`).

## 🧪 Testing

### Menjalankan Tests
```bash
php artisan test
```

### Testing dengan Postman
1. Import collection dari file `api.md` (jika tersedia)
2. Set environment variable untuk base URL: `http://localhost:8000`
3. Test endpoint autentikasi terlebih dahulu
4. Gunakan token yang didapat untuk test endpoint tasks

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
php artisan migrate:fresh

# Cek status migrasi
php artisan migrate:status
```

### Permission Issues
```bash
# Fix storage permissions (Linux/Mac)
chmod -R 775 storage bootstrap/cache

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### CORS Issues
Jika mengalami CORS error:
1. Pastikan `SANCTUM_STATEFUL_DOMAINS` di `.env` sudah benar
2. Restart server setelah mengubah konfigurasi
3. Cek konfigurasi di `config/cors.php`

## 📝 Development Notes

- Database menggunakan SQLite untuk kemudahan development
- Semua endpoint tasks dilindungi dengan middleware `auth:sanctum`
- User hanya bisa mengakses tasks milik mereka sendiri
- Validasi input dilakukan di level controller
- Response API menggunakan format JSON standar

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Proyek ini menggunakan [MIT License](https://opensource.org/licenses/MIT).

---

**Dibuat untuk keperluan pembelajaran kolaborasi Frontend (React) dan Backend (Laravel)**
