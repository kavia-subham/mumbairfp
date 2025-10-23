import React, { useState } from 'react';
import { submitFeedback } from '../api/client';
import { t } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function FeedbackForm() {
  /** Simple feedback form for rating (1-5) and text feedback. */
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    setErr('');
    try {
      await submitFeedback(feedback, Number(rating));
      setMsg('Thanks for your feedback!');
      setFeedback('');
      setRating(5);
    } catch (e2) {
      setErr(e2.message || 'Failed to submit feedback');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="container" onSubmit={onSubmit} aria-label="Feedback Form">
      <h3>{t('feedback')}</h3>
      <div className="row" style={{ alignItems: 'center' }}>
        <label style={{ width: 160 }}>
          <span className="visually-hidden">{t('rating')}</span>
          <select aria-label={t('rating')} value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label style={{ flex: 1 }}>
          <span className="visually-hidden">{t('feedback')}</span>
          <input
            aria-label={t('feedback')}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder={t('feedback')}
            required
          />
        </label>
        <button className="btn" type="submit" disabled={busy}>{busy ? '...' : t('submit')}</button>
      </div>
      {msg ? <div className="text-success" role="status">{msg}</div> : null}
      {err ? <div className="text-danger" role="alert">{err}</div> : null}
    </form>
  );
}
