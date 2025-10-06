"""Equivalente em Python para C# (.NET).
Tenta `dotnet run` se SDK disponível; caso contrário, fallback em Python.
"""
from __future__ import annotations
import shutil
import subprocess
import sys
from pathlib import Path


def run() -> int:
    proj_dir = Path(__file__).parents[1] / "csharp"
    if shutil.which("dotnet") and (proj_dir / "CorporateDemo.csproj").exists():
        print("[csharp_equivalent] dotnet disponível, tentando dotnet run...")
        try:
            subprocess.check_call(["dotnet", "run", "--project", str(proj_dir)])
            return 0
        except subprocess.CalledProcessError as e:
            print("[csharp_equivalent] Erro executando dotnet:", e)
            return 2
    else:
        print("[csharp_equivalent] dotnet não disponível ou projeto ausente. Fallback Python:")
        print("Hello, C# (Python fallback)!")
        return 0


if __name__ == "__main__":
    raise SystemExit(run())
