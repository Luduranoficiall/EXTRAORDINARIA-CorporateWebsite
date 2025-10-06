import os
from .base import StorageProvider


class DropboxStorageProvider(StorageProvider):
    def __init__(self, access_token: str | None = None):
        # Lazy import to avoid hard dependency if not used
        import dropbox  # type: ignore

        token = access_token or os.getenv("DROPBOX_ACCESS_TOKEN")
        if not token:
            raise RuntimeError("DROPBOX_ACCESS_TOKEN is not set")
        self.dbx = dropbox.Dropbox(token)

    def _normalize(self, key: str) -> str:
        # Dropbox requires absolute path
        safe = key.replace("..", "_").lstrip("/")
        return f"/{safe}"

    def upload(self, key: str, data: bytes, content_type: str | None = None) -> str:
        from dropbox.files import WriteMode  # type: ignore

        path = self._normalize(key)
        self.dbx.files_upload(data, path, mode=WriteMode("overwrite"))
        return f"dropbox://{key}"

    def download(self, key: str) -> bytes:
        path = self._normalize(key)
        md, res = self.dbx.files_download(path)
        return res.content

    def delete(self, key: str) -> None:
        path = self._normalize(key)
        self.dbx.files_delete_v2(path)
