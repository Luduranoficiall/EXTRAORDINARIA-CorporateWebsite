"""Equivalente em Python para o exemplo em C.
Tenta compilar o `languages/c/hello.c` se gcc estiver disponível; caso contrário, executa uma versão puramente em Python.
"""
from __future__ import annotations
import shutil
import subprocess
import sys
from pathlib import Path


def run() -> int:
    c_path = Path(__file__).parents[1] / "c" / "hello.c"
    if shutil.which("gcc") and c_path.exists():
        print("[c_equivalent] gcc encontrado, compilando hello.c...")
        out = Path.cwd() / "hello_c_exec"
        try:
            subprocess.check_call(["gcc", str(c_path), "-o", str(out)])
            print("[c_equivalent] executando binário compilado:")
            subprocess.check_call([str(out)])
            return 0
        except subprocess.CalledProcessError as e:
            print("[c_equivalent] falha ao compilar/executar:", e)
            return 2
    else:
        print("[c_equivalent] gcc não encontrado ou arquivo C ausente. Rodando fallback em Python:")
        print("Hello, C (Python fallback)!")
        return 0


if __name__ == "__main__":
    raise SystemExit(run())
