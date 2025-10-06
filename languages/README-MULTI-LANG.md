Multi-language scaffolding

This workspace now contains runnable, minimal examples across languages demonstrating:
- Data collection endpoints (Python Flask, Node Express)
- SQLite persistence (Python, Node, Java, C#, optional for others)
- Simple data analysis (Python pandas, Node basic stats, C++ stats CLI)
- Simple data appenders (C program)

Folders:
- languages/python
- languages/node
- languages/java
- languages/cpp
- languages/c
- languages/csharp

How to run quick smoke tests (PowerShell):

# Python
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r languages\python\requirements.txt
python languages\python\app.py
# then POST JSON to http://localhost:5001/collect e.g. via curl or Postman

# Node
cd languages\node
npm install
node server.js

# Java (maven)
mvn -f languages/java clean package
mvn -f languages/java test

g++ -O2 stats.cpp -o stats
gcc data_collector.c -o data_collector
dotnet restore
dotnet run -- 12.34
# C++ (requires g++)
cd languages\cpp
g++ -O2 stats.cpp -o stats
./stats data.csv

# C and C# replaced by pure Python scripts
To keep the repository simple and focused on Python as the primary language, the original C and C# examples have been replaced by pure-Python equivalents. The original C/C# source files remain in the repo for history, but CI and docs now recommend the Python replacements.

Replace C data collector (Python):
```powershell
python languages\python\replace_c_data_collector.py 12.34
```

Replace C# collector (Python):
```powershell
python languages\python\replace_csharp_collector.py 56.78
```

If you want I can convert more of your existing scripts to use these languages (for example fully moving Python scripts to Node), or add CI steps to run these services in containers.
