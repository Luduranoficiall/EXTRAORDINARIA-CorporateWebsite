# install-all.ps1

Este script PowerShell tenta automatizar a instalação de dependências e builds para os subprojetos do repositório.

Como usar (Windows PowerShell):

1. Abra PowerShell com permissões suficientes.
2. Navegue até a raiz do repositório.
3. Execute:

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\install-all.ps1
```

Logs serão gravados em `scripts/install-all.log` e logs por-projeto em cada pasta (`npm-install.log`, `pip-install.log`, `mvn-build.log`, `dotnet-build.log`).

Observações:
- O script checa se `npm`, `python`, `mvn` e `dotnet` estão disponíveis antes de rodar os passos correspondentes.
- Em ambientes com gerenciadores específicos (nvm, pyenv, conda), assegure que o PATH esteja configurado.
