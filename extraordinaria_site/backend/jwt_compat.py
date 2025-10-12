"""
Compat layer for JWT operations. Tries to use PyJWT when available, otherwise
provides a minimal HMAC-SHA256 implementation (RFC 7519-like) for encode/decode.

Note: the fallback is functional but not as fully featured as PyJWT. It's
intended to keep the app running when PyJWT is not installed.
"""
import json
import time
import hmac
import hashlib
import base64
from typing import Any, Dict, Optional

try:
    import jwt as _pyjwt
    _HAS_PYJWT = True
except Exception:
    _pyjwt = None
    _HAS_PYJWT = False


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode('ascii')


def _b64url_decode(data: str) -> bytes:
    padding = '=' * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def encode(payload: Dict[str, Any], secret: str, algorithm: str = "HS256") -> str:
    if _HAS_PYJWT:
        return _pyjwt.encode(payload, secret, algorithm=algorithm)

    header = {"alg": algorithm, "typ": "JWT"}
    header_b = _b64url_encode(json.dumps(header, separators=(",", ":")).encode('utf-8'))
    payload_b = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode('utf-8'))
    signing_input = f"{header_b}.{payload_b}".encode('utf-8')
    if algorithm.upper() == 'HS256':
        sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    else:
        raise ValueError('Unsupported algorithm')
    signature_b = _b64url_encode(sig)
    return f"{header_b}.{payload_b}.{signature_b}"


def decode(token: str, secret: str, algorithms=None) -> Dict[str, Any]:
    if _HAS_PYJWT:
        return _pyjwt.decode(token, secret, algorithms=algorithms or ["HS256"])

    try:
        header_b, payload_b, signature_b = token.split('.')
    except Exception:
        raise ValueError('Token malformado')

    signing_input = f"{header_b}.{payload_b}".encode('utf-8')
    sig = _b64url_decode(signature_b)
    expected_sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    if not hmac.compare_digest(sig, expected_sig):
        raise ValueError('Assinatura inválida')
    payload_json = _b64url_decode(payload_b)
    payload = json.loads(payload_json.decode('utf-8'))
    # Check exp
    exp = payload.get('exp')
    if exp is not None:
        now = int(time.time())
        if now > int(exp):
            raise ValueError('Token expirado')
    return payload


def is_available() -> bool:
    return _HAS_PYJWT
