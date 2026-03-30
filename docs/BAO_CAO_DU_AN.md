# BÁO CÁO ĐỀ TÀI: HỆ THỐNG QUẢN LÝ SINH VIÊN (Fullstack Docker)

---

## PHẦN A: THÔNG TIN CHUNG

### 1. Thông tin sinh viên
- **Họ và tên**: Thái Hữu Long Vũ
- **Mã số sinh viên (MSSV)**: SV006
- **Lớp**: CNTT01
- **Môn học**: Chuyên đề Công nghệ mới

### 2. Giới thiệu ứng dụng
- **Mục đích**: Xây dựng một ứng dụng web quản lý sinh viên hoàn chỉnh, áp dụng các công nghệ hiện đại như Node.js (API), React (Frontend) và PostgreSQL (Database), đồng thời triển khai toàn diện bằng Docker Compose để đảm bảo tính nhất quán trên mọi môi trường.
- **Người dùng**: Giảng viên, Quản trị viên hệ thống đào tạo.
- **Phạm vi**: Ứng dụng chạy nội bộ (Local) thông qua Docker, hỗ trợ các chức năng quản lý cơ bản và trang giới thiệu bản thân lấy dữ liệu động từ Database.

### 3. Tính năng chính
- **Quản lý danh sách sinh viên**: Xem, thêm mới, chỉnh sửa và xóa thông tin sinh viên (CRUD).
- **Trang Giới thiệu (About)**: Hiển thị thông tin cá nhân của sinh viên thực hiện đề tài bằng cách gọi API và lấy dữ liệu trực tiếp từ Database.
- **Kiểm tra trạng thái (Health Check)**: Cung cấp endpoint để giám sát tình trạng hoạt động của Server.
- **Đóng gói Docker**: Chạy toàn bộ hệ thống (FE, BE, DB) chỉ với một lệnh duy nhất.

### 4. Use Cases
- **Xem thông tin cá nhân**: Người dùng truy cập trang About để xem thông tin chính chủ (dữ liệu động).
- **Quản lý hồ sơ**: Người dùng (Admin) thêm mới một sinh viên khi có nhập học, hoặc cập nhật thông tin email/lớp khi có thay đổi.
- **Giám sát hệ thống**: Kỹ thuật viên truy cập `/health` để kiểm tra kết nối giữa Server và Database.

---

## PHẦN B: MINH CHỨNG SẢN PHẨM

### 1. Đường dẫn liên kết
- **Repository GitHub**: [https://github.com/thaihuulongvu/Quanlysinhvien](https://github.com/thaihuulongvu/Quanlysinhvien)
- **Docker Hub**: 
  - Link image backend: [https://hub.docker.com/r/thaihuulongvu/student-backend](https://hub.docker.com/r/thaihuulongvu/student-backend)
  - Link image frontend: [https://hub.docker.com/r/thaihuulongvu/student-frontend](https://hub.docker.com/r/thaihuulongvu/student-frontend)

### 2. Ảnh chụp minh chứng (Screenshots)

#### 2.1. Ảnh VSCode thể hiện lịch sử commit (Git Graph/Log)
> *[Chèn ảnh chụp màn hình terminal `git log --graph --oneline --all` hoặc giao diện Git Graph tại đây]*

#### 2.2. Ảnh GitHub hiển thị danh sách các Branch (Main, Develop, Feature/Students)
> *[Chèn ảnh danh sách Branch trên trình duyệt tại github.com]*

#### 2.3. Ảnh Docker Desktop đã cài đặt và đang chạy 3 Containers
> *[Chèn ảnh Docker Desktop hiển thị 3 container postgres, backend, frontend đang xanh lục]*

#### 2.4. Ảnh Giao diện trang /about (Dữ liệu động)
> *[Chèn ảnh trình duyệt mở localhost:3000/about hiển thị tên Thái Hữu Long Vũ]*

#### 2.5. Ảnh Endpoint /health hoạt động
> *[Chèn ảnh trình duyệt mở localhost:5000/health hiển thị {"status":"ok"}]*

---

## PHẦN C: CHECKLIST ĐỐI CHIẾU

| STT | Tiêu chí yêu cầu | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :--- |
| 1 | Có Commit history | ✅ Hoàn thành | 7+ commits rõ ràng |
| 2 | Có BE + FE + DB | ✅ Hoàn thành | Nodejs, React, PostgreSQL |
| 3 | Có /about (thông tin sinh viên) | ✅ Hoàn thành | Dữ liệu động từ Database |
| 4 | Có /health | ✅ Hoàn thành | API Endpoint hoạt động tốt |
| 5 | Có .env và .env.example | ✅ Hoàn thành | Đầy đủ cho cả FE và BE |
| 6 | Có Dockerfile | ✅ Hoàn thành | Multi-stage cho FE, Alpine cho BE |
| 7 | Có Docker-compose | ✅ Hoàn thành | Quản lý 3 dịch vụ đồng bộ |
| 8 | Push Docker Hub | ⏳ Đang thực hiện | Sẽ hoàn tất khi build image cuối |

---
*Người thực hiện: Thái Hữu Long Vũ*
