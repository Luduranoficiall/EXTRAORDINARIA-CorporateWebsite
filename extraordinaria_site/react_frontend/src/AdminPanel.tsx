import React, { useEffect, useState } from 'react';
import './index.css';

const AdminPanel: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [reportId, setReportId] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');

  useEffect(() => {
    fetch('/admin/status', { headers: { 'X-ADMIN-KEY': (process.env.REACT_APP_ADMIN_KEY || '') } })
      .then(r => r.json())
      .then(data => setStatus(JSON.stringify(data)))
      .catch(() => setStatus('offline'));
  }, []);

  const handleEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId || !workspaceId) return;
    const base = `https://app.powerbi.com/reportEmbed?reportId=${encodeURIComponent(reportId)}&groupId=${encodeURIComponent(workspaceId)}`;
    const iframe = document.getElementById('powerbi-embed-iframe') as HTMLIFrameElement | null;
    if (iframe) iframe.src = base;
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel (oculto)</h2>
      <p>Estado do sistema: {status ?? 'carregando...'}</p>

      <div className="admin-grid admin-section-margin">
        <div className="admin-left">
          <section>
            <h3>Power BI Embed</h3>
            <form className="admin-embed-form" onSubmit={handleEmbed} aria-label="Power BI embed form">
              <label htmlFor="reportId">Report ID</label>
              <input id="reportId" aria-label="Report ID" placeholder="Cole o reportId do Power BI" value={reportId} onChange={e => setReportId(e.target.value)} />

              <label htmlFor="workspaceId">Workspace ID</label>
              <input id="workspaceId" aria-label="Workspace ID" placeholder="Cole o workspaceId (groupId) do Power BI" value={workspaceId} onChange={e => setWorkspaceId(e.target.value)} />

              <button type="submit">Embed</button>
            </form>

            <div className="admin-section-margin">
              <h4>Notas</h4>
              <p>Para um embed seguro em produção, crie um endpoint que gere um token de embed no servidor e forneça a URL + token para este painel. Atualmente isto apenas constrói a URL pública.</p>
            </div>
          </section>
        </div>

        <div className="admin-right">
          <section>
            <h3>Integrations</h3>
            <ul>
              <li>Power BI — <small>stub</small></li>
              <li>Stripe — <small>stub</small></li>
              <li>Salesforce — <small>stub</small></li>
              <li>Firebase — <small>stub</small></li>
              <li>OpenAI — <small>stub</small></li>
            </ul>
          </section>

          <section className="admin-section-margin">
            <h3>Embed Preview</h3>
            <div className="embed-wrapper">
              <iframe id="powerbi-embed-iframe" title="Power BI Embed Preview" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
