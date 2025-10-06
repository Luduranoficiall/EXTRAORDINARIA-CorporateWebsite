
  # Corporate Website Development

  This is a code bundle for Corporate Website Development. The original project is available at https://www.figma.com/design/vW7hYHVAwkaqgvuqwFMxks/Corporate-Website-Development.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Security utilities

  There are Python utilities for cryptography under `security/`.

  - Install security deps and generate example keys:

```powershell
powershell -File ./scripts/setup-security.ps1
```

  - Encrypt a file with Fernet:

```powershell
python security/file_crypto.py encrypt security/keys/fernet.key secret.txt secret.txt.enc
```

  - Create repo and push via Python (needs GITHUB_TOKEN env set):

```powershell
$env:GITHUB_TOKEN = 'ghp_...'
python languages/python/gh_push_via_token.py corporate-website-development --private
Remove-Item Env:\GITHUB_TOKEN
```

## Badges (replace OWNER and REPO)

Add these badges to show CI / CodeQL / Dependabot status. Replace `OWNER` and `REPO` with your GitHub org/user and repo name.

```md
[![CI](https://github.com/OWNER/REPO/actions/workflows/multi-language-ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/multi-language-ci.yml)
[![CodeQL](https://github.com/OWNER/REPO/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/codeql-analysis.yml)
[![Dependabot](https://github.com/OWNER/REPO/security/dependabot)](https://github.com/OWNER/REPO/security/dependabot)
```

Note: after pushing the repository, update OWNER/REPO in the links to show live badges.
  
## Slack notifications - how to configure (step-by-step)

You can enable Slack notifications for CI/CodeQL failures by creating an Incoming Webhook in Slack and adding it as a GitHub Action secret named `SLACK_WEBHOOK`.

1) Create an Incoming Webhook in Slack (GUI)
  - Open your Slack workspace -> Apps -> Manage -> Create New App -> From scratch.
  - Give it a name (e.g. "Repo Notifications") and select your workspace.
  - Go to Incoming Webhooks -> Activate Incoming Webhooks -> Add New Webhook to Workspace.
  - Choose the channel where notifications should appear and click "Allow".
  - Copy the Webhook URL (it looks like: `https://hooks.slack.com/services/T0000/B0000/XXXXXXXXXXXXXXXX`).

2) Add `SLACK_WEBHOOK` as a GitHub repository secret (GUI)
  - On GitHub, open your repository -> Settings -> Secrets and variables -> Actions -> New repository secret.
  - Name: `SLACK_WEBHOOK`
  - Value: paste the webhook URL you copied from Slack
  - Click "Add secret".

3) (Alternative) Add the secret using GitHub CLI (`gh`) — example PowerShell command:

```powershell
# first: ensure gh is authenticated (gh auth login)
$webhook = 'https://hooks.slack.com/services/T0000/B0000/XXXXXXXXXXXXXXXX'
gh secret set SLACK_WEBHOOK --body "$webhook"
```

4) Test the notification using the manual workflow
  - Go to the repository -> Actions -> Slack Test Notification -> Run workflow.
  - Optionally change the message and click "Run workflow".
  - Check your Slack channel for the test message.

Security notes
- Never commit the webhook URL or any secret to the repository.
- Use repository secrets or an external secrets manager (Vault, Key Vault, AWS Secrets Manager) for production secrets.

Slack badge (optional)

You can add a simple Slack badge to the README indicating notifications are available (replace OWNER/REPO):

```md
[![Slack notifications](https://img.shields.io/badge/Slack-notifications-blue)](https://github.com/OWNER/REPO/actions/workflows/slack-test.yml)

Supported languages (reduced)
----------------------------

This repository is now focused on these four primary, fully-supported languages:

- Python (pure)
- Java (pure)
- C++ (pure)
- Node.js (pure)

Other language examples have replacement scripts in `languages/python/` and are marked for cleanup. Use the scripts under `scripts/` to apply the repository reduction safely.

Node.js examples
----------------

There are Node.js crypto examples under `languages/node/`. Run them with:

```powershell
npm run node:crypto
```

They demonstrate AES-GCM and RSA-OAEP encrypt/decrypt using Node's built-in `crypto` module.

Chosen primary language: Python (puro)
------------------------------------

Para coleta de dados, análise e scripts operacionais preferi usar Python puro pela sua simplicidade natural e excelente ecossistema para análise (pandas). O projeto agora tem exemplos e ferramentas em Python que são a opção recomendada para evoluir a camada de dados e ETL: veja `languages/python/` — há um serviço Flask (`app.py`), um CLI (`cli.py`) e um `Dockerfile`.

Java puro (implementação profissional)
------------------------------------

Foi implementado um módulo Java "puro" com Maven localizado em `languages/java/` que inclui um `DataCollector` (JDBC + SQLite), testes JUnit e instruções para build. Use `mvn -f languages/java clean package` para compilar.

Automation & CI
---------------

There are new helper scripts to run language checks and to push via token (use with caution):

- `npm run node:runner` — runs Node demos and attempts to run Java tests (if Maven installed).
- `npm run node:push` — wrapper that attempts to create a GitHub repo and push when `GITHUB_TOKEN` and `GITHUB_OWNER` are set in the environment.

Also a Java professional module exists under `languages/java/` (Maven project) and is included in CI.
```

