"""Utilities de criptografia para o projeto.

Fornece:
- geração de par de chaves RSA (uso para assinar/encriptar pequenas cargas)
- encriptação simétrica com Fernet (para dados maiores/arquivos)
- helpers para encriptar/decriptar strings e arquivos
"""
from __future__ import annotations
import os
from pathlib import Path
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.fernet import Fernet


def generate_rsa_keypair(bits: int = 4096) -> tuple[bytes, bytes]:
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=bits)
    priv = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    pub = private_key.public_key().public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )
    return priv, pub


def save_key(path: Path, data: bytes, mode: int = 0o600) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'wb') as f:
        f.write(data)
    try:
        os.chmod(path, mode)
    except Exception:
        # chmod may fail on Windows/OneDrive; ignore
        pass


def load_private_key(path: Path):
    with open(path, 'rb') as f:
        return serialization.load_pem_private_key(f.read(), password=None)


def load_public_key(path: Path):
    with open(path, 'rb') as f:
        return serialization.load_pem_public_key(f.read())


def rsa_encrypt(public_key, plaintext: bytes) -> bytes:
    return public_key.encrypt(
        plaintext,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None),
    )


def rsa_decrypt(private_key, ciphertext: bytes) -> bytes:
    return private_key.decrypt(
        ciphertext,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None),
    )


def generate_fernet_key() -> bytes:
    return Fernet.generate_key()


def fernet_encrypt(key: bytes, data: bytes) -> bytes:
    f = Fernet(key)
    return f.encrypt(data)


def fernet_decrypt(key: bytes, token: bytes) -> bytes:
    f = Fernet(key)
    return f.decrypt(token)
