import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../api';

export default function Login({ onLogin }) {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await auth.login({ username, password });
      onLogin(res.user);
      nav('/');
    } catch (e) {
      setErr(e.error || 'Login failed');
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <div className="form-row">
          <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} required/>
        </div>
        <div className="form-row">
          <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
