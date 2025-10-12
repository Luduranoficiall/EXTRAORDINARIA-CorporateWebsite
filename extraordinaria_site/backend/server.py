import json
import logging
from http.server import BaseHTTPRequestHandler, HTTPServer
try:
    import jwt
    _HAS_PYJWT = True
except Exception:
    jwt = None
    _HAS_PYJWT = False
    logging.warning('Biblioteca jwt não encontrada. Usando jwt_compat quando possível.')

try:
    import jwt_compat
except Exception:
    # fallback: try relative import (when module executed as package)
    try:
        from backend import jwt_compat
    except Exception:
        jwt_compat = None
        logging.warning('jwt_compat não encontrado — operações com token podem falhar.')
import os
from datetime import datetime, timedelta
from urllib.parse import parse_qs

# Configuração do logger para depuração
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Configuração do JWT
SECRET_KEY = os.getenv("JWT_SECRET", "sua_chave_secreta")  # Substitua por uma chave secreta segura

class RequestHandler(BaseHTTPRequestHandler):
    def _send_response(self, response_data, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # Suporte a CORS
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

    def _generate_token(self, username):
        payload = {
            "username": username,
            # store expiration as unix timestamp for compat fallback
            "exp": int((datetime.utcnow() + timedelta(hours=1)).timestamp())
        }
        # Prefer PyJWT if available
        if _HAS_PYJWT and jwt is not None:
            try:
                return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            except Exception as e:
                logging.warning(f'PyJWT falhou ao gerar token: {e}')
        # Fallback to jwt_compat if available
        if jwt_compat is not None:
            try:
                return jwt_compat.encode(payload, SECRET_KEY, algorithm="HS256")
            except Exception as e:
                logging.error(f'Erro ao gerar token com jwt_compat: {e}')
                return None
        logging.error('Nenhuma biblioteca JWT disponível para gerar token.')
        return None

    def _authenticate(self):
        auth_header = self.headers.get('Authorization')
        if not auth_header:
            return False, "Token não fornecido."
        try:
            token = auth_header.split(' ')[1]
            # Try PyJWT first
            if _HAS_PYJWT and jwt is not None:
                try:
                    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                    return True, payload.get("username")
                except Exception as e:
                    # fallthrough to try jwt_compat
                    logging.debug(f'PyJWT falhou ao decodificar token: {e}')
            if jwt_compat is not None:
                try:
                    payload = jwt_compat.decode(token, SECRET_KEY, algorithms=["HS256"])
                    return True, payload.get("username")
                except Exception as e:
                    logging.warning(f'jwt_compat falhou ao decodificar token: {e}')
                    return False, "Token inválido ou expirado."
            return False, "Nenhum mecanismo de validação de token disponível."
        except Exception as e:
            logging.error(f'Erro na autenticação: {e}')
            return False, "Erro na validação do token."

    def _sanitize_input(self, input_data):
        # Proteção contra SQL Injection e XSS
        sanitized_data = str(input_data).replace("'", "\'").replace("<", "&lt;").replace(">", "&gt;")
        return sanitized_data

    def do_GET(self):
        if self.path == '/health' or self.path == '/api/health':
            logging.info("Rota de saúde acessada.")
            self._send_response({"status": "Servidor está funcionando corretamente."})
        elif self.path == '/api/test':
            logging.info("Rota de teste acessada.")
            self._send_response({"message": "Backend ativo", "time": datetime.utcnow().isoformat()})
        else:
            self._send_response({"erro": "Rota não encontrada."}, status_code=404)

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        try:
            data = json.loads(post_data)
        except json.JSONDecodeError:
            logging.error("Erro ao decodificar JSON.")
            self._send_response({"erro": "Dados inválidos."}, status_code=400)
            return

        if self.path == '/login':
            username = data.get("username")
            password = data.get("password")
            if username == "admin" and password == "senha123":  # Exemplo básico
                token = self._generate_token(username)
                self._send_response({"mensagem": "Login bem-sucedido.", "token": token})
            else:
                self._send_response({"erro": "Credenciais inválidas."}, status_code=401)
        elif self.path == '/protected':
            authenticated, message = self._authenticate()
            if not authenticated:
                self._send_response({"erro": message}, status_code=401)
                return
            logging.info("Rota protegida acessada.")
            self._send_response({"mensagem": "Acesso autorizado à rota protegida."})
        elif self.path == '/api/contact':
            # Salvar contato em sqlite simples (arquivo contacts.db)
            name = data.get('nome') or data.get('name')
            email = data.get('email')
            message = data.get('mensagem') or data.get('message')
            if not name or not email or not message:
                self._send_response({"erro": "Campos insuficientes."}, status_code=400)
                return
            try:
                import sqlite3
                conn = sqlite3.connect('contacts.db')
                cur = conn.cursor()
                cur.execute('''CREATE TABLE IF NOT EXISTS contacts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT,
                    message TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )''')
                cur.execute('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', (name, email, message))
                conn.commit()
                conn.close()
                self._send_response({"mensagem": "Contato salvo com sucesso."})
            except Exception as e:
                logging.error(f'Erro ao salvar contato: {e}')
                self._send_response({"erro": "Erro interno ao salvar contato."}, status_code=500)
            return
        else:
            self._send_response({"erro": "Rota não encontrada."}, status_code=404)

# Configuração do servidor
def run(server_class=HTTPServer, handler_class=RequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info(f"Servidor iniciado na porta {port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logging.info("Servidor finalizado pelo usuário.")
        httpd.server_close()

if __name__ == '__main__':
    run()