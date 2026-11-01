import React, { useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const WEEKLY = [88, 92, 85, 95, 90];

export default function Dashboard({ students }) {
  const [search, setSearch] = useState('');

  const total   = students.length;
  const present = students.filter(s => s.status === 'in').length;
  const absent  = students.filter(s => s.status === 'absent').length;
  const out     = students.filter(s => s.status === 'out').length;
  const pctP    = total ? Math.round((present / total) * 100) : 0;
  const pctA    = total ? Math.round((absent  / total) * 100) : 0;

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
  );

  const maxBar = Math.max(...WEEKLY);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">🏠 Home Dashboard</div>
          <div className="page-sub">Real-time school attendance overview</div>
        </div>
        <div className="date-badge">{new Date().toDateString()}</div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Students</div>
          <div className="stat-value c-blue-val">{total}</div>
          <div className="stat-change">Registered</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Present Today</div>
          <div className="stat-value c-green-val">{present}</div>
          <div className="stat-change up">{pctP}% attendance rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Absent Today</div>
          <div className="stat-value c-red-val">{absent}</div>
          <div className="stat-change down">{pctA}% absent rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Checked Out</div>
          <div className="stat-value c-amber-val">{out}</div>
          <div className="stat-change">Left campus</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="section-box">
        <div className="section-title">📊 Weekly Attendance Overview</div>
        <div className="bar-chart">
          {DAYS.map((day, i) => (
            <div className="bar-wrap" key={day}>
              <div className="bar-val">{WEEKLY[i]}%</div>
              <div
                className="bar"
                style={{
                  height: `${(WEEKLY[i] / maxBar) * 100}px`,
                  background: i === 3
                    ? 'linear-gradient(#0ea5e9, #6366f1)'
                    : 'rgba(56,189,248,0.35)'
                }}
              />
              <div className="bar-label">{day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="section-box">
        <div className="table-header">
          <div className="section-title" style={{ marginBottom: 0 }}>👥 Student Attendance List</div>
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search student..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id}>
                <td style={{ color: '#64748b' }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td>{s.grade}</td>
                <td>
                  <span className={`badge ${s.status === 'in' ? 'badge-in' : s.status === 'out' ? 'badge-out' : 'badge-abs'}`}>
                    {s.status === 'in' ? 'IN' : s.status === 'out' ? 'OUT' : 'Absent'}
                  </span>
                </td>
                <td>{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}