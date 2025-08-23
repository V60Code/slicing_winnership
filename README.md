# Task Management Application

Aplikasi manajemen tugas (Task Management) full-stack menggunakan Laravel (Backend API) dan React.js (Frontend) dengan autentikasi dan fitur CRUD lengkap.

## 📋 Overview Project

Proyek ini adalah implementasi aplikasi web untuk manajemen tugas yang terdiri dari:

### 🎯 **Backend (Laravel API)**
- REST API dengan Laravel 11+
- Autentikasi menggunakan Laravel Sanctum
- Database SQLite untuk development
- CRUD operations untuk tasks
- CORS configuration untuk frontend

### 🎨 **Frontend (React.js)**
- Single Page Application (SPA) dengan React.js 18+
- Responsive design dengan CSS modern
- State management menggunakan React Context
- Drag & drop functionality untuk tasks
- Dashboard dengan statistik dan kalender view

## 🏗️ Arsitektur Project

```
Task Management Application/
├── backend/                    # Laravel API Server
│   ├── app/
│   │   ├── Http/Controllers/   # API Controllers
│   │   └── Models/            # Eloquent Models
│   ├── database/
│   │   ├── migrations/        # Database Migrations
│   │   └── database.sqlite    # SQLite Database
│   ├── routes/
│   │   ├── api.php           # API Routes
│   │   └── auth.php          # Auth Routes
│   └── config/               # Laravel Configuration
├── frontend/                   # React.js Application
│   ├── src/
│   │   ├── components/       # Reusable Components
│   │   ├── pages/           # Page Components
│   │   ├── contexts/        # React Context
│   │   ├── services/        # API Services
│   │   └── utils/           # Utilities
│   ├── public/              # Static Assets
│   └── package.json         # Dependencies
└── README.md                  # Project Documentation
```

## 🛠️ Teknologi yang Digunakan

### Backend
- **Framework**: Laravel 11+
- **Database**: SQLite (development)
- **Authentication**: Laravel Sanctum
- **API**: RESTful API
- **CORS**: Configured for React frontend

### Frontend
- **Framework**: React.js 18+
- **Styling**: CSS3 dengan Flexbox/Grid
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Create React App

### Development Tools
- **Version Control**: Git
- **Package Manager**: Composer (Backend), npm (Frontend)
- **Development Server**: Laravel Artisan, React Dev Server
- **API Testing**: Postman (optional)

## 🚀 Quick Start

### Prerequisites
Pastikan Anda telah menginstall:
- **PHP** >= 8.1
- **Composer** (untuk Laravel)
- **Node.js** >= 16 (untuk React)
- **npm** atau **yarn**

### 1. Clone Repository
```bash
git clone <repository-url>
cd task-management-app
```

### 2. Setup Backend (Laravel)
```bash
# Masuk ke direktori backend
cd backend

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate

# Jalankan server (Terminal 1)
php artisan serve
# Server berjalan di: http://localhost:8000
```

### 3. Setup Frontend (React)
```bash
# Buka terminal baru dan masuk ke direktori frontend
cd frontend

# Install dependencies
npm install

# Setup environment (opsional)
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Jalankan development server (Terminal 2)
npm start
# Aplikasi berjalan di: http://localhost:3000
```

### 4. Akses Aplikasi
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Backend Docs**: Lihat file `backend/README.md`

### 5. Login Testing
Untuk testing aplikasi, gunakan akun default berikut:
- **Email**: admin@wesclic.com
- **Password**: 123456789

*Catatan: Pastikan sudah menjalankan `php artisan db:seed` untuk membuat akun testing.*

## 📚 Fitur Aplikasi

### 🔐 Autentikasi
- **Register**: Pendaftaran pengguna baru
- **Login**: Masuk dengan email dan password
- **Logout**: Keluar dari aplikasi
- **Protected Routes**: Halaman yang memerlukan login
- **Token Management**: JWT token dengan Laravel Sanctum

### ✅ Manajemen Tasks
- **Create Task**: Buat task baru dengan title, description, priority, due date
- **Read Tasks**: Lihat daftar semua tasks milik user
- **Update Task**: Edit informasi task
- **Delete Task**: Hapus task
- **Status Management**: Todo, In Progress, Completed
- **Priority System**: Low, Medium, High
- **Drag & Drop**: Ubah status dengan drag and drop

### 📊 Dashboard
- **Statistics**: Overview jumlah tasks berdasarkan status
- **Recent Tasks**: Daftar tasks terbaru
- **Progress Tracking**: Visual progress tasks
- **Quick Actions**: Akses cepat ke fitur utama

### 📅 Additional Features
- **Calendar View**: Lihat tasks dalam format kalender
- **Search & Filter**: Cari dan filter tasks
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Real-time Updates**: Sinkronisasi data real-time

## 🔧 Konfigurasi

### Backend Configuration
```env
# .env file di direktori backend
APP_NAME="Task Management API"
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend Configuration
```env
# .env file di direktori frontend
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME="Task Management"
```

## 📖 API Documentation

### Authentication Endpoints
```http
# Register
POST /api/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

# Login
POST /api/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}

# Logout
POST /api/logout
Authorization: Bearer {token}
```

### Tasks CRUD Endpoints
```http
# Get All Tasks
GET /api/tasks
Authorization: Bearer {token}

# Create Task
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json
{
  "title": "New Task",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "due_date": "2024-12-25"
}

# Update Task
PUT /api/tasks/{id}
Authorization: Bearer {token}

# Delete Task
DELETE /api/tasks/{id}
Authorization: Bearer {token}
```

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Run Laravel tests
php artisan test

# Test specific feature
php artisan test --filter=TaskTest
```

### Frontend Testing
```bash
cd frontend

# Run React tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Manual Testing
1. **Authentication Flow**:
   - Register dengan data valid
   - Login dengan kredensial yang benar
   - Test protected routes
   - Logout dan redirect

2. **Task Management**:
   - Create task baru
   - Edit task existing
   - Delete task
   - Drag & drop status change
   - Filter dan search

3. **API Testing dengan Postman**:
   - Import collection dari `api.md`
   - Test semua endpoints
   - Verify response format

## 🏗️ Build dan Deployment

### Backend Deployment
```bash
cd backend

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set production environment
# Edit .env: APP_ENV=production, APP_DEBUG=false
```

### Frontend Deployment
```bash
cd frontend

# Build for production
npm run build

# Deploy build folder ke hosting
# (Netlify, Vercel, Apache, Nginx, dll)
```

### Production Checklist
- [ ] Backend: Set `APP_ENV=production` dan `APP_DEBUG=false`
- [ ] Backend: Configure production database (MySQL/PostgreSQL)
- [ ] Backend: Set proper CORS domains
- [ ] Frontend: Update `REACT_APP_API_URL` ke production URL
- [ ] Frontend: Build dan deploy static files
- [ ] Security: HTTPS untuk production
- [ ] Database: Run migrations di production

## 🔍 Troubleshooting

### Common Issues

#### CORS Errors
```bash
# Backend: Check config/cors.php
# Pastikan frontend domain ada di allowed_origins
# Restart backend server setelah perubahan config
```

#### Database Issues
```bash
# Reset database
cd backend
php artisan migrate:fresh

# Check database connection
php artisan tinker
>>> DB::connection()->getPdo();
```

#### Frontend API Connection
```bash
# Check .env file
# Pastikan REACT_APP_API_URL benar
# Restart frontend server setelah mengubah .env
```

#### Authentication Issues
```bash
# Clear browser localStorage
localStorage.clear()

# Check token expiration
# Login ulang jika token expired
```

## 📁 Struktur Database

### Users Table
```sql
id (Primary Key)
name (String)
email (String, Unique)
email_verified_at (Timestamp)
password (String)
remember_token (String)
created_at (Timestamp)
updated_at (Timestamp)
```

### Tasks Table
```sql
id (Primary Key)
title (String)
description (Text)
status (Enum: todo, in_progress, completed)
priority (Enum: low, medium, high)
due_date (Date)
user_id (Foreign Key -> users.id)
created_at (Timestamp)
updated_at (Timestamp)
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Development Guidelines
- Follow PSR-12 untuk PHP code (Backend)
- Follow React best practices (Frontend)
- Write tests untuk fitur baru
- Update documentation jika diperlukan
- Gunakan conventional commits

## 📄 License

Proyek ini menggunakan [MIT License](https://opensource.org/licenses/MIT).

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan:

1. **Check Documentation**:
   - `backend/README.md` untuk backend-specific issues
   - `frontend/README.md` untuk frontend-specific issues

2. **Common Solutions**:
   - Restart development servers
   - Clear cache (browser, Laravel, npm)
   - Check environment variables
   - Verify database connection

3. **Debug Steps**:
   - Check browser console untuk frontend errors
   - Check Laravel logs di `backend/storage/logs/`
   - Verify API responses dengan Postman
   - Test backend endpoints secara terpisah

---

**Dibuat untuk keperluan pembelajaran kolaborasi Frontend (React) dan Backend (Laravel)**

### 📋 Project Status
- ✅ Backend API (Laravel) - Fully Functional
- ✅ Frontend App (React) - Fully Functional  
- ✅ Authentication System - Implemented
- ✅ CRUD Operations - Complete
- ✅ Database Migrations - Ready
- ✅ API Documentation - Available
- ✅ Responsive Design - Implemented
- ✅ Development Ready - Both servers can run simultaneously

**Ready for Development and Testing! 🚀**