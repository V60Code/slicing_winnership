# Task Management Frontend - React Application

Aplikasi frontend untuk Task Management menggunakan React.js dengan autentikasi dan manajemen state modern.

## 📋 Deskripsi Proyek

Proyek ini adalah aplikasi web frontend untuk manajemen tugas (task management) yang menyediakan:
- Interface pengguna yang responsif dan modern
- Autentikasi pengguna (login/register/logout)
- CRUD operations untuk tasks dengan drag & drop
- Dashboard dengan statistik tasks
- Kalender view untuk tasks
- Sistem prioritas dan status untuk tasks
- State management dengan React Context

## 🛠️ Teknologi yang Digunakan

- **Framework**: React.js 18+
- **Styling**: CSS3 dengan Flexbox/Grid
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Authentication**: JWT Token dengan localStorage
- **Build Tool**: Create React App

## 📁 Struktur Proyek

```
frontend/
├── public/
│   ├── index.html          # HTML template
│   ├── favicon.ico         # App icon
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Komponen reusable
│   │   ├── Header.js       # Header dengan navigasi
│   │   ├── ProtectedRoute.js # Route protection
│   │   └── PublicRoute.js  # Public route wrapper
│   ├── contexts/
│   │   └── AuthContext.js  # Context untuk autentikasi
│   ├── hooks/
│   │   └── useAuth.js      # Custom hook untuk auth
│   ├── pages/
│   │   ├── LoginPage.js    # Halaman login
│   │   ├── DashboardPage.js # Dashboard utama
│   │   ├── TasksPage.js    # Halaman manajemen tasks
│   │   ├── CalendarPage.js # Kalender view
│   │   ├── TagsPage.js     # Manajemen tags
│   │   └── SharedPage.js   # Shared tasks
│   ├── services/
│   │   ├── taskService.js  # API calls untuk tasks
│   │   └── authService.js  # API calls untuk auth
│   ├── utils/
│   │   └── api.js          # Axios configuration
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   └── index.js            # Entry point
├── package.json            # Dependencies
└── README.md              # Dokumentasi
```

## 🚀 Instalasi dan Setup

### 1. Prerequisites
Pastikan Anda telah menginstall:
- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Backend API sudah berjalan di `http://localhost:8000`

### 2. Clone Repository
```bash
cd frontend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Setup
Buat file `.env` di root folder frontend:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME="Task Management"
```

### 5. Jalankan Development Server
```bash
npm start
# atau
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

## 🎯 Fitur Aplikasi

### 🔐 Autentikasi
- **Login**: Masuk dengan email dan password
- **Register**: Daftar akun baru
- **Logout**: Keluar dari aplikasi
- **Protected Routes**: Halaman yang memerlukan autentikasi
- **Token Management**: Otomatis refresh dan validasi token

### 📊 Dashboard
- **Statistik Tasks**: Overview jumlah tasks berdasarkan status
- **Recent Tasks**: Daftar tasks terbaru
- **Quick Actions**: Akses cepat ke fitur utama
- **Progress Tracking**: Visual progress tasks

### ✅ Manajemen Tasks
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Drag & Drop**: Ubah status tasks dengan drag and drop
- **Filter & Search**: Cari dan filter tasks
- **Priority System**: Low, Medium, High priority
- **Status Tracking**: Todo, In Progress, Completed
- **Due Date**: Set tanggal deadline

### 📅 Kalender View
- **Calendar Interface**: Lihat tasks dalam format kalender
- **Date Navigation**: Navigasi antar bulan/tahun
- **Task Details**: Quick view task details

### 🏷️ Tags & Categories
- **Tag Management**: Buat dan kelola tags
- **Categorization**: Kategorisasi tasks
- **Color Coding**: Visual coding dengan warna

## 🔧 Konfigurasi

### Environment Variables
```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api

# App Configuration
REACT_APP_APP_NAME="Task Management"
REACT_APP_VERSION=1.0.0

# Feature Flags (optional)
REACT_APP_ENABLE_CALENDAR=true
REACT_APP_ENABLE_TAGS=true
```

### API Configuration
File `src/utils/api.js` mengkonfigurasi:
- Base URL untuk API calls
- Request/Response interceptors
- Error handling
- Token attachment otomatis

## 📱 Responsive Design

Aplikasi didesain responsif untuk berbagai ukuran layar:
- **Desktop**: Layout penuh dengan sidebar
- **Tablet**: Layout adaptif dengan collapsible sidebar
- **Mobile**: Layout mobile-first dengan bottom navigation

## 🧪 Testing

### Menjalankan Tests
```bash
# Unit tests
npm test

# Test coverage
npm test -- --coverage

# Test watch mode
npm test -- --watch
```

### Manual Testing
1. **Authentication Flow**:
   - Test register dengan data valid/invalid
   - Test login dengan kredensial benar/salah
   - Test logout dan redirect

2. **Task Management**:
   - Create task baru
   - Edit task existing
   - Delete task
   - Drag & drop status change

3. **Navigation**:
   - Test semua route navigation
   - Test protected route access
   - Test responsive behavior

## 🏗️ Build dan Deployment

### Production Build
```bash
npm run build
```

Hasil build akan tersimpan di folder `build/` yang siap untuk deployment.

### Deployment Options
1. **Static Hosting**: Netlify, Vercel, GitHub Pages
2. **Server Deployment**: Apache, Nginx
3. **Cloud Platforms**: AWS S3, Google Cloud Storage

### Build Optimization
- Code splitting otomatis
- Asset optimization
- Bundle size analysis dengan `npm run build -- --analyze`

## 🔍 Troubleshooting

### Common Issues

#### CORS Errors
```bash
# Pastikan backend CORS sudah dikonfigurasi untuk localhost:3000
# Check backend config/cors.php
```

#### API Connection Issues
```bash
# Pastikan backend berjalan di port 8000
# Check REACT_APP_API_URL di .env
# Restart development server setelah mengubah .env
```

#### Authentication Issues
```bash
# Clear localStorage
localStorage.clear()

# Check token expiration
# Login ulang jika token expired
```

#### Build Issues
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm start -- --reset-cache
```

## 🎨 Customization

### Styling
- **CSS Variables**: Gunakan CSS custom properties untuk theming
- **Component Styles**: Setiap komponen memiliki CSS module terpisah
- **Responsive Breakpoints**: Defined di `App.css`

### Adding New Features
1. **New Page**: Buat komponen di `src/pages/`
2. **New Route**: Tambahkan route di `App.js`
3. **New Service**: Buat service di `src/services/`
4. **New Component**: Buat komponen reusable di `src/components/`

## 📚 API Integration

### Authentication Endpoints
```javascript
// Login
POST /api/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Register
POST /api/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

// Logout
POST /api/logout
Headers: { Authorization: "Bearer {token}" }
```

### Tasks Endpoints
```javascript
// Get all tasks
GET /api/tasks
Headers: { Authorization: "Bearer {token}" }

// Create task
POST /api/tasks
Headers: { Authorization: "Bearer {token}" }
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "todo",
  "priority": "medium",
  "due_date": "2024-12-25"
}

// Update task
PUT /api/tasks/{id}
Headers: { Authorization: "Bearer {token}" }

// Delete task
DELETE /api/tasks/{id}
Headers: { Authorization: "Bearer {token}" }
```

## 🔒 Security

### Best Practices Implemented
- **Token Storage**: JWT tokens disimpan di localStorage
- **Route Protection**: Protected routes dengan authentication check
- **Input Validation**: Client-side validation untuk form inputs
- **XSS Prevention**: Sanitization untuk user inputs
- **HTTPS Ready**: Siap untuk deployment dengan HTTPS

## 📈 Performance

### Optimization Techniques
- **Code Splitting**: Lazy loading untuk routes
- **Memoization**: React.memo untuk komponen yang tidak sering berubah
- **Debouncing**: Search input dengan debounce
- **Image Optimization**: Optimized assets
- **Bundle Analysis**: Regular bundle size monitoring

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Code Style
- Gunakan ESLint configuration yang sudah ada
- Follow React best practices
- Gunakan functional components dengan hooks
- Konsisten dengan naming conventions

## 📄 License

Proyek ini menggunakan [MIT License](https://opensource.org/licenses/MIT).

---

**Dibuat untuk keperluan pembelajaran kolaborasi Frontend (React) dan Backend (Laravel)**

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan:
1. Check troubleshooting section di atas
2. Review backend API documentation
3. Check browser console untuk error messages
4. Pastikan backend server berjalan dengan baik
