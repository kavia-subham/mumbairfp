import React, { useEffect, useState } from 'react';
import './App.css';
import { store, useStore } from './store/simpleStore';
import { t, setLang, getLang, languages } from './utils/i18n';
import AccessibilityBar from './components/AccessibilityBar';
import LanguageSwitcher from './components/LanguageSwitcher';
import LoginForm from './components/LoginForm';
import ChatInterface from './components/ChatInterface';
import DocumentUpload from './components/DocumentUpload';
import FeedbackForm from './components/FeedbackForm';
import VoiceCapturePlaceholder from './components/VoiceCapturePlaceholder';

// PUBLIC_INTERFACE
function App() {
  /** App-level theme and accessibility state is stored via simpleStore to maintain minimal dependencies */
  const { theme, token, username, textScale } = useStore(s => ({
    theme: s.theme,
    token: s.token,
    username: s.username,
    textScale: s.textScale
  }));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Apply theme and text size to document root for global effect
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.fontSize = textScale + '%';
  }, [theme, textScale]);

  useEffect(() => {
    // Initialize language from localStorage if available and safe
    try {
      const savedLang = window.localStorage.getItem('lang');
      if (savedLang && languages[savedLang]) setLang(savedLang);
    } catch (_) {
      // ignore storage errors
    }
    setMounted(true);
  }, []);

  // PUBLIC_INTERFACE
  const handleLogout = () => {
    store.setState({ token: null, username: null });
    try {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
    } catch (_) {}
  };

  if (!mounted) return null;

  return (
    <div className="App" role="application" aria-label="Maharashtra AI Agents Platform">
      <header className="App-header" role="banner">
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
          <button
            className="theme-toggle"
            onClick={() => store.setState({ theme: theme === 'light' ? 'dark' : 'light' })}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <h1 className="title" aria-live="polite">{t('app_title')}</h1>
        <p className="subtitle">{t('app_tagline')}</p>

        <div className="top-bar" style={{ width: '100%', maxWidth: 980 }}>
          <LanguageSwitcher
            current={getLang()}
            onChange={(lng) => {
              setLang(lng);
              try { window.localStorage.setItem('lang', lng); } catch (_) {}
            }}
          />
          <AccessibilityBar />
        </div>

        {!token ? (
          <section aria-label="Login section" style={{ width: '100%', maxWidth: 420 }}>
            <LoginForm />
          </section>
        ) : (
          <main style={{ width: '100%', maxWidth: 980 }}>
            <section aria-label="User session" style={{ marginBottom: 8 }}>
              <span>{t('welcome')}, <strong>{username}</strong></span>
              <button
                className="theme-toggle"
                style={{ marginLeft: 12 }}
                onClick={handleLogout}
                aria-label={t('logout')}>
                {t('logout')}
              </button>
            </section>

            <section aria-label="Chat and Voice" className="container" style={{ display: 'grid', gap: 16 }}>
              <ChatInterface />
              <VoiceCapturePlaceholder />
            </section>

            <section aria-label="Document Upload" className="container" style={{ marginTop: 16 }}>
              <DocumentUpload />
            </section>

            <section aria-label="Feedback" className="container" style={{ marginTop: 16 }}>
              <FeedbackForm />
            </section>
          </main>
        )}
      </header>
    </div>
  );
}

export default App;
