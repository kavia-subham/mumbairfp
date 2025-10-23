import React, { useState } from 'react';
import { login } from '../api/client';
import { store } from '../store/simpleStore';
import { t } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function LoginForm() {
  /** Minimal login form using username/password. */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await login(username, password);
    } catch (error) {
      setErr(error.message || 'Login failed');
      store.setState({ token: null, username: null });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="container" onSubmit={onSubmit} aria-label="Login Form">
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          <span className="visually-hidden">{t('username')}</span>
          <input
            aria-label={t('username')}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={t('username')}
            required
          />
        </label>
        <label>
          <span className="visually-hidden">{t('password')}</span>
          <input
            aria-label={t('password')}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t('password')}
            required
          />
        </label>
        {err ? <div className="text-danger" role="alert">{err}</div> : null}
        <button className="btn" type="submit" disabled={busy} aria-busy={busy}>
          {busy ? '...' : t('login')}
        </button>
      </div>
    </form>
  );
}
