SECURITY SETUP - Checklist Rápido

Este arquivo reúne os passos essenciais para configurar a segurança do repositório e testar notificações Slack, além de preparar o ambiente localmente.

1) Verificar pré-requisitos locais

```
git --version
node -v
python -V
```

2) Instalar dependências Python de segurança e gerar chaves de exemplo

```
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-security.ps1
# se der erro, execute PowerShell como Administrador
```

3) Rodar runner Python (testes + fallbacks)

```
python .\languages\python\runner.py
```

4) Criar repositório remoto (opcional) e push inicial via script Python (usa GITHUB_TOKEN)

```
$env:GITHUB_TOKEN='ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
python .\languages\python\gh_push_via_token.py corporate-website-development --private
Remove-Item Env:\GITHUB_TOKEN
```

5) Configurar Slack (Incoming Webhook) e adicionar SLACK_WEBHOOK como secret

```
# criar webhook no Slack (GUI) -> copie a URL
$webhook='https://hooks.slack.com/services/T0000/B0000/XXXXXXXXXXXXXXXX'
gh secret set SLACK_WEBHOOK --body $webhook
```

6) Testar notificação Slack

```
# No GitHub: Actions -> Slack Test Notification -> Run workflow
# ou via gh:
gh workflow run slack-test.yml -f message="Teste: integração Slack configurada"
```

7) Boas práticas finais
- Não comite chaves privadas (verifique security/keys está no .gitignore).
- Use Key Vault / KMS em produção para armazenar chaves.
- Configure branch protection e exija checagens CodeQL/CI antes de merge.

Se encontrar erros ao rodar qualquer passo, cole aqui a saída curta e eu analiso e corrijo.
