"""
Replacement for languages/c/data_collector.c implemented in pure Python.
Usage:
  python replace_c_data_collector.py <value>
Appends timestamp,value to languages/c/data.csv (creates file and folder if missing).
"""
import sys
import os
from datetime import datetime

def main():
    if len(sys.argv) < 2:
        print('Usage: python replace_c_data_collector.py <value>')
        return 1
    try:
        value = float(sys.argv[1])
    except ValueError:
        print('Value must be numeric')
        return 1
    os.makedirs('languages/c', exist_ok=True)
    path = os.path.join('languages','c','data.csv')
    ts = int(datetime.utcnow().timestamp())
    with open(path,'a', encoding='utf-8') as f:
        f.write(f"{ts},{value:.6f}\n")
    print(f'Appended {value:.6f} at {ts} to {path}')
    return 0

if __name__ == '__main__':
    sys.exit(main())
