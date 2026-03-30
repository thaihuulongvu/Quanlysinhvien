import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const EMPTY_FORM = { student_code: '', full_name: '', class_name: '', email: '' }

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  // ── Fetch students ──────────────────────────────────────────────────────────
  async function fetchStudents() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/students`)
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setStudents(data)
    } catch {
      setError('Không thể tải dữ liệu sinh viên. Hãy đảm bảo backend đang chạy.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStudents() }, [])

  // ── Open modal ──────────────────────────────────────────────────────────────
  function openAdd() {
    setEditStudent(null)
    setForm(EMPTY_FORM)
    setError('')
    setShowModal(true)
  }

  function openEdit(s) {
    setEditStudent(s)
    setForm({ student_code: s.student_code, full_name: s.full_name, class_name: s.class_name, email: s.email })
    setError('')
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditStudent(null)
    setForm(EMPTY_FORM)
    setError('')
  }

  // ── Submit form ─────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.student_code || !form.full_name || !form.class_name || !form.email) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const url = editStudent ? `${API}/students/${editStudent.id}` : `${API}/students`
      const method = editStudent ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Lỗi server'); return }
      setSuccess(editStudent ? 'Cập nhật sinh viên thành công!' : 'Thêm sinh viên thành công!')
      closeModal()
      fetchStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Không thể kết nối tới server')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  async function handleDelete(id, name) {
    if (!confirm(`Xóa sinh viên "${name}"?`)) return
    try {
      const res = await fetch(`${API}/students/${id}`, { method: 'DELETE' })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Lỗi khi xóa'); return }
      setSuccess('Đã xóa sinh viên!')
      fetchStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Không thể kết nối tới server')
    }
  }

  // ── Stats ───────────────────────────────────────────────────────────────────
  const classes = [...new Set(students.map(s => s.class_name))]

  return (
    <main className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>📋 Danh sách Sinh Viên</h1>
          <button className="btn btn-primary" onClick={openAdd}>+ Thêm sinh viên</button>
        </div>

        {/* Alerts */}
        {error && !showModal && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">✓ {success}</div>}

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num">{students.length}</div>
            <div className="stat-label">Tổng sinh viên</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{classes.length}</div>
            <div className="stat-label">Số lớp</div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Đang tải dữ liệu...</span>
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🎓</div>
            <p>Chưa có sinh viên nào. Hãy thêm sinh viên đầu tiên!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã SV</th>
                  <th>Họ và tên</th>
                  <th>Lớp</th>
                  <th>Email</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr key={s.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{idx + 1}</td>
                    <td><span className="student-code">{s.student_code}</span></td>
                    <td style={{ fontWeight: 500 }}>{s.full_name}</td>
                    <td>{s.class_name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{s.email}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(s.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-warning btn-sm" onClick={() => openEdit(s)}>✏️ Sửa</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id, s.full_name)}>🗑️ Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editStudent ? '✏️ Sửa sinh viên' : '➕ Thêm sinh viên mới'}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mã sinh viên</label>
                <input
                  placeholder="VD: SV006"
                  value={form.student_code}
                  onChange={e => setForm(f => ({ ...f, student_code: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  placeholder="VD: Nguyễn Văn B"
                  value={form.full_name}
                  onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Lớp</label>
                <input
                  placeholder="VD: CNTT01"
                  value={form.class_name}
                  onChange={e => setForm(f => ({ ...f, class_name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="VD: b.nguyen@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Đang lưu...' : (editStudent ? 'Cập nhật' : 'Thêm mới')}
                </button>
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
