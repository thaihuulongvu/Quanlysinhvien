# 🎓 Student Management System

Hệ thống quản lý sinh viên được xây dựng với **Node.js + Express**, **React**, và **PostgreSQL**. Triển khai hoàn chỉnh bằng **Docker Compose**.

## 🛠 Tech Stack

| Layer    | Technology              |
|----------|------------------------|
| Backend  | Node.js + Express       |
| Frontend | React + Vite            |
| Database | PostgreSQL 15           |
| Deploy   | Docker + Docker Compose |

## 🚀 Chạy với Docker Compose (Khuyến nghị)

```bash
# Clone repo
git clone <your-repo-url>
cd student-management

# Chạy toàn bộ hệ thống (1 lệnh)
docker compose up --build -d
```

Sau khi chạy:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health check**: http://localhost:5000/health

## 🖥 Chạy Local (Development)

### Yêu cầu
- Node.js >= 18
- PostgreSQL đang chạy

### Backend
```bash
cd backend
cp .env.example .env
# Chỉnh sửa .env với thông tin DB của bạn
npm install
npm start
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint         | Mô tả                |
|--------|------------------|----------------------|
| GET    | /health          | Kiểm tra server      |
| GET    | /students        | Lấy danh sách SV     |
| POST   | /students        | Thêm sinh viên mới   |
| PUT    | /students/:id    | Cập nhật sinh viên   |
| DELETE | /students/:id    | Xóa sinh viên        |

## 🗂 Cấu trúc Project

```
student-management/
├── backend/
│   ├── index.js          # Express server + API routes
│   ├── db.js             # PostgreSQL connection
│   ├── initDB.js         # Schema + seed data
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx
│   │   │   └── StudentsPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 📦 Docker Hub

- Backend: `<your-dockerhub>/student-backend`
- Frontend: `<your-dockerhub>/student-frontend`

## 👤 Thông tin sinh viên

- **Họ tên**: Nguyễn Văn A
- **MSSV**: SV001
- **Lớp**: CNTT01
