const crypto = require('crypto');

function hybridEncrypt(plaintext) {
  // generate AES key
  const aesKey = crypto.randomBytes(32); // AES-256
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
  const ct = Buffer.concat([cipher.update(Buffer.from(plaintext)), cipher.final()]);
  const tag = cipher.getAuthTag();

  // generate RSA keypair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const wrappedKey = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, aesKey);

  return {
    cipher: Buffer.concat([iv, ct, tag]).toString('base64'),
    wrappedKey: wrappedKey.toString('base64'),
    publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
    privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' })
  };
}

function hybridDecrypt(cipherB64, wrappedKeyB64, privateKeyPem) {
  const buf = Buffer.from(cipherB64, 'base64');
  const iv = buf.slice(0,12);
  const tag = buf.slice(buf.length-16);
  const ct = buf.slice(12, buf.length-16);

  const wrapped = Buffer.from(wrappedKeyB64, 'base64');
  const aesKey = crypto.privateDecrypt({ key: privateKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, wrapped);

  const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt.toString('utf8');
}

if (require.main === module) {
  const demo = hybridEncrypt('Mensagem secreta do CEO');
  console.log(JSON.stringify(demo, null, 2));
  const pt = hybridDecrypt(demo.cipher, demo.wrappedKey, demo.privateKey);
  console.log('\nDecrypted:', pt);
}
