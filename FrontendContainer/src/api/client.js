/**
 * Minimal fetch-based API client for the Frontend.
 * Reads base URL from REACT_APP_API_BASE.
 * Stores JWT token in simple in-memory store with optional localStorage.
 */
import { store } from '../store/simpleStore';

const BASE_URL = process.env.REACT_APP_API_BASE || '';

async function request(path, { method = 'GET', headers = {}, body, isForm = false } = {}) {
  const token = store.getState().token;
  const h = new Headers(headers);
  if (!isForm) h.set('Content-Type', 'application/json');
  if (token) h.set('Authorization', `Bearer ${token}`);

  const resp = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: h,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
    credentials: 'include'
  });

  const contentType = resp.headers.get('content-type') || '';
  let data = null;
  try {
    data = contentType.includes('application/json') ? await resp.json() : await resp.text();
  } catch (_) {
    data = null;
  }
  if (!resp.ok) {
    const message = data && data.detail ? data.detail : resp.statusText;
    throw new Error(message || 'Request failed');
  }
  return data;
}

// PUBLIC_INTERFACE
export async function login(username, password) {
  /** Perform login and store JWT in memory (with safe localStorage persistence). */
  const data = await request('/auth/login', { method: 'POST', body: { username, password } });
  if (data && data.token) {
    store.setState({ token: data.token, username });
    try {
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('username', username);
    } catch (_) {}
  }
  return data;
}

// PUBLIC_INTERFACE
export async function sendChat(message, language) {
  /** Send chat message with language selection. */
  return request('/chat/send', { method: 'POST', body: { message, language } });
}

// PUBLIC_INTERFACE
export async function uploadDocument(file, onProgress) {
  /** Upload document as multipart/form-data, report progress if browser supports it (fetch doesn't natively). */
  const form = new FormData();
  form.append('file', file);
  // onProgress is a no-op with fetch; kept for API compatibility
  return request('/documents/upload', { method: 'POST', body: form, isForm: true });
}

// PUBLIC_INTERFACE
export async function submitFeedback(feedback, rating) {
  /** Send user feedback and optional rating. */
  return request('/feedback', { method: 'POST', body: { feedback, rating } });
}

export const api = { login, sendChat, uploadDocument, submitFeedback };
export default api;
