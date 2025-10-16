#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EXTRAORDINÁRIA.AI - Servidor Web Permanente
Mantém o site online 24/7 automaticamente
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path
import threading
import time

# Configurações
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler customizado com CORS e logging melhorado"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Habilitar CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Log customizado com timestamp"""
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def open_browser():
    """Abre o navegador automaticamente após 2 segundos"""
    time.sleep(2)
    url = f"http://localhost:{PORT}"
    print(f"\n🌐 Abrindo navegador em: {url}\n")
    webbrowser.open(url)

def start_server():
    """Inicia o servidor HTTP"""
    os.chdir(DIRECTORY)
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print("\n" + "="*70)
            print("🚀 EXTRAORDINÁRIA.AI - SERVIDOR INICIADO COM SUCESSO!")
            print("="*70)
            print(f"\n📍 Diretório: {DIRECTORY}")
            print(f"\n🌐 ACESSOS DISPONÍVEIS:")
            print(f"   • Local:          http://localhost:{PORT}")
            print(f"   • Rede Interna:   http://192.168.0.189:{PORT}")
            print(f"   • CEO Dashboard:  http://localhost:{PORT}/dashboard.html")
            print(f"\n🔐 Credenciais Dashboard:")
            print(f"   Email: ceo@extraordinaria.ai")
            print(f"   Senha: EXTRAORDINARIA2024")
            print("\n" + "="*70)
            print("✅ Servidor rodando permanentemente...")
            print("⚠️  Pressione Ctrl+C para parar")
            print("="*70 + "\n")
            
            # Abre navegador em thread separada
            threading.Thread(target=open_browser, daemon=True).start()
            
            # Mantém servidor rodando
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n⚠️  Servidor interrompido pelo usuário")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Porta já em uso
            print(f"\n❌ ERRO: Porta {PORT} já está em uso!")
            print(f"💡 Solução: Feche o outro servidor ou use outra porta\n")
        else:
            print(f"\n❌ ERRO: {e}\n")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ ERRO INESPERADO: {e}\n")
        sys.exit(1)

if __name__ == "__main__":
    print("\n🔄 Iniciando EXTRAORDINÁRIA.AI...\n")
    start_server()
