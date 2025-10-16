# 📚 GUIA RAPIDO - COMANDOS UTEIS POS-UPGRADE

## 🚀 EXECUTAR PROJETOS

### Java
```powershell
# crypto-tools (linha de comando CLI)
java -jar C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\java\target\crypto-tools-0.1.0.jar

# springapp (Spring Boot web)
java -jar C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\java\springapp\target\springapp-0.1.0.jar
# Acesso em: http://localhost:8080
```

### Node.js / React
```powershell
cd C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite
npm run dev          # Desenvolvimento
npm run build        # Build otimizado
npm start            # Produção
```

### Python
```powershell
# Ativar venv
cd C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\python
.\venv\Scripts\Activate.ps1

# Executar aplicação
python app.py

# Desativar venv
deactivate
```

---

## 🧪 TESTES

### Java
```bash
# crypto-tools
cd CorporateWebsite\languages\java
mvn test

# springapp
cd CorporateWebsite\languages\java\springapp
mvn test
```

### Python
```bash
# Dentro do venv ativado:
pytest

# Com cobertura:
pytest --cov=.
```

### Node.js
```bash
cd CorporateWebsite
npm test              # Executar testes
npm run coverage      # Com cobertura
```

---

## 📦 DEPENDENCIAS

### Adicionar novo pacote Node.js
```powershell
npm install <nome-do-pacote>
npm audit fix         # Se houver vulnerabilidades
```

### Adicionar novo pacote Python
```powershell
# 1. Ativar venv
.\venv\Scripts\Activate.ps1

# 2. Instalar
pip install <nome-do-pacote>

# 3. Atualizar requirements.txt
pip freeze > requirements.txt
```

### Adicionar nova dependência Java
```xml
<!-- Adicionar ao pom.xml: -->
<dependency>
    <groupId>com.exemplo</groupId>
    <artifactId>biblioteca</artifactId>
    <version>1.0.0</version>
</dependency>

<!-- Depois rodar: -->
mvn clean compile
```

---

## 🔄 ATUALIZAR TODAS AS DEPENDENCIAS

### Node.js
```powershell
npm audit fix --force
npm update
```

### Python (para todos os projetos)
```powershell
python C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\upgrade_python_projects.py
```

### Java (recompilar)
```powershell
cd CorporateWebsite\languages\java
mvn clean compile package

cd springapp
mvn clean compile package
```

---

## 🐛 TROUBLESHOOTING

### Maven não encontrado
```powershell
$env:PATH += ";C:\Users\User\apache-maven-3.9.6\bin"
mvn --version  # Verificar
```

### Python venv não ativa
```powershell
# Solução: usar o python direto
C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite\languages\python\venv\Scripts\python.exe script.py
```

### npm vulnerabilities
```powershell
npm audit              # Ver vulnerabilidades
npm audit fix          # Corrigir automaticamente
npm audit fix --force  # Força atualizacao mesmo com breaking changes
```

### Java compilation fail
```powershell
# Limpar cache e tentar novamente
mvn clean
mvn clean compile package
```

---

## 📋 VERSOES CONFIRMADAS

- **Java Target:** 21 LTS
- **Java Runtime:** 23.0.2
- **Maven:** 3.9.6
- **Node.js:** v24.10.0
- **npm:** 11.6.1
- **Spring Boot:** 3.2.4
- **React:** 18.2.0
- **Python:** 3.x

---

## 🔐 SEGURANÇA

### Verificar vulnerabilidades Node.js
```bash
npm audit
npm audit fix
```

### Verificar vulnerabilidades Python
```bash
# Dentro do venv:
pip install pip-audit
pip-audit
```

### Atualizar Maven
```bash
mvn --version  # Verificar versão
# (3.9.6+ é a recomendada)
```

---

## 📍 LOCALIZAÇÕES IMPORTANTES

| Componente | Localização |
|-----------|------------|
| Workspace | `C:\Users\User\OneDrive\Documentos\Extraordinaria.ai` |
| Maven | `C:\Users\User\apache-maven-3.9.6` |
| Java Projects | `CorporateWebsite\languages\java\{crypto-tools,springapp}` |
| Node Projects | `CorporateWebsite\` e `extraordinaria_site\` |
| Python Projects | `CorporateWebsite\languages\python\*` e `extraordinaria_site\backend\` |
| Scripts | raiz do workspace |

---

## ⏲️ DICAS DE PERFORMANCE

### Compilação Java mais rápida
```bash
# Usar apenas compile (sem test)
mvn compile -DskipTests

# Usar paralelismo
mvn -T 1C clean compile
```

### Build Node.js otimizado
```bash
npm ci              # em CI/CD (mais rápido que npm install)
npm cache clean --force  # se cache problemático
```

### Python - criação rápida de venv
```bash
python -m venv venv --upgrade-deps  # Já atualiza pip
```

---

## 📞 SUPORTE RAPIDO

| Problema | Solução |
|----------|---------|
| Maven command not found | Adicionar ao PATH ou usar caminho completo |
| npm vulnerabilities | `npm audit fix --force` |
| Python import errors | Verificar se venv está ativado |
| Java compilation errors | Verificar JDK version (deve ser 21+) |
| Port já em uso | Alterar porta em config ou matar processo |

---

## 🎯 PROXIMAS ETAPAS RECOMENDADAS

1. ✅ Testar todos os builds localmente
2. ✅ Executar testes unitários completos
3. ✅ Fazer commit dos changes em git
4. ✅ Deploy para staging/produção
5. ✅ Monitorar logs em produção
6. ✅ Planejar próximo upgrade (Java 23, Node LTS, etc.)

---

**Gerado em:** 15 de outubro de 2025  
**Versão:** 1.0  
**Atualizado por:** GitHub Copilot (Automated Upgrade)
