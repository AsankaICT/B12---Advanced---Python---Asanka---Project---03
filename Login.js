import React, { useState } from 'react';

const CREDENTIALS = { username: 'admin', password: 'admin123' };

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleLogin() {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Please fill out this field.';
    if (!password.trim()) newErrors.password = 'Please fill out this field.';
    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      onLogin();
    } else {
      setErrors({ username: 'Invalid username or password.' });
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <div className="icon">🎓</div>
          <h1>SMART SCHOOL</h1>
          <p>Attendance Management System</p>
        </div>

        <p className="login-title">login</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            className={errors.username ? 'error-field' : ''}
            onChange={e => { setUsername(e.target.value); setErrors({}); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {errors.username && <div className="error-msg">⚠️ {errors.username}</div>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            className={errors.password ? 'error-field' : ''}
            onChange={e => { setPassword(e.target.value); setErrors({}); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {errors.password && <div className="error-msg">⚠️ {errors.password}</div>}
        </div>

        <div className="login-row">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>
          <span className="forgot">Forgot Password?</span>
        </div>

        <button className="btn-login" onClick={handleLogin}>Login</button>

        <p className="register-link">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}