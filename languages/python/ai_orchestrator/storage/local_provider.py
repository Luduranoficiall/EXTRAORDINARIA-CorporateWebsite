import os
from typing import Optional
from .base import StorageProvider


class LocalStorageProvider(StorageProvider):
    def __init__(self, base_dir: str = "/data/storage"):
        self.base_dir = base_dir
        os.makedirs(self.base_dir, exist_ok=True)

    def _path(self, key: str) -> str:
        # avoid directory traversal
        safe_key = key.replace("..", "_").lstrip("/\\")
        return os.path.join(self.base_dir, safe_key)

    def upload(self, key: str, data: bytes, content_type: Optional[str] = None) -> str:
        path = self._path(key)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(data)
        return f"local://{key}"

    def download(self, key: str) -> bytes:
        path = self._path(key)
        with open(path, "rb") as f:
            return f.read()

    def delete(self, key: str) -> None:
        path = self._path(key)
        try:
            os.remove(path)
        except FileNotFoundError:
            pass
