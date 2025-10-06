from cryptography.fernet import Fernet

def demo():
    print("Hello from Python - Fernet demo")
    message = b"Mensagem secreta do CEO"
    key = Fernet.generate_key()
    f = Fernet(key)
    token = f.encrypt(message)
    print("Key:", key.decode())
    print("Token:", token.decode())
    decrypted = f.decrypt(token)
    print("Decrypted:", decrypted.decode())

if __name__ == '__main__':
    demo()
