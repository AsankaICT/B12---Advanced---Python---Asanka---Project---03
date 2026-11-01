import React, { useState } from 'react';

export default function StudentSection({ students, onMark, recentActivity }) {
  const [selectedId, setSelectedId] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  function handleMark(type) {
    if (!selectedId) {
      setStatusMsg({ text: '⚠️ Please select your name first!', type: 'out' });
      return;
    }
    const student = students.find(s => s.id === selectedId);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    onMark(selectedId, type, time);

    const text = type === 'in'
      ? `✅ ${student.name} marked IN at ${time}. Welcome!`
      : `👋 ${student.name} marked OUT at ${time}. Goodbye!`;
    setStatusMsg({ text, type });

    setTimeout(() => setStatusMsg(null), 4000);
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">👤 Student Section</div>
          <div className="page-sub">Mark your attendance — IN or OUT</div>
        </div>
      </div>

      <div className="student-section">
        <div className="touch-panel">
          <h2>🎓 Mark Attendance</h2>
          <p>Select your name and tap IN when you arrive or OUT when you leave</p>

          <div className="student-select">
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
              <option value="">— Select your name —</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
              ))}
            </select>
          </div>

          <div className="touch-buttons">
            <button className="btn-in"  onClick={() => handleMark('in')}>IN</button>
            <button className="btn-out" onClick={() => handleMark('out')}>OUT</button>
          </div>

          {statusMsg && (
            <div className={`status-msg ${statusMsg.type}`}>{statusMsg.text}</div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="section-box" style={{ marginTop: 20 }}>
          <div className="section-title">🕐 Recent Activity</div>
          {recentActivity.length === 0 ? (
            <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
              No recent activity
            </div>
          ) : (
            recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`badge ${a.type === 'in' ? 'badge-in' : 'badge-out'}`}>{a.type.toUpperCase()}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{a.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}