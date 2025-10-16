# ✅ CHECKLIST DE DEPLOY - EXTRAORDINARIA.AI POS-UPGRADE

**Data:** 15 de outubro de 2025  
**Versão:** Java 21 LTS | Node.js 24.10.0 | Python 3.x  
**Status de Leitura:** NECESSÁRIO antes de produção

---

## 🎯 PRE-REQUISITOS (ANTES DE COMEÇAR)

- [ ] Leu SUMARIO-EXECUTIVO.md
- [ ] Leu UPGRADE-FINAL-COMPLETO.md
- [ ] Leu GUIA-RAPIDO-COMANDOS.md
- [ ] Tem acesso ao ambiente de staging
- [ ] Tem permissão para deploy em produção
- [ ] Backup dos dados foi realizado
- [ ] Plano de rollback foi preparado

---

## 🔍 FASE 1: VALIDAÇÃO LOCAL (30 minutos)

### 1.1 Verificar Versões
```powershell
# Executar script de verificação
powershell -ExecutionPolicy Bypass -File "check-upgrades.ps1"
```
- [ ] Java runtime: 23.0.2 ✅
- [ ] Maven: 3.9.6 ✅
- [ ] Node.js: v24.10.0 ✅
- [ ] npm: 11.6.1 ✅
- [ ] Python: 3.x ✅

### 1.2 Testar Compilação Java
```bash
cd CorporateWebsite\languages\java
mvn clean compile package -DskipTests
```
- [ ] crypto-tools: BUILD SUCCESS ✅
- [ ] Artefato gerado: crypto-tools-0.1.0.jar ✅

```bash
cd springapp
mvn clean compile package -DskipTests
```
- [ ] springapp: BUILD SUCCESS ✅
- [ ] Artefato gerado: springapp-0.1.0.jar ✅

### 1.3 Executar Testes Unitários Java
```bash
cd CorporateWebsite\languages\java
mvn test
```
- [ ] Testes passando ✅
- [ ] Cobertura > 80% (se aplicável) ✅
- [ ] Nenhum erro crítico ✅

### 1.4 Validar Node.js
```bash
cd CorporateWebsite
npm test
npm run build
```
- [ ] Testes passando ✅
- [ ] Build sem warnings críticos ✅
- [ ] Assets gerados corretamente ✅

### 1.5 Validar Python
```bash
cd CorporateWebsite\languages\python
.\venv\Scripts\Activate.ps1
pytest
```
- [ ] Testes passando ✅
- [ ] Sem import errors ✅
- [ ] Dependências resolvidas ✅

---

## 🚀 FASE 2: DEPLOY EM STAGING (2 horas)

### 2.1 Preparação
- [ ] Ambiente staging limpo
- [ ] Variáveis de ambiente configuradas
- [ ] Secrets/credentials em lugar seguro
- [ ] Backups iniciais feitos

### 2.2 Deploy Java
```bash
# crypto-tools
java -jar crypto-tools-0.1.0.jar

# springapp (via systemd ou Docker)
java -jar springapp-0.1.0.jar --server.port=8080
```
- [ ] Serviço Java iniciado ✅
- [ ] Health check respondendo ✅
- [ ] Logs sem erros ✅
- [ ] Porta acessível ✅

### 2.3 Deploy Frontend
```bash
cd extraordinaria_site/react_frontend
npm ci --production
npm run build
# Servir assets via nginx/apache
```
- [ ] Build completado ✅
- [ ] Assets servindo corretamente ✅
- [ ] Performance aceitável ✅
- [ ] Responsivo em mobile ✅

### 2.4 Deploy Python Backend
```bash
cd extraordinaria_site/backend
source venv/bin/activate  # ou .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
gunicorn app:app -w 4
```
- [ ] Backend iniciado ✅
- [ ] Endpoints respondendo ✅
- [ ] Conexões com BD OK ✅
- [ ] Sem erros de dependência ✅

### 2.5 Testes de Integração
- [ ] API Java respondendo em /health ✅
- [ ] Frontend carregando sem 404 ✅
- [ ] Python backend processando requests ✅
- [ ] Comunicação entre serviços OK ✅
- [ ] CORS configurado corretamente ✅

### 2.6 Smoke Tests
```bash
# Testar endpoints críticos
curl http://staging:8080/api/health
curl http://staging:3000/
curl http://staging:5000/api/status
```
- [ ] Todos endpoints respondendo ✅
- [ ] Status codes corretos (200, 201, etc.) ✅
- [ ] Respostas JSON válidas ✅
- [ ] Tempo de resposta < 500ms ✅

### 2.7 Performance Baseline
- [ ] Tempo de resposta P95 < 500ms ✅
- [ ] CPU usage < 70% ✅
- [ ] Memória < 80% disponível ✅
- [ ] Não há memory leaks ✅

### 2.8 Security Checks
- [ ] SSL/TLS habilitado ✅
- [ ] Headers de segurança presentes ✅
- [ ] CORS configurado restritivamente ✅
- [ ] Sem sensitive data em logs ✅

---

## 🔄 FASE 3: VALIDACAO DE REGRESSAO (1 hora)

### 3.1 Teste de Funcionalidade Crítica
Para cada módulo principal:

**Autenticação**
- [ ] Login funciona ✅
- [ ] Sessão mantém ✅
- [ ] Logout limpa ✅

**Operações de Dados**
- [ ] Create/Read/Update/Delete funcionando ✅
- [ ] Validações aplicadas ✅
- [ ] Erros tratados corretamente ✅

**Integrações Externas**
- [ ] APIs externas respondendo ✅
- [ ] Tratamento de timeout OK ✅
- [ ] Rate limiting respeitado ✅

### 3.2 Teste de Carga (Opcional)
```bash
# Usando ferramenta como: Apache JMeter, Locust, etc
# 100 requisições/segundo por 5 minutos
```
- [ ] Sistema aguenta carga esperada ✅
- [ ] Sem timeouts ✅
- [ ] Logs não explodem ✅

### 3.3 Teste de Failover
- [ ] Quando Java service cai, sistema trata erro ✅
- [ ] Quando Python backend cai, tratado ✅
- [ ] Quando BD desconecta, reconnection OK ✅

---

## 📊 FASE 4: ANALISE E APROVACAO (30 minutos)

### 4.1 Coleta de Métricas
```
Performance:
- [ ] P99 latency: ___ ms
- [ ] P95 latency: ___ ms
- [ ] Error rate: ___%
- [ ] Uptime: ___%

Resource Usage:
- [ ] CPU average: ___%
- [ ] Memory average: ___%
- [ ] Disk I/O: ___% used
```

### 4.2 Sign-off
- [ ] Tech Lead aprovação: _______ (assinatura)
- [ ] QA Lead aprovação: _______ (assinatura)
- [ ] DevOps Lead aprovação: _______ (assinatura)
- [ ] Data: _______

### 4.3 Documentação
- [ ] Versões registradas ✅
- [ ] Build numbers registrados ✅
- [ ] Changelog atualizado ✅
- [ ] Release notes preparadas ✅

---

## 🚀 FASE 5: DEPLOY EM PRODUCAO (2 horas)

### 5.1 Preparação Final
- [ ] Ambiente produção verificado
- [ ] Backups duplos realizados
- [ ] Plano de rollback revisado
- [ ] Equipe de suporte em standby
- [ ] Comunicação do downtime enviada (se necessário)

### 5.2 Deploy

**Estratégia: Blue-Green (Recomendado)**
```
1. Manter versão atual (Blue) em produção
2. Fazer deploy da nova versão (Green) em paralelo
3. Testar completamente a versão Green
4. Switch traffic para Green
5. Manter Blue como rollback rápido
```

- [ ] Green environment criado ✅
- [ ] Deploy realizado ✅
- [ ] Tests confirmados ✅
- [ ] Traffic switch realizado ✅
- [ ] Monitoramento ativado ✅

**Estratégia: Rolling Update (Se Blue-Green não possível)**
```
1. Update servidores um por um
2. 10% first, aguardar 5 min
3. 25% next, aguardar 5 min
4. 50% next, aguardar 10 min
5. 100% final
```

- [ ] Batch 1 (10%) ✅
- [ ] Aguardado 5 min, status OK ✅
- [ ] Batch 2 (25%) ✅
- [ ] Aguardado 5 min, status OK ✅
- [ ] Batch 3 (50%) ✅
- [ ] Aguardado 10 min, status OK ✅
- [ ] Batch 4 (100%) ✅

### 5.3 Verificação Pós-Deploy
```bash
# Endpoints críticos
curl https://api.extraordinaria.ai/health
curl https://extraordinaria.ai/
curl https://api.extraordinaria.ai/api/v1/status
```
- [ ] Todos endpoints respondendo ✅
- [ ] Status HTTP 200 ✅
- [ ] Respostas corretas ✅
- [ ] SEM erros nos logs ✅

### 5.4 Monitoramento (30 minutos)
- [ ] Erro rate: 0% (ou < 0.1%) ✅
- [ ] CPU: Normal ✅
- [ ] Memória: Normal ✅
- [ ] Disk: Normal ✅
- [ ] Network: Normal ✅

### 5.5 Alertas Definidos
- [ ] Error rate > 1% ✅
- [ ] Response time > 1s ✅
- [ ] CPU > 80% ✅
- [ ] Memória > 90% ✅
- [ ] Downtime > 5s ✅

---

## ⏱️ FASE 6: POST-DEPLOY MONITORING (24-72 HORAS)

### 6.1 Monitoramento Contínuo (Primeira Hora)
- [ ] Logs sendo verificados a cada 10 min ✅
- [ ] Alertas respondidos imediatamente ✅
- [ ] Suporte em escalação disponível ✅

### 6.2 Validação Estendida (Primeiras 24 Horas)
- [ ] Sem crashes reportados ✅
- [ ] Performance mantém baseline ✅
- [ ] Usuários não reportando bugs ✅
- [ ] Analytics funcionando corretamente ✅

### 6.3 Validação Final (72 Horas)
- [ ] System operando estável ✅
- [ ] Nenhum issue crítico ✅
- [ ] Métricas dentro de normal ✅
- [ ] Satisfação de usuários OK ✅

---

## 🔙 ROLLBACK (SE NECESSÁRIO)

### Cenários que Requerem Rollback
- [ ] Error rate > 5%
- [ ] Downtime não recuperável
- [ ] Data corruption detectada
- [ ] Security issue crítica
- [ ] Componente crítico não funciona

### Procedimento de Rollback

**Se <30 minutos de deploy:**
```bash
# Blue-Green: Switch traffic para Blue
# Rolling: Stop update, wait for healthy batch
```
- [ ] Traffic revertido ✅
- [ ] Verificar status ✅
- [ ] Aguardar 5 min ✅
- [ ] Confirmar estabilidade ✅

**Se >30 minutos de deploy:**
```bash
# Recuperar backup do database
# Restaurar versão anterior
# Verificar integridade dos dados
```
- [ ] Backup restaurado ✅
- [ ] Integridade verificada ✅
- [ ] Serviços reiniciados ✅
- [ ] Usuarios notificados ✅

### Post-Rollback
- [ ] Root cause analysis iniciada ✅
- [ ] Bug fix preparado ✅
- [ ] Testes adicionais planejados ✅
- [ ] Retry agendado ✅

---

## 📋 CHECKLIST FINAL

### Antes de Deploy Inicial
- [ ] Todos os testes passando
- [ ] Documentação atualizada
- [ ] Backup duplo realizado
- [ ] Equipe em standby
- [ ] Comunicação enviada

### Durante Deploy
- [ ] Monitoramento ativado
- [ ] Logs sendo observados
- [ ] Suporte disponível
- [ ] Procedimento sendo seguido

### Após Deploy
- [ ] Versão confirmada em produção
- [ ] Endpoints verificados
- [ ] Monitoramento estendido ativado
- [ ] Report gerado
- [ ] Equipe comunicada

---

## 📊 METRICAS A MONITORAR

| Métrica | Baseline | Alerta | Crítico |
|---------|----------|--------|---------|
| Error Rate | < 0.1% | > 1% | > 5% |
| P95 Latency | < 200ms | > 500ms | > 1s |
| P99 Latency | < 500ms | > 1s | > 2s |
| CPU | < 50% | > 70% | > 85% |
| Memory | < 60% | > 80% | > 95% |
| Disk I/O | < 50% | > 70% | > 85% |

---

## 🆘 CONTATOS DE EMERGENCIA

| Papel | Nome | Telefone | Email |
|------|------|----------|-------|
| Tech Lead | _________ | _________ | _________ |
| DevOps | _________ | _________ | _________ |
| DBA | _________ | _________ | _________ |
| Security | _________ | _________ | _________ |

---

## 📞 ESCALACAO

**Nível 1 (DevOps):** 30 minutos  
**Nível 2 (Tech Lead):** 1 hora  
**Nível 3 (Management):** 2 horas  
**Rollback Decision:** Dentro de 3 horas  

---

## ✅ SIGN-OFF FINAL

Eu confirmo que:
- ✅ Preparei adequadamente para produção
- ✅ Revisei todo o procedimento
- ✅ Equipe foi notificada
- ✅ Backup realizado
- ✅ Plano de rollback preparado
- ✅ Monitoramento configurado

**Autorizado por:** _________________ (assinatura)  
**Data:** _________________  
**Hora do Deploy:** _________________

---

## 📝 ANOTACOES

```
_____________________________________________________________

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________
```

---

**Versão:** 1.0  
**Criado em:** 15 de outubro de 2025  
**Próxima Revisão:** Após deploy em produção  
**Mantido por:** DevOps Team

> ⚠️ **IMPORTANTE:** NÃO fazer deploy em produção sem preencher este checklist completamente!
