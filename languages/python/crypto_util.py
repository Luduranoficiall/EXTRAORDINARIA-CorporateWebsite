"""
Simple pure-Python cryptography utilities (wrapper around cryptography library).
This is a stub to be used by higher-level services. Requires `cryptography` package.
"""
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
import os, base64


def generate_rsa_keypair():
    priv = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    pub = priv.public_key()
    return priv, pub


def hybrid_encrypt(plaintext: bytes, public_key) -> dict:
    # generate AES key
    aes_key = AESGCM.generate_key(bit_length=128)
    aesgcm = AESGCM(aes_key)
    iv = os.urandom(12)
    ct = aesgcm.encrypt(iv, plaintext, None)
    wrapped = public_key.encrypt(aes_key, padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None))
    return {"cipher": base64.b64encode(iv+ct).decode(), "wrappedKey": base64.b64encode(wrapped).decode()}


def hybrid_decrypt(cipher_b64: str, wrapped_b64: str, private_key) -> bytes:
    ivct = base64.b64decode(cipher_b64)
    iv = ivct[:12]
    ct = ivct[12:]
    wrapped = base64.b64decode(wrapped_b64)
    aes_key = private_key.decrypt(wrapped, padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None))
    aesgcm = AESGCM(aes_key)
    return aesgcm.decrypt(iv, ct, None)
