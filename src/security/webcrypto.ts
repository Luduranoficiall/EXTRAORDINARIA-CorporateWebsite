/*
  WebCrypto helpers para E2E encryption sem dependências externas.
  Funcional em navegadores modernos e Node.js 16+ (globalThis.crypto.subtle).
*/

function btoaFromArrayBuffer(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as any);
  }
  if (typeof btoa === 'function') return btoa(binary);
  if (typeof (globalThis as any).Buffer !== 'undefined') return (globalThis as any).Buffer.from(binary, 'binary').toString('base64');
  throw new Error('No base64 encoder available');
}

function arrayBufferFromBase64(base64: string) {
  if (typeof atob === 'function') {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }
  if (typeof atob === 'function') {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }
  if (typeof (globalThis as any).Buffer !== 'undefined') return (globalThis as any).Buffer.from(base64, 'base64').buffer;
  throw new Error('No base64 decoder available');
}

function pemFromArrayBuffer(buffer: ArrayBuffer, label: string) {
  const b64 = btoaFromArrayBuffer(buffer);
  const lines = b64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`;
}

function base64FromPem(pem: string) {
  return pem.replace(/-----.*?-----/g, '').replace(/\s+/g, '');
}

const subtle = (globalThis as any).crypto?.subtle;
if (!subtle) {
  throw new Error('WebCrypto API (crypto.subtle) não disponível neste ambiente. Use Node 16+ ou um navegador moderno.');
}

export async function generateRSAKeyPair(): Promise<{ publicKeyPem: string; privateKeyPem: string }> {
  const keyPair = await subtle.generateKey(
    { name: 'RSA-OAEP', modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['encrypt', 'decrypt']
  );
  const spki = await subtle.exportKey('spki', keyPair.publicKey);
  const pkcs8 = await subtle.exportKey('pkcs8', keyPair.privateKey);
  return { publicKeyPem: pemFromArrayBuffer(spki, 'PUBLIC KEY'), privateKeyPem: pemFromArrayBuffer(pkcs8, 'PRIVATE KEY') };
}

export async function importPublicKey(pem: string) {
  const b64 = base64FromPem(pem);
  const ab = arrayBufferFromBase64(b64);
  return subtle.importKey('spki', ab, { name: 'RSA-OAEP', hash: 'SHA-256' }, true, ['encrypt']);
}

export async function importPrivateKey(pem: string) {
  const b64 = base64FromPem(pem);
  const ab = arrayBufferFromBase64(b64);
  return subtle.importKey('pkcs8', ab, { name: 'RSA-OAEP', hash: 'SHA-256' }, true, ['decrypt']);
}

export async function generateAesKeyRaw(): Promise<ArrayBuffer> {
  const key = await subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  return await subtle.exportKey('raw', key);
}

export async function encryptWithAesRaw(keyRaw: ArrayBuffer, plaintext: Uint8Array) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await subtle.importKey('raw', keyRaw, { name: 'AES-GCM' }, false, ['encrypt']);
  const cipher = await subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return { iv: btoaFromArrayBuffer(iv.buffer), cipher: btoaFromArrayBuffer(cipher) };
}

export async function decryptWithAesRaw(keyRaw: ArrayBuffer, ivB64: string, cipherB64: string) {
  const iv = new Uint8Array(arrayBufferFromBase64(ivB64));
  const cipher = arrayBufferFromBase64(cipherB64);
  const key = await subtle.importKey('raw', keyRaw, { name: 'AES-GCM' }, false, ['decrypt']);
  const plain = await subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher as any);
  return new Uint8Array(plain);
}

export async function wrapAesKeyWithRsa(publicKeyPem: string, aesRaw: ArrayBuffer) {
  const pub = await importPublicKey(publicKeyPem);
  const wrapped = await subtle.encrypt({ name: 'RSA-OAEP' }, pub, aesRaw);
  return btoaFromArrayBuffer(wrapped);
}

export async function unwrapAesKeyWithRsa(privateKeyPem: string, wrappedB64: string) {
  const priv = await importPrivateKey(privateKeyPem);
  const wrapped = arrayBufferFromBase64(wrappedB64);
  const raw = await subtle.decrypt({ name: 'RSA-OAEP' }, priv, wrapped as any);
  return raw as ArrayBuffer;
}

export function utf8ToUint8Array(s: string) {
  return new TextEncoder().encode(s);
}

export function uint8ArrayToUtf8(u: Uint8Array) {
  return new TextDecoder().decode(u);
}
