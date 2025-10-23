import React, { useState } from 'react';
import { sendChat } from '../api/client';
import { t, languages, getLang } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function ChatInterface() {
  /** Chat UI with per-message language selection and in-component history. */
  const [messages, setMessages] = useState([]); // {role:'user'|'assistant', text, language}
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState(getLang());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');
    const userMsg = { role: 'user', text: input, language };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setBusy(true);
    try {
      const res = await sendChat(userMsg.text, language);
      const assistantText = res?.response || res?.message || JSON.stringify(res);
      setMessages(prev => [...prev, { role: 'assistant', text: assistantText, language: res?.language || language }]);
    } catch (err) {
      setError(err.message || 'Failed to send');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" aria-label="Chat Interface">
      <h2>{t('app_title')} - {t('language')}</h2>
      <div className="row" style={{ alignItems: 'center', marginBottom: 8 }}>
        <label style={{ minWidth: 160 }}>
          <span className="visually-hidden">{t('language')}</span>
          <select
            aria-label={t('language')}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}>
            {Object.keys(languages).map(k => (
              <option key={k} value={k}>{k.toUpperCase()}</option>
            ))}
          </select>
        </label>
      </div>
      <div role="log" aria-live="polite" style={{ minHeight: 120, padding: 6 }}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`} aria-label={`${m.role} message`}>
            <div className="helper">{m.language?.toUpperCase()}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      {error ? <div className="text-danger" role="alert">{error}</div> : null}
      <form onSubmit={onSend} className="row" style={{ marginTop: 8 }}>
        <label style={{ flex: 1 }}>
          <span className="visually-hidden">{t('type_message')}</span>
          <input
            aria-label={t('type_message')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('type_message')}
          />
        </label>
        <button className="btn" type="submit" disabled={busy}>{busy ? '...' : t('send')}</button>
      </form>
    </div>
  );
}
