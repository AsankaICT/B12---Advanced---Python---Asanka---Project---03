import React from 'react';

const NAV_ITEMS = [
  { id: 'dashboard',     icon: '🏠', label: 'Dashboard' },
  { id: 'students',      icon: '👤', label: 'Student Section' },
  { id: 'admin',         icon: '⚙️', label: 'Admin Panel' },
  { id: 'notifications', icon: '🔔', label: 'Notifications' },
];

export default function Sidebar({ activePage, setActivePage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="s-title">SMART SCHOOL</div>
        <div className="s-sub">Attendance System</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="avatar">AD</div>
          <div className="user-info">
            <div className="u-name">Admin</div>
            <div className="u-role">Administrator</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
      </div>
    </aside>
  );
}