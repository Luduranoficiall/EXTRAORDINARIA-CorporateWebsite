// Node.js client (puro JavaScript) para testar backend
// Requisitos: Node 18+ (fetch global disponível)
// Uso:
//   node node_client.js test
//   node node_client.js contact "Nome" "email@ex.com" "Mensagem"

const BACKEND = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

async function callTest() {
  const res = await fetch(`${BACKEND}/api/test`);
  if (!res.ok) throw new Error(`Status ${res.status}`);
  const j = await res.json();
  console.log(j);
}

async function callContact(name, email, message) {
  const res = await fetch(`${BACKEND}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: name, email, mensagem: message })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Status ${res.status} - ${text}`);
  }
  console.log(await res.json());
}

(async function main(){
  const args = process.argv.slice(2);
  try {
    if (args[0] === 'test') await callTest();
    else if (args[0] === 'contact') await callContact(args[1]||'Client', args[2]||'client@example.com', args[3]||'Olá');
    else console.log('Use args: test | contact <name> <email> <message>');
  } catch (e) {
    console.error('Erro:', e);
    process.exit(1);
  }
})();
