"""Python client para testar backend /api/test e /api/contact
Requisitos: python3 e requests (`pip install requests`)
Uso:
  python python_client.py --test
  python python_client.py --contact --name "Nome" --email "a@b.com" --message "Olá"
"""
import argparse
import requests

BACKEND = "http://127.0.0.1:5000"


def call_test():
    url = f"{BACKEND}/api/test"
    r = requests.get(url, timeout=10)
    r.raise_for_status()
    print(r.json())


def call_contact(name, email, message):
    url = f"{BACKEND}/api/contact"
    payload = {"nome": name, "email": email, "mensagem": message}
    r = requests.post(url, json=payload, timeout=10)
    r.raise_for_status()
    print(r.json())


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--test', action='store_true')
    parser.add_argument('--contact', action='store_true')
    parser.add_argument('--name', type=str, default='Client')
    parser.add_argument('--email', type=str, default='client@example.com')
    parser.add_argument('--message', type=str, default='Olá do client')
    args = parser.parse_args()

    if args.test:
        call_test()
    elif args.contact:
        call_contact(args.name, args.email, args.message)
    else:
        print('Use --test ou --contact')
