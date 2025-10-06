# Segurança e criptografia

Este diretório contém utilitários Python para geração de chaves e encriptação de arquivos.

Arquivos principais:
- `crypto.py` — funções para RSA e Fernet (geração, encriptação, decriptação)
- `keys_cli.py` — CLI para gerar chaves (RSA e Fernet) em `security/keys`
- `file_crypto.py` — encripta/decripta arquivos usando Fernet

Fluxo recomendado (E2E) para dados sensíveis do CEO/Clientes:

1. Gerar chaves em ambiente seguro (máquina administrada ou HSM):
   - `python security/keys_cli.py genrsa` — gera `security/keys/private.pem` e `public.pem`
   - `python security/keys_cli.py genfernet` — gera `security/keys/fernet.key`

2. Armazenamento de chaves:
   - Em produção, utilize um serviço de gerenciamento de chaves (HSM, Azure Key Vault, AWS KMS, Google KMS).
   - Nunca comite chaves privadas no repositório. Os scripts acima são para ambientes controlados.

3. Encriptação de dados em trânsito e em repouso:
   - Use TLS/HTTPS para comunicação de rede (configurar servidor web com certificados válidos).
   - Para dados em repouso, encripte com Fernet (symmetric) e proteja a chave Fernet com KMS/HSM.

4. Uso para mensagens sensíveis entre CEO e serviços:
   - O serviço servidor pode possuir a chave pública do CEO para encriptar pequenos segredos.
   - Para arquivos maiores, encriptar com Fernet e então encriptar a chave Fernet com a chave pública RSA do destinatário.

5. Rotação de chaves:
   - Implemente políticas de rotação periódica de chaves e mantenha metadados de versão de chave.

6. Auditoria e logs:
   - Registre eventos de acesso a chaves (em servidor de auditoria). Não logar conteúdo sensível.

Exemplo rápido (arquivo):
```powershell
python security/keys_cli.py genfernet
python security/file_crypto.py encrypt security/keys/fernet.key secret.txt secret.txt.enc
```
