import React, { useState } from 'react';
import { generateRSAKeyPair, wrapAesKeyWithRsa, unwrapAesKeyWithRsa, generateAesKeyRaw, encryptWithAesRaw, decryptWithAesRaw, utf8ToUint8Array, uint8ArrayToUtf8 } from '../security/webcrypto';

export function AdminSecurityTools() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState<{ iv: string; cipher: string; wrapped: string } | null>(null);
  const [decrypted, setDecrypted] = useState('');

  const onGenerate = async () => {
    const { publicKeyPem, privateKeyPem } = await generateRSAKeyPair();
    setPublicKey(publicKeyPem);
    setPrivateKey(privateKeyPem);
  };

  const onEncrypt = async () => {
    if (!publicKey) return alert('Gere ou cole a chave pública primeiro');
    const aesRaw = await generateAesKeyRaw();
    const { iv, cipher } = await encryptWithAesRaw(aesRaw, utf8ToUint8Array(message));
    const wrapped = await wrapAesKeyWithRsa(publicKey, aesRaw);
    setEncrypted({ iv, cipher, wrapped });
  };

  const onDecrypt = async () => {
    if (!privateKey) return alert('Cole a chave privada para desencriptar');
    if (!encrypted) return alert('Nenhum dado encriptado');
    try {
      const aesRaw = await unwrapAesKeyWithRsa(privateKey, encrypted.wrapped);
      const plain = await decryptWithAesRaw(aesRaw, encrypted.iv, encrypted.cipher);
      setDecrypted(uint8ArrayToUtf8(plain));
    } catch (e) {
      console.error(e);
      alert('Falha ao desencriptar. Verifique as chaves e os dados.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-card rounded-lg border border-primary/20 my-4">
      <h3 className="text-xl font-bold mb-2">Admin Security Tools (WebCrypto)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <button className="btn-primary mb-2" onClick={onGenerate}>Gerar par de chaves RSA</button>
          <label className="block text-sm mt-2" htmlFor="public-key">Public Key (PEM)</label>
          <textarea id="public-key" title="public-key" placeholder="Cole ou gere a chave pública aqui" className="w-full h-32 p-2" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm" htmlFor="private-key">Private Key (PEM)</label>
          <textarea id="private-key" title="private-key" placeholder="Cole a chave privada aqui para desencriptar" className="w-full h-32 p-2" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
  <label className="block text-sm" htmlFor="message">Mensagem para encriptar</label>
  <textarea id="message" title="message" placeholder="Digite a mensagem que será encriptada" className="w-full h-24 p-2" value={message} onChange={(e) => setMessage(e.target.value)} />
        <div className="flex gap-2 mt-2">
          <button className="btn-primary" onClick={onEncrypt}>Encriptar</button>
          <button className="btn-ghost" onClick={() => { setMessage(''); setEncrypted(null); setDecrypted(''); }}>Limpar</button>
        </div>
      </div>

      {encrypted && (
        <div className="mt-4 bg-secondary/5 p-3 rounded">
          <h4 className="font-semibold">Dados encriptados</h4>
          <p className="text-xs break-words"><strong>iv:</strong> {encrypted.iv}</p>
          <p className="text-xs break-words"><strong>cipher:</strong> {encrypted.cipher}</p>
          <p className="text-xs break-words"><strong>wrapped (AES key):</strong> {encrypted.wrapped}</p>
          <div className="mt-2">
            <button className="btn-primary" onClick={onDecrypt}>Desencriptar com chave privada</button>
          </div>
        </div>
      )}

      {decrypted && (
        <div className="mt-4 bg-success/5 p-3 rounded">
          <h4 className="font-semibold">Texto decriptado</h4>
          <p className="break-words">{decrypted}</p>
        </div>
      )}
    </div>
  );
}

export default AdminSecurityTools;
