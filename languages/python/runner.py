"""Runner unificado para executar checks/builds em 'pure python' quando possível.

Este runner agora executa:
- testes Python (pytest)
- demo de criptografia Python (sample_crypto.py)
- equivalentes em Python para C/C++/C#
- (opcional) invoca testes Java/Maven se mvn estiver disponível
"""
from __future__ import annotations
import subprocess
import sys
import shutil
from pathlib import Path


ROOT = Path(__file__).parents[2]


def run(cmd, cwd=None):
    print(f">>> Running: {' '.join(cmd)} (cwd={cwd})")
    return subprocess.call(cmd, cwd=cwd)


def run_typescript():
    ts_dir = ROOT / 'languages' / 'typescript'
    if (ts_dir / 'package.json').exists() and shutil.which('node'):
        return run(['npm', 'ci'], cwd=str(ts_dir)) or run(['npm', 'run', 'build'], cwd=str(ts_dir))
    print('[runner] TypeScript: node/npm não disponível; pulando build TS')
    return 0


def run_python_tests():
    py_dir = ROOT / 'languages' / 'python'
    if (py_dir / 'requirements.txt').exists():
        print('[runner] Note: instale as dependências em languages/python com: pip install -r requirements.txt')
    if shutil.which(sys.executable):
        return run([sys.executable, '-m', 'pytest', '-q'], cwd=str(py_dir))
    return 0


def run_sample_crypto():
    py_dir = ROOT / 'languages' / 'python'
    script = py_dir / 'sample_crypto.py'
    if script.exists():
        return run([sys.executable, str(script)], cwd=str(py_dir))
    print('[runner] sample_crypto.py não encontrado, pulando')
    return 0


def run_equivalents():
    eq_dir = ROOT / 'languages' / 'python'
    codes = ['c_equivalent.py', 'cpp_equivalent.py', 'csharp_equivalent.py']
    rc = 0
    for c in codes:
        p = eq_dir / c
        if p.exists():
            rc = run([sys.executable, str(p)], cwd=str(eq_dir)) or rc
    return rc


def run_java_tests():
    # opcional: se mvn estiver instalado e houver módulo java, executa testes
    java_dir = ROOT / 'languages' / 'java'
    if (java_dir / 'pom.xml').exists() and shutil.which('mvn'):
        return run(['mvn', '-f', str(java_dir), 'test'])
    print('[runner] Maven não disponível ou módulo Java ausente; pulando testes Java')
    return 0


def main():
    rc = 0
    rc = run_python_tests() or rc
    rc = run_sample_crypto() or rc
    rc = run_equivalents() or rc
    rc = run_java_tests() or rc
    sys.exit(rc)


if __name__ == '__main__':
    main()
