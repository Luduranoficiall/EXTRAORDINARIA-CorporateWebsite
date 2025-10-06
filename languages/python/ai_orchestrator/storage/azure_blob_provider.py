from .base import StorageProvider


class AzureBlobStorageProvider(StorageProvider):
    def upload(self, key: str, data: bytes, content_type: str | None = None) -> str:
        raise NotImplementedError("Azure Blob Storage integration not implemented yet.")

    def download(self, key: str) -> bytes:
        raise NotImplementedError("Azure Blob Storage integration not implemented yet.")

    def delete(self, key: str) -> None:
        raise NotImplementedError("Azure Blob Storage integration not implemented yet.")
