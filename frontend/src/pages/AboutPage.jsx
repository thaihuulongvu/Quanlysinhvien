import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const MY_CODE = 'SV006' // Mã sinh viên của bạn trong database

export default function AboutPage() {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMyInfo() {
      try {
        const res = await fetch(`${API}/students/code/${MY_CODE}`)
        if (!res.ok) throw new Error('Không tìm thấy thông tin sinh viên')
        const data = await res.json()
        setStudent(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMyInfo()
  }, [])

  if (loading) return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="spinner"></div>
    </div>
  )

  if (error || !student) return (
    <div className="page container">
      <div className="alert alert-error">Lỗi: {error || 'Thông tin sinh viên chưa có trong database'}</div>
      <p style={{ textAlign: 'center' }}>Vui lòng thêm sinh viên có mã <strong>{MY_CODE}</strong> vào danh sách trước.</p>
    </div>
  )

  return (
    <main className="page">
      <div className="container">
        <div className="about-hero">
          <div className="about-avatar">👤</div>
          <h1>{student.full_name}</h1>
          <p>Sinh viên Công nghệ Thông tin</p>
          <div style={{ marginTop: '12px' }}>
            <span className="badge">{student.class_name}</span>
            <span className="badge">K2022</span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="label">Mã số sinh viên</div>
            <div className="value">{student.student_code}</div>
          </div>
          <div className="info-card">
            <div className="label">Họ và tên</div>
            <div className="value">{student.full_name}</div>
          </div>
          <div className="info-card">
            <div className="label">Lớp</div>
            <div className="value">{student.class_name}</div>
          </div>
          <div className="info-card">
            <div className="label">Email</div>
            <div className="value" style={{ fontSize: '0.85rem' }}>{student.email}</div>
          </div>
          <div className="info-card">
            <div className="label">Khoa</div>
            <div className="value">Công nghệ Thông tin</div>
          </div>
          <div className="info-card">
            <div className="label">Năm học</div>
            <div className="value">2022 - 2026</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '32px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Về hệ thống</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Hệ thống quản lý sinh viên được xây dựng với <strong style={{ color: 'var(--primary-light)' }}>Node.js + Express</strong> (backend),{' '}
            <strong style={{ color: 'var(--primary-light)' }}>React</strong> (frontend), và{' '}
            <strong style={{ color: 'var(--primary-light)' }}>PostgreSQL</strong> (database).
            Dữ liệu này được gọi trực tiếp bằng <strong style={{ color: 'var(--primary-light)' }}>API</strong> từ database.
          </p>
        </div>
      </div>
    </main>
  )
}
