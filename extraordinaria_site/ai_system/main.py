import json
import logging
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
try:
    import jwt
except Exception:
    jwt = None
    logging.warning('Biblioteca jwt não encontrada. Funcionalidade de token estará limitada.')

try:
    import openai
except Exception:
    openai = None
    logging.warning('Biblioteca openai não encontrada. Funcionalidade de IA estará limitada.')
import sqlite3
from datetime import datetime, timedelta
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    logging.warning('python-dotenv não encontrado; variáveis de ambiente não carregadas automaticamente.')

# Configuração do logger para depuração
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Configuração da API do OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")  # Substitua pela sua chave de API válida

# Configuração do JWT
SECRET_KEY = os.getenv("JWT_SECRET", "sua_chave_secreta")  # Substitua por uma chave secreta segura

# Configuração do banco de dados SQLite
DB_PATH = "extraordinaria.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL
                    )''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS logs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        action TEXT NOT NULL,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                    )''')
    conn.commit()
    conn.close()

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
            "exp": datetime.utcnow() + timedelta(hours=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return token

    def _authenticate(self):
        auth_header = self.headers.get('Authorization')
        if not auth_header:
            return False, "Token não fornecido."
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            return True, payload["username"]
        except jwt.ExpiredSignatureError:
            return False, "Token expirado."
        except jwt.InvalidTokenError:
            return False, "Token inválido."

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == '/':
            logging.info("Rota inicial acessada.")
            self._send_response({"mensagem": "IA EXTRAORDINÁRI.A. está ativa e funcionando!"})
        elif self.path == '/dashboard':
            authenticated, message = self._authenticate()
            if not authenticated:
                self._send_response({"erro": message}, status_code=401)
                return
            logging.info("Dashboard acessado.")
            self._send_response({"mensagem": "Bem-vindo ao dashboard!", "dados": {"relatorios": "Em construção"}})
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
            if self._validate_user(username, password):
                token = self._generate_token(username)
                self._send_response({"mensagem": "Login bem-sucedido.", "token": token})
            else:
                self._send_response({"erro": "Credenciais inválidas."}, status_code=401)
        elif self.path == '/analyze':
            authenticated, message = self._authenticate()
            if not authenticated:
                self._send_response({"erro": message}, status_code=401)
                return
            logging.info("Rota de análise acessada.")
            resultado = self._analyze_data(data)
            self._send_response(resultado)
        elif self.path == '/chat':
            authenticated, message = self._authenticate()
            if not authenticated:
                self._send_response({"erro": message}, status_code=401)
                return
            logging.info("Rota de chatbot acessada.")
            resultado = self._chat_response(data)
            self._send_response(resultado)
        else:
            self._send_response({"erro": "Rota não encontrada."}, status_code=404)

    def _validate_user(self, username, password):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
        user = cursor.fetchone()
        conn.close()
        return user is not None

    def _validate_request_data(self, data, required_fields):
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return False, {"erro": f"Campos obrigatórios ausentes: {', '.join(missing_fields)}"}
        return True, None

    def _chat_response(self, data):
        mensagem = data.get("mensagem", "")
        idioma = data.get("idioma", "pt")  # Suporte a múltiplos idiomas
        logging.info(f"Mensagem recebida: {mensagem} (Idioma: {idioma})")

        try:
            resposta_gpt = openai.ChatCompletion.create(
                model="gpt-5-turbo",
                messages=[
                    {"role": "system", "content": "Você é um assistente útil e profissional."},
                    {"role": "user", "content": mensagem}
                ]
            )
            resposta = resposta_gpt['choices'][0]['message']['content']
        except Exception as e:
            logging.error(f"Erro ao se comunicar com o GPT-5: {e}")
            resposta = "Desculpe, não consegui processar sua solicitação no momento."

        return {"resposta": resposta, "idioma": idioma}

# Configuração do servidor
def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    init_db()
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info(f"Servidor iniciado na porta {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    porta = int(os.getenv("PORT", 5000))
    run(port=porta)