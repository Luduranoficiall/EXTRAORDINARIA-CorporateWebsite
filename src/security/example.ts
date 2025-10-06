import { generateRSAKeyPair, generateAesKeyRaw, utf8ToUint8Array, encryptWithAesRaw, wrapAesKeyWithRsa, unwrapAesKeyWithRsa, decryptWithAesRaw, uint8ArrayToUtf8 } from './webcrypto';

async function demo() {
  const { publicKeyPem, privateKeyPem } = await generateRSAKeyPair();
  console.log('Public Key:', publicKeyPem.slice(0, 100) + '...');

  const aesRaw = await generateAesKeyRaw();
  const data = utf8ToUint8Array('Mensagem secreta para CEO');
  const { iv, cipher } = await encryptWithAesRaw(aesRaw, data);
  console.log('Encrypted (AES):', cipher.slice(0, 60) + '...');

  const wrapped = await wrapAesKeyWithRsa(publicKeyPem, aesRaw);
  console.log('Wrapped AES key (RSA):', wrapped.slice(0, 60) + '...');

  const unwrapped = await unwrapAesKeyWithRsa(privateKeyPem, wrapped);
  const plain = await decryptWithAesRaw(unwrapped, iv, cipher);
  console.log('Decrypted text:', uint8ArrayToUtf8(plain));
}

demo().catch(console.error);
