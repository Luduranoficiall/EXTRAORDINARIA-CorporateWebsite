const crypto = require('crypto');

function generateRsaKeyPair() {
  return crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
}

function hybridEncrypt(plaintextBuffer, publicKeyPem) {
  const aesKey = crypto.randomBytes(16); // 128-bit
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-128-gcm', aesKey, iv);
  const ct = Buffer.concat([cipher.update(plaintextBuffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  const wrapped = crypto.publicEncrypt({ key: publicKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, aesKey);
  return { cipher: Buffer.concat([iv, ct, tag]).toString('base64'), wrappedKey: wrapped.toString('base64') };
}

function hybridDecrypt(cipherB64, wrappedB64, privateKeyPem) {
  const data = Buffer.from(cipherB64, 'base64');
  const iv = data.slice(0, 12);
  const tag = data.slice(data.length - 16);
  const ct = data.slice(12, data.length - 16);
  const wrapped = Buffer.from(wrappedB64, 'base64');
  const aesKey = crypto.privateDecrypt({ key: privateKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, wrapped);
  const decipher = crypto.createDecipheriv('aes-128-gcm', aesKey, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt;
}

module.exports = { generateRsaKeyPair, hybridEncrypt, hybridDecrypt };
