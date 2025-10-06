"""CLI simples para gerar chaves RSA e Fernet no diretório security/keys.
Uso:
  python keys_cli.py genrsa
  python keys_cli.py genfernet
"""
from __future__ import annotations
import sys
from pathlib import Path
from security.crypto import generate_rsa_keypair, save_key, generate_fernet_key


KEYS_DIR = Path(__file__).parent / 'keys'


def genrsa():
    priv, pub = generate_rsa_keypair()
    save_key(KEYS_DIR / 'private.pem', priv)
    save_key(KEYS_DIR / 'public.pem', pub)
    print('Chaves RSA geradas em', KEYS_DIR)


def genfernet():
    k = generate_fernet_key()
    save_key(KEYS_DIR / 'fernet.key', k)
    print('Chave Fernet gerada em', KEYS_DIR)


def main():
    if len(sys.argv) < 2:
        print('Uso: python keys_cli.py genrsa|genfernet')
        sys.exit(1)
    cmd = sys.argv[1]
    if cmd == 'genrsa':
        genrsa()
    elif cmd == 'genfernet':
        genfernet()
    else:
        print('Comando desconhecido')


if __name__ == '__main__':
    main()
