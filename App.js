import React, { useState } from 'react';
import './App.css';

import Login         from './components/Login';
import Sidebar       from './components/Sidebar';
import Dashboard     from './components/Dashboard';
import StudentSection from './components/StudentSection';
import AdminPanel    from './components/AdminPanel';
import Notifications from './components/Notifications';

const INITIAL_STUDENTS = [
  { id: 'S001', name: 'Alice Johnson',  grade: 'Grade 10', email: 'p1@email.com', status: 'in',     time: '07:45 AM' },
  { id: 'S002', name: 'Bob Martinez',   grade: 'Grade 11', email: 'p2@email.com', status: 'absent', time: '-' },
  { id: 'S003', name: 'Clara Lee',      grade: 'Grade 10', email: 'p3@email.com', status: 'in',     time: '08:02 AM' },
  { id: 'S004', name: 'David Chen',     grade: 'Grade 12', email: 'p4@email.com', status: 'out',    time: '09:15 AM' },
  { id: 'S005', name: 'Emma Wilson',    grade: 'Grade 9',  email: 'p5@email.com', status: 'in',     time: '07:58 AM' },
  { id: 'S006', name: 'Frank Nguyen',   grade: 'Grade 8',  email: 'p6@email.com', status: 'absent', time: '-' },
  { id: 'S007', name: 'Grace Kim',      grade: 'Grade 11', email: 'p7@email.com', status: 'in',     time: '08:11 AM' },
];

let nextId = 8;

export default function App() {
  const [loggedIn,       setLoggedIn]       = useState(false);
  const [activePage,     setActivePage]     = useState('dashboard');
  const [students,       setStudents]       = useState(INITIAL_STUDENTS);
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications,  setNotifications]  = useState([]);
  const [toast,          setToast]          = useState(null);

  /* ── helpers ── */
  function showToast(msg, isError = false) {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  }

  function handleMark(id, type, time) {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: type, time } : s));
    const student = students.find(s => s.id === id);
    const activity = { name: student.name, type, time };
    setRecentActivity(prev => [activity, ...prev].slice(0, 10));
    setNotifications(prev => [{
      name: student.name, type, time,
      msg: type === 'in'
        ? `Your child ${student.name} has successfully arrived at school.`
        : `Your child ${student.name} has left the school at ${time}.`
    }, ...prev]);
  }

  function handleAdd({ fname, lname, grade, email }) {
    const id = 'S' + String(nextId++).padStart(3, '0');
    setStudents(prev => [...prev, { id, name: `${fname} ${lname}`, grade, email: email || 'N/A', status: 'absent', time: '-' }]);
  }

  function handleRemove(id) {
    setStudents(prev => prev.filter(s => s.id !== id));
  }

  function handleReset() {
    setStudents(prev => prev.map(s => ({ ...s, status: 'absent', time: '-' })));
    setRecentActivity([]);
  }

  /* ── render ── */
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const pages = {
    dashboard: <Dashboard students={students} />,
    students:  <StudentSection students={students} onMark={handleMark} recentActivity={recentActivity} />,
    admin:     <AdminPanel students={students} onAdd={handleAdd} onRemove={handleRemove} onReset={handleReset} showToast={showToast} />,
    notifications: <Notifications notifications={notifications} />,
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={() => setLoggedIn(false)} />
      <main className="main">{pages[activePage]}</main>

      {toast && (
        <div className="toast" style={{
          background: toast.isError ? '#450a0a' : '#14532d',
          border: `1px solid ${toast.isError ? '#7f1d1d' : '#16a34a'}`,
          color: toast.isError ? '#f87171' : '#4ade80',
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}