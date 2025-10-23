import React from 'react';
import { store, useStore } from '../store/simpleStore';
import { t } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function AccessibilityBar() {
  /** Accessibility toolbar to adjust text size and toggle high contrast via theme. */
  const { textScale, theme } = useStore(s => ({ textScale: s.textScale, theme: s.theme }));

  const inc = () => store.setState(s => ({ textScale: Math.min(200, s.textScale + 10) }));
  const dec = () => store.setState(s => ({ textScale: Math.max(70, s.textScale - 10) }));
  const toggleContrast = () => store.setState({ theme: theme === 'light' ? 'dark' : 'light' });

  return (
    <div role="toolbar" aria-label={t('accessibility')} className="row" style={{ alignItems: 'center' }}>
      <button className="btn" onClick={dec} aria-label={t('decrease_text')}>A-</button>
      <div className="helper" aria-live="polite" style={{ padding: '0 8px' }}>{textScale}%</div>
      <button className="btn" onClick={inc} aria-label={t('increase_text')}>A+</button>
      <button className="btn" onClick={toggleContrast} style={{ marginLeft: 8 }}>⬛⬜</button>
    </div>
  );
}
