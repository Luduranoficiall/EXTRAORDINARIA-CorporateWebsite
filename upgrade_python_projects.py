#!/usr/bin/env python3
"""
Script para atualizar todos os projetos Python
Extraordinaria.ai - Upgrade Automatico
"""

import os
import subprocess
import sys

PYTHON_PROJECTS = [
    {
        "name": "CorporateWebsite - Python Base",
        "path": r"C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\python"
    },
    {
        "name": "CorporateWebsite - AI Orchestrator",
        "path": r"C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\python\ai_orchestrator"
    },
    {
        "name": "CorporateWebsite - Python App",
        "path": r"C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\python-app"
    },
    {
        "name": "Extraordinaria Site - Backend",
        "path": r"C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\extraordinaria_site\backend"
    }
]

def run_command(cmd, cwd=None):
    """Execute um comando e retorna o resultado"""
    try:
        result = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
        return result.returncode == 0, result.stdout + result.stderr
    except Exception as e:
        return False, str(e)

def main():
    print("=" * 60)
    print("ATUALIZACAO AUTOMATICA DE PROJETOS PYTHON")
    print("=" * 60)
    print()
    
    for project in PYTHON_PROJECTS:
        name = project["name"]
        path = project["path"]
        req_file = os.path.join(path, "requirements.txt")
        
        if not os.path.exists(req_file):
            print(f"⚠️  PULADO: {name} (requirements.txt não encontrado)")
            continue
        
        print(f"📦 Processando: {name}")
        print(f"   Caminho: {path}")
        
        # Verificar se venv existe
        venv_path = os.path.join(path, "venv")
        if not os.path.exists(venv_path):
            print("   └─ Criando ambiente virtual...")
            success, output = run_command(f"{sys.executable} -m venv venv", cwd=path)
            if not success:
                print(f"      ❌ Erro: {output}")
                continue
        
        # Atualizar pip
        print("   ├─ Atualizando pip/setuptools/wheel...")
        python_exe = os.path.join(venv_path, "Scripts", "python.exe")
        
        success, _ = run_command(f"{python_exe} -m pip install --upgrade pip setuptools wheel", cwd=path)
        if not success:
            print("      ⚠️  Erro ao atualizar pip")
        
        # Atualizar requirements
        print("   ├─ Atualizando packages de requirements.txt...")
        success, output = run_command(f"{python_exe} -m pip install --upgrade -r requirements.txt", cwd=path)
        if not success:
            print(f"      ⚠️  Alguns pacotes podem ter falhado")
        
        # Gerar novo requirements.txt
        print("   ├─ Gerando requirements_updated.txt...")
        success, output = run_command(f"{python_exe} -m pip freeze > requirements_updated.txt", cwd=path)
        
        print("   └─ ✅ Concluído")
        print()
    
    print("=" * 60)
    print("✅ ATUALIZACAO PYTHON CONCLUIDA COM SUCESSO!")
    print("=" * 60)

if __name__ == "__main__":
    main()
