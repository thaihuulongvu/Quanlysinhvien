# Environment Configuration Guide

## Backend (.env)

```env
PORT=5000
APP_NAME=StudentManagement
DB_HOST=localhost       # Use "postgres" when running in Docker
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=student_db
```

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

> **Note:** Never commit `.env` files to Git. Only commit `.env.example`.
