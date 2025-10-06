from __future__ import annotations
import sys
from pathlib import Path
from security.crypto import fernet_encrypt, fernet_decrypt, load_private_key, load_public_key


def encrypt_file(key_path: Path, src: Path, dest: Path):
    key = key_path.read_bytes()
    data = src.read_bytes()
    token = fernet_encrypt(key, data)
    dest.write_bytes(token)
    print('Arquivo encriptado para', dest)


def decrypt_file(key_path: Path, src: Path, dest: Path):
    key = key_path.read_bytes()
    token = src.read_bytes()
    data = fernet_decrypt(key, token)
    dest.write_bytes(data)
    print('Arquivo decriptado para', dest)


def main():
    if len(sys.argv) < 5:
        print('Uso: python file_crypto.py encrypt|decrypt <key> <src> <dest>')
        sys.exit(1)
    cmd, key, src, dest = sys.argv[1:5]
    keyp = Path(key)
    srcp = Path(src)
    destp = Path(dest)
    if cmd == 'encrypt':
        encrypt_file(keyp, srcp, destp)
    else:
        decrypt_file(keyp, srcp, destp)


if __name__ == '__main__':
    main()
