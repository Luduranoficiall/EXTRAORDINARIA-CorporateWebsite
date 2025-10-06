package org.extra.crypto;

import org.junit.jupiter.api.Test;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CryptoAppTest {

    @Test
    public void genKeysAndEncryptDecrypt() throws Exception {
        CryptoApp.genKeys();
        Path tmp = Files.createTempFile("plaintext", ".txt");
        Files.writeString(tmp, "Mensagem de teste");
        CryptoApp.encrypt(tmp);
        Path enc = tmp.resolveSibling(tmp.getFileName().toString()+".enc");
        assertTrue(Files.exists(enc));
        CryptoApp.decrypt(enc);
        Path dec = tmp.resolveSibling(tmp.getFileName().toString()+".enc.dec");
        assertTrue(Files.exists(dec));
    }
}
