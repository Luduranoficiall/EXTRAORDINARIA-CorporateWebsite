from .base import StorageProvider


class ICloudStorageProvider(StorageProvider):
    def upload(self, key: str, data: bytes, content_type: str | None = None) -> str:
        raise NotImplementedError("iCloud integration not implemented yet.")

    def download(self, key: str) -> bytes:
        raise NotImplementedError("iCloud integration not implemented yet.")

    def delete(self, key: str) -> None:
        raise NotImplementedError("iCloud integration not implemented yet.")
from .base import StorageProvider


class ICloudStorageProvider(StorageProvider):
    def __init__(self, *args, **kwargs):
        pass

    def upload(self, key: str, data: bytes, content_type: str | None = None) -> str:
        raise NotImplementedError("iCloud Drive integration requires 2FA and is not implemented yet.")

    def download(self, key: str) -> bytes:
        raise NotImplementedError("iCloud Drive integration is not implemented yet.")

    def delete(self, key: str) -> None:
        raise NotImplementedError("iCloud Drive integration is not implemented yet.")
