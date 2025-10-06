import io
import os
from typing import Optional

from .base import StorageProvider


class GoogleDriveStorageProvider(StorageProvider):
    SCOPES = [
        "https://www.googleapis.com/auth/drive.file",
    ]

    def __init__(self):
        # Lazy imports to keep optional
        from googleapiclient.discovery import build  # type: ignore
        from google.oauth2 import service_account  # type: ignore
        from google.oauth2.credentials import Credentials  # type: ignore

        creds = None

    sa_json = os.getenv("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON")
    subject = os.getenv("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT")
        client_id = os.getenv("GOOGLE_DRIVE_CLIENT_ID")
        client_secret = os.getenv("GOOGLE_DRIVE_CLIENT_SECRET")
        refresh_token = os.getenv("GOOGLE_DRIVE_REFRESH_TOKEN")

        if sa_json:
            # Service account (JSON string or path)
            import json

            try:
                info = json.loads(sa_json)
            except Exception:
                # treat as path
                with open(sa_json, "r", encoding="utf-8") as f:
                    info = json.load(f)
            creds = service_account.Credentials.from_service_account_info(info, scopes=self.SCOPES, subject=subject)
        elif client_id and client_secret and refresh_token:
            # OAuth with pre-obtained refresh token
            creds = Credentials(
                None,
                refresh_token=refresh_token,
                token_uri="https://oauth2.googleapis.com/token",
                client_id=client_id,
                client_secret=client_secret,
                scopes=self.SCOPES,
            )
        else:
            raise RuntimeError(
                "Configure GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON or GOOGLE_DRIVE_CLIENT_ID/SECRET/REFRESH_TOKEN"
            )

        self.parent_folder = os.getenv("GOOGLE_DRIVE_PARENT_FOLDER_ID")  # optional
        self.service = build("drive", "v3", credentials=creds)

    def _resolve_file_id(self, key: str) -> str:
        # Accept raw fileId or prefixed id:FILEID
        if key.startswith("id:"):
            return key[3:]
        if "/" not in key and "\\" not in key:
            # looks like an ID
            return key
        # For simplicity, we don't resolve virtual paths here; require id for download/delete.
        raise ValueError("Provide Google Drive file id (use the 'uri' returned by upload)")

    def upload(self, key: str, data: bytes, content_type: Optional[str] = None) -> str:
        from googleapiclient.http import MediaIoBaseUpload  # type: ignore

        body = {"name": key}
        if self.parent_folder:
            body["parents"] = [self.parent_folder]
        media = MediaIoBaseUpload(io.BytesIO(data), mimetype=content_type or "application/octet-stream", resumable=False)
    file = self.service.files().create(body=body, media_body=media, fields="id", supportsAllDrives=True).execute()
        file_id = file.get("id")
        return f"gdrive://{file_id}"

    def download(self, key: str) -> bytes:
        from googleapiclient.http import MediaIoBaseDownload  # type: ignore

        file_id = self._resolve_file_id(key)
        request = self.service.files().get_media(fileId=file_id)
        buf = io.BytesIO()
        downloader = MediaIoBaseDownload(buf, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
        return buf.getvalue()

    def delete(self, key: str) -> None:
        file_id = self._resolve_file_id(key)
    self.service.files().delete(fileId=file_id, supportsAllDrives=True).execute()
