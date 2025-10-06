Java Professional Module - Crypto Tools

This module provides a professional Java CLI for hybrid encryption (RSA-OAEP + AES-GCM).

Prerequisites:
- Java 17 JDK
- Maven 3.8+

Build and test locally (PowerShell):

mvn -f languages/java clean package

Run tests:

mvn -f languages/java test

Generate keys:

java -jar languages/java/target/crypto-tools-0.1.0.jar gen-keys

Encrypt a file:

java -jar languages/java/target/crypto-tools-0.1.0.jar encrypt path\\to\\file.txt

Decrypt a file:

java -jar languages/java/target/crypto-tools-0.1.0.jar decrypt path\\to\\file.txt.enc

Docker (build image after packaging):

# from project root
mvn -f languages/java clean package
docker build -f languages/java/Dockerfile -t crypto-tools:0.1 .

to run:
docker run --rm -v ${PWD}/languages/java:/data crypto-tools:0.1 gen-keys
