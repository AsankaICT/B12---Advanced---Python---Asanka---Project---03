import React from 'react';

export default function Notifications({ notifications }) {
  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">🔔 Parent Notifications</div>
          <div className="page-sub">Automatic alerts sent to guardians</div>
        </div>
      </div>

      <div className="section-box">
        <div className="section-title">📱 Notification Log</div>
        {notifications.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 30 }}>
            No notifications sent yet
          </div>
        ) : (
          notifications.map((n, i) => (
            <div className="notif-item" key={i}>
              <div className="notif-icon">{n.type === 'in' ? '📱' : '📲'}</div>
              <div>
                <div className="notif-name">{n.name}</div>
                <div className="notif-text">{n.msg}</div>
                <div className="notif-time">📧 Notification sent at {n.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}