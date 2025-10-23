import React, { useState } from 'react';
import { uploadDocument } from '../api/client';
import { t } from '../utils/i18n';

// PUBLIC_INTERFACE
export default function DocumentUpload() {
  /** Uploads a file via multipart and renders extractedData from response. */
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState(null);
  const [progress] = useState(0); // fetch cannot track upload progress natively

  const onChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const onUpload = async () => {
    if (!file) return;
    setBusy(true);
    setErr('');
    setResult(null);
    try {
      const res = await uploadDocument(file);
      setResult(res);
    } catch (e) {
      setErr(e.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" aria-label="Document Upload">
      <h3>{t('upload_document')}</h3>
      <div className="row">
        <label style={{ flex: 1 }}>
          <span className="visually-hidden">{t('choose_file')}</span>
          <input type="file" onChange={onChange} aria-label={t('choose_file')} />
        </label>
        <button className="btn" onClick={onUpload} disabled={!file || busy} aria-busy={busy}>
          {busy ? t('uploading') : t('upload_document')}
        </button>
      </div>
      {busy && <div className="helper">{t('uploading')} {progress ? `(${progress}%)` : ''}</div>}
      {err ? <div className="text-danger" role="alert">{err}</div> : null}
      {result ? (
        <div style={{ marginTop: 8 }}>
          <div className="helper">{t('extracted_data')}:</div>
          <pre className="container" style={{ overflow: 'auto' }}>
{JSON.stringify(result?.extractedData ?? result, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
