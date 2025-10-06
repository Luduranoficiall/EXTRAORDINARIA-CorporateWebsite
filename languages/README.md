# Language scaffolding

Esta pasta contém exemplos mínimos e scripts para várias linguagens solicitadas: TypeScript, Python, C, C++ e C#.

Como usar (Windows PowerShell):

1. TypeScript
   - cd languages/typescript
   - npm ci
   - npm run build

2. Python
   - cd languages/python
   - python -m pip install -r requirements.txt
   - python -m pytest

3. C
   - cd languages/c
   - make

4. C++
   - cd languages/cpp
   - mkdir build && cd build && cmake .. && cmake --build .

5. C# (.NET 8)
   - cd languages/csharp
   - dotnet build
