Storage providers (Local, S3) and endpoints

Endpoints
- POST /storage/upload?path=<key>  multipart/form-data file
- GET  /storage/download?path=<key>  -> { ok, base64 }
- DELETE /storage/delete?path=<key>  -> { ok }

Configure provider
- STORAGE_PROVIDER=local (default) or s3
- For local: STORAGE_DIR=/data/storage (mounted volume)
- For S3: S3_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, optional S3_ENDPOINT_URL

Future providers
- Google Drive, Dropbox, OneDrive, iCloud: adapters to be added with OAuth flows.

Dropbox (ativo)
- STORAGE_PROVIDER=dropbox
- DROPBOX_ACCESS_TOKEN=<token>
- Crie um app no Dropbox (App Console) com escopos files.content.write/read.

Google Drive (ativo)
- STORAGE_PROVIDER=gdrive
- Opção A (Service Account):
	- GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON='{"type":"service_account", ...}' (ou caminho para o .json)
	- GOOGLE_DRIVE_PARENT_FOLDER_ID=<opcional: pasta destino>
- Opção B (OAuth com refresh token):
	- GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN
	- Scopes: https://www.googleapis.com/auth/drive.file
	- Parent opcional: GOOGLE_DRIVE_PARENT_FOLDER_ID
