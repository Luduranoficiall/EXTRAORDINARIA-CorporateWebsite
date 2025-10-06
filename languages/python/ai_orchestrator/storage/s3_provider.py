import os
from typing import Optional
import boto3
from botocore.client import Config
from .base import StorageProvider


class S3StorageProvider(StorageProvider):
    def __init__(
        self,
        bucket: Optional[str] = None,
        region: Optional[str] = None,
        endpoint_url: Optional[str] = None,
    ):
        self.bucket = bucket or os.getenv("S3_BUCKET", "extraordinaria-uploads")
        self.region = region or os.getenv("AWS_REGION", "us-east-1")
        self.s3 = boto3.client(
            "s3",
            region_name=self.region,
            endpoint_url=endpoint_url or os.getenv("S3_ENDPOINT_URL"),
            config=Config(s3={"addressing_style": "virtual"}),
        )

    def upload(self, key: str, data: bytes, content_type: Optional[str] = None) -> str:
        extra = {"ContentType": content_type} if content_type else {}
        self.s3.put_object(Bucket=self.bucket, Key=key, Body=data, **extra)
        return f"s3://{self.bucket}/{key}"

    def download(self, key: str) -> bytes:
        resp = self.s3.get_object(Bucket=self.bucket, Key=key)
        return resp["Body"].read()

    def delete(self, key: str) -> None:
        self.s3.delete_object(Bucket=self.bucket, Key=key)
