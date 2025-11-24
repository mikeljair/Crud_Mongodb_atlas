# CRUD MongoDB Atlas

Aplicación full-stack con autenticación JWT y Google OAuth.

## Instalación

### Backend
```bash
cd backend
npm install
```

Crear `.env`:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/dbname
JWT_SECRET=tu_secreto_aqui
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
FRONTEND_URL=http://localhost:3000
PORT=5000
```

Ejecutar:
```bash
npm start
```

### Frontend
```bash
cd frontend
npm install
```

Crear `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

Ejecutar:
```bash
npm start
```

## Configuración MongoDB Atlas

1. Crear cuenta en https://cloud.mongodb.com
2. Crear cluster gratuito
3. Database Access → Add User
4. Network Access → Add IP: 0.0.0.0/0
5. Database → Connect → Copiar URI

## Configuración Google OAuth (Opcional)

1. https://console.cloud.google.com
2. Crear proyecto → Credenciales → OAuth 2.0
3. Orígenes: http://localhost:3000, http://localhost:5000
4. Redirección: http://localhost:5000/auth/google/callback
5. Copiar Client ID y Secret

## Despliegue

### Backend (Render)
1. Push a GitHub
2. render.com → New Web Service
3. Root: `backend`
4. Build: `npm install`
5. Start: `npm start`
6. Agregar variables de entorno

### Frontend (Vercel)
1. vercel.com → Import Project
2. Root: `frontend`
3. Variable: `REACT_APP_API_URL=https://tu-backend.onrender.com`
4. Deploy

Actualizar Google OAuth con URLs de producción.
