/**
 * Tiny global state store using React subscriptions and simple object pattern.
 * Avoids external dependencies like Redux.
 */
import { useEffect, useSyncExternalStore, useState } from 'react';

const listeners = new Set();

const initialState = (() => {
  let token = null;
  let username = null;
  try {
    token = window.localStorage.getItem('token');
    username = window.localStorage.getItem('username');
  } catch (_) {}
  return {
    token: token || null,
    username: username || null,
    theme: 'light',
    textScale: 100, // percentage for text size
  };
})();

let state = initialState;

function emit() {
  listeners.forEach(l => l());
}

// PUBLIC_INTERFACE
export const store = {
  /** Public store to get and set state with subscription capability. */
  getState() {
    return state;
  },
  setState(patch) {
    state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
    emit();
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

// PUBLIC_INTERFACE
export function useStore(selector = (s) => s) {
  /** React hook to select state from the store with external subscription. */
  const subscribe = (cb) => store.subscribe(cb);
  const getSnapshot = () => selector(store.getState());
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// PUBLIC_INTERFACE
export function useStateWithStore(key, initial) {
  /** Hook that syncs local component state to global store under a given key. */
  const [val, setVal] = useState(store.getState()[key] ?? initial);
  useEffect(() => {
    const unsub = store.subscribe(() => setVal(store.getState()[key]));
    return () => unsub();
  }, [key]);
  return [val, (v) => store.setState({ [key]: typeof v === 'function' ? v(val) : v })];
}
