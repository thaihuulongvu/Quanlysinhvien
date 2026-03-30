export default function AboutPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="about-hero">
          <div className="about-avatar">👤</div>
          <h1>Nguyễn Văn A</h1>
          <p>Sinh viên Công nghệ Thông tin</p>
          <div style={{ marginTop: '12px' }}>
            <span className="badge">CNTT01</span>
            <span className="badge">K2022</span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="label">Mã số sinh viên</div>
            <div className="value">SV001</div>
          </div>
          <div className="info-card">
            <div className="label">Họ và tên</div>
            <div className="value">Nguyễn Văn A</div>
          </div>
          <div className="info-card">
            <div className="label">Lớp</div>
            <div className="value">CNTT01</div>
          </div>
          <div className="info-card">
            <div className="label">Email</div>
            <div className="value" style={{ fontSize: '0.85rem' }}>a.nguyen@email.com</div>
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
            Triển khai đầy đủ với <strong style={{ color: 'var(--primary-light)' }}>Docker Compose</strong>.
          </p>
        </div>
      </div>
    </main>
  )
}
