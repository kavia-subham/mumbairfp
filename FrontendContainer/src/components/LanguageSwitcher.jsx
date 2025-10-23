import React from 'react';
import { languages, getLang, setLang } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function LanguageSwitcher({ current = getLang(), onChange }) {
  /** Language switcher control for UI localization only (chat language is separate per message). */
  const change = (e) => {
    const v = e.target.value;
    setLang(v);
    if (onChange) onChange(v);
  };
  return (
    <label aria-label="Language Switcher" title="Language Switcher">
      <span className="visually-hidden">Language switcher</span>
      <select aria-label="Language" value={current} onChange={change}>
        {Object.keys(languages).map(k => (
          <option key={k} value={k}>{k.toUpperCase()}</option>
        ))}
      </select>
    </label>
  );
}
