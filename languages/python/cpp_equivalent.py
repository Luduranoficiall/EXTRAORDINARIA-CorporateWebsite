"""Equivalente Python do exemplo C++ stats.cpp
Uso: python cpp_equivalent.py [data.csv]
Lê a primeira coluna numérica e calcula estatísticas básicas.
"""
from __future__ import annotations
import sys
from pathlib import Path
import math


def read_first_column(path: Path):
    vals = []
    with path.open('r', encoding='utf8', errors='ignore') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(',')
            tok = parts[0].strip()
            try:
                vals.append(float(tok))
            except Exception:
                continue
    return vals


def stats(vals):
    if not vals:
        return None
    n = len(vals)
    s = sum(vals)
    mean = s / n
    var = sum((x - mean) ** 2 for x in vals) / n
    std = math.sqrt(var)
    return {
        'count': n,
        'mean': mean,
        'std': std,
        'min': min(vals),
        'max': max(vals)
    }


def main(argv):
    path = Path(argv[1]) if len(argv) > 1 else Path('data.csv')
    if not path.exists():
        print(f'Cannot open {path}. Create a CSV with numeric values in first column.')
        return 1
    vals = read_first_column(path)
    if not vals:
        print('No numeric rows found')
        return 0
    st = stats(vals)
    print(f"count={st['count']} mean={st['mean']} std={st['std']} min={st['min']} max={st['max']}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
"""Equivalente em Python para o exemplo em C++.
Se cmake/compilador estiverem presentes, tenta compilar; senão, fallback Python.
"""
from __future__ import annotations
import shutil
import subprocess
import sys
from pathlib import Path


def run() -> int:
    cpp_dir = Path(__file__).parents[1] / "cpp"
    src = cpp_dir / "src" / "main.cpp"
    if shutil.which("cmake") and src.exists():
        print("[cpp_equivalent] cmake encontrado, tentando build...")
        build_dir = cpp_dir / "build_py"
        build_dir.mkdir(exist_ok=True)
        try:
            subprocess.check_call(["cmake", ".."], cwd=str(build_dir))
            subprocess.check_call(["cmake", "--build", "."], cwd=str(build_dir))
            print("[cpp_equivalent] build concluído (se houver binário, execute manualmente).")
            return 0
        except subprocess.CalledProcessError as e:
            print("[cpp_equivalent] Erro no build:", e)
            return 2
    else:
        print("[cpp_equivalent] cmake/g++ não encontrado ou fonte ausente. Rodando fallback em Python:")
        print("Hello, C++ (Python fallback)!")
        return 0


if __name__ == "__main__":
    raise SystemExit(run())
