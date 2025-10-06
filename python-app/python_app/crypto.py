from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os, base64


def generate_rsa_keypair():
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    private_bytes = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    public_key = private_key.public_key()
    public_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    return public_bytes, private_bytes


def hybrid_encrypt(plaintext: bytes, rsa_pub_pem: bytes):
    # generate AES key
    key = AESGCM.generate_key(bit_length=256)
    aesgcm = AESGCM(key)
    iv = os.urandom(12)
    ct = aesgcm.encrypt(iv, plaintext, None)
    # wrap AES key with RSA public
    from cryptography.hazmat.primitives import serialization
    pub = serialization.load_pem_public_key(rsa_pub_pem)
    wrapped = pub.encrypt(key, padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None))
    # return base64 pieces
    return base64.b64encode(iv+ct).decode(), base64.b64encode(wrapped).decode()


def hybrid_decrypt(cipher_b64: str, wrapped_key_b64: str, priv_b64: str) -> bytes:
    iv_ct = base64.b64decode(cipher_b64)
    wrapped = base64.b64decode(wrapped_key_b64)
    priv = base64.b64decode(priv_b64)
    from cryptography.hazmat.primitives import serialization
    private_key = serialization.load_pem_private_key(priv, password=None)
    key = private_key.decrypt(wrapped, padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None))
    iv = iv_ct[:12]
    ct = iv_ct[12:]
    aesgcm = AESGCM(key)
    pt = aesgcm.decrypt(iv, ct, None)
    return pt


def generate_fernet_key():
    from cryptography.fernet import Fernet
    return Fernet.generate_key()

def encrypt_fernet(key: bytes, data: bytes) -> bytes:
    from cryptography.fernet import Fernet
    f = Fernet(key)
    return f.encrypt(data)

def decrypt_fernet(key: bytes, token: bytes) -> bytes:
    from cryptography.fernet import Fernet
    f = Fernet(key)
    return f.decrypt(token)
