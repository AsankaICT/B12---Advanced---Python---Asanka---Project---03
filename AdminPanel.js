import React, { useState } from 'react';

const GRADES = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6',
                 'Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'];

export default function AdminPanel({ students, onAdd, onRemove, onReset, showToast }) {
  const [form, setForm] = useState({ fname: '', lname: '', grade: '', email: '' });

  function handleAdd() {
    if (!form.fname || !form.lname || !form.grade) {
      showToast('⚠️ Please fill Name and Grade', true);
      return;
    }
    onAdd({ fname: form.fname, lname: form.lname, grade: form.grade, email: form.email });
    setForm({ fname: '', lname: '', grade: '', email: '' });
    showToast(`✅ ${form.fname} ${form.lname} registered!`);
  }

  const present = students.filter(s => s.status === 'in').length;
  const absent  = students.filter(s => s.status === 'absent').length;

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">⚙️ Admin Panel</div>
          <div className="page-sub">Manage students and system settings</div>
        </div>
      </div>

      <div className="admin-grid">
        {/* Register */}
        <div className="admin-card">
          <h3>➕ Register New Student</h3>
          {[
            { label: 'First Name', key: 'fname', placeholder: 'e.g. John' },
            { label: 'Last Name',  key: 'lname', placeholder: 'e.g. Smith' },
          ].map(f => (
            <div className="form-row" key={f.key}>
              <label>{f.label}</label>
              <input type="text" placeholder={f.placeholder} value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          ))}
          <div className="form-row">
            <label>Grade / Class</label>
            <select value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })}>
              <option value="">Select grade</option>
              {GRADES.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Guardian Email</label>
            <input type="text" placeholder="parent@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <button className="btn-primary" onClick={handleAdd}>✅ Register Student</button>
        </div>

        {/* Student List */}
        <div className="admin-card">
          <h3>👥 Manage Students <span style={{ fontSize: 12, color: '#38bdf8' }}>({students.length})</span></h3>
          <div className="student-list-admin">
            {students.length === 0
              ? <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>No students registered</div>
              : students.map(s => (
                <div className="student-item" key={s.id}>
                  <div>
                    <div className="s-name">{s.name}</div>
                    <div className="s-id">{s.id} · {s.grade}</div>
                  </div>
                  <button className="btn-sm" onClick={() => { onRemove(s.id); showToast('🗑️ Student removed'); }}>
                    Remove
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        {/* System Settings */}
        <div className="admin-card">
          <h3>🔧 Update System Data</h3>
          {[
            { label: 'School Name',    def: 'Smart School' },
            { label: 'Academic Year',  def: '2024-2025' },
            { label: 'Admin Email',    def: 'admin@smartschool.edu' },
          ].map(f => (
            <div className="form-row" key={f.label}>
              <label>{f.label}</label>
              <input type="text" defaultValue={f.def} />
            </div>
          ))}
          <button className="btn-primary" onClick={() => showToast('💾 Settings saved!')}>💾 Save Settings</button>
        </div>

        {/* Report */}
        <div className="admin-card">
          <h3>📋 Attendance Report</h3>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            {[
              { label: 'TOTAL',   val: students.length, color: '#38bdf8', bg: 'rgba(56,189,248,0.1)' },
              { label: 'PRESENT', val: present,          color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
              { label: 'ABSENT',  val: absent,           color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
            ].map(r => (
              <div key={r.label} style={{ flex: 1, background: r.bg, borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: r.color }}>{r.val}</div>
              </div>
            ))}
          </div>
          <button className="btn-danger" onClick={() => { onReset(); showToast('🔄 Attendance reset'); }}>
            🔄 Reset Today's Attendance
          </button>
        </div>
      </div>
    </div>
  );
}