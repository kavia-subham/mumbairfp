import React, { useEffect, useRef, useState } from 'react';
import { t } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function VoiceCapturePlaceholder() {
  /**
   * Placeholder for voice capture that simulates recognized text every second.
   * This does not integrate with chat automatically to keep responsibilities clear.
   */
  const [simulating, setSimulating] = useState(false);
  const [recognized, setRecognized] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (simulating) {
      let count = 0;
      timerRef.current = setInterval(() => {
        count += 1;
        setRecognized(prev => (prev ? prev + ' ' : '') + `voice${count}`);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [simulating]);

  return (
    <div className="container" aria-label="Voice Placeholder">
      <h3>{t('voice_placeholder_title')}</h3>
      <div className="row">
        <button className="btn" onClick={() => setSimulating(s => !s)} aria-pressed={simulating}>
          {simulating ? t('stop_simulation') : t('start_simulation')}
        </button>
      </div>
      <div className="helper" style={{ marginTop: 8 }}>{t('recognized_text')}:</div>
      <div className="message assistant" aria-live="polite">{recognized || '—'}</div>
    </div>
  );
}
