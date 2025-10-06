const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');

function demo() {
  console.log('Hello from Node.js - RSA demo');
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
  });

  const message = Buffer.from('Mensagem secreta do CEO', 'utf8');
  const encrypted = publicEncrypt(publicKey, message);
  console.log('Encrypted (base64):', encrypted.toString('base64'));

  const decrypted = privateDecrypt(privateKey, encrypted);
  console.log('Decrypted:', decrypted.toString('utf8'));
}

if (require.main === module) demo();
