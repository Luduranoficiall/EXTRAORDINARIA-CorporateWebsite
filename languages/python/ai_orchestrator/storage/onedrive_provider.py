from .base import StorageProvider


class OneDriveStorageProvider(StorageProvider):
    def upload(self, key: str, data: bytes, content_type: str | None = None) -> str:
        raise NotImplementedError("OneDrive integration not implemented yet.")

    def download(self, key: str) -> bytes:
        raise NotImplementedError("OneDrive integration not implemented yet.")

    def delete(self, key: str) -> None:
        raise NotImplementedError("OneDrive integration not implemented yet.")
