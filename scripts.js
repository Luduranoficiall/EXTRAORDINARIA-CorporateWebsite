// Simple script to wire the form to Formsubmit with a configured email
(function(){
  const FORM_EMAIL = 'contato@example.com'; // TODO: substitua pelo seu e-mail de recebimento
  const form = document.getElementById('lead-form');
  const status = document.getElementById('lead-status');
  if(!form) return;
  form.action = `https://formsubmit.co/${encodeURIComponent(FORM_EMAIL)}`;
  form.addEventListener('submit', function(){
    if(status){ status.textContent = 'Enviando...'; }
  });
})();
