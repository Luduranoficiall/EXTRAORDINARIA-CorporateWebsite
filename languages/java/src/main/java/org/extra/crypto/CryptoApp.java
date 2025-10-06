package org.extra.crypto;

import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CryptoApp {

    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            System.out.println("Usage: java -jar crypto-tools.jar [gen-keys|encrypt|decrypt]");
            return;
        }

        String cmd = args[0];
        switch (cmd) {
            case "gen-keys":
                genKeys();
                break;
            case "encrypt":
                if (args.length < 2) {
                    System.err.println("Usage: encrypt <plaintext-file>");
                    return;
                }
                encrypt(Path.of(args[1]));
                break;
            case "decrypt":
                if (args.length < 2) {
                    System.err.println("Usage: decrypt <cipher-file>");
                    return;
                }
                decrypt(Path.of(args[1]));
                break;
            default:
                System.err.println("Unknown command: " + cmd);
        }
    }

    public static void genKeys() throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048);
        KeyPair kp = kpg.generateKeyPair();
        PublicKey pub = kp.getPublic();
        PrivateKey priv = kp.getPrivate();

        Files.createDirectories(Path.of("java-keys"));
        Files.writeString(Path.of("java-keys/public.pem"), "-----BEGIN PUBLIC KEY-----\n" + Base64.getEncoder().encodeToString(pub.getEncoded()) + "\n-----END PUBLIC KEY-----\n");
        Files.writeString(Path.of("java-keys/private.pem"), "-----BEGIN PRIVATE KEY-----\n" + Base64.getEncoder().encodeToString(priv.getEncoded()) + "\n-----END PRIVATE KEY-----\n");

        System.out.println("Keys generated in java-keys/");
    }

    public static void encrypt(Path plaintextFile) throws Exception {
        byte[] plaintext = Files.readAllBytes(plaintextFile);

        // generate AES key
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(256);
        SecretKey aesKey = kg.generateKey();

        // IV
        byte[] iv = new byte[12];
        java.security.SecureRandom.getInstanceStrong().nextBytes(iv);

        // AES-GCM encrypt
        Cipher aes = Cipher.getInstance("AES/GCM/NoPadding");
        aes.init(Cipher.ENCRYPT_MODE, aesKey, new GCMParameterSpec(128, iv));
        byte[] ciphertext = aes.doFinal(plaintext);
        byte[] tag = new byte[0]; // tag already appended in ciphertext with Java GCM

        // load public key
        byte[] pubBytes = Base64.getDecoder().decode(Files.readString(Path.of("java-keys/public.pem").toAbsolutePath()).replaceAll("-----.*KEY-----",""));
        java.security.spec.X509EncodedKeySpec pubSpec = new java.security.spec.X509EncodedKeySpec(pubBytes);
        java.security.KeyFactory kf = java.security.KeyFactory.getInstance("RSA");
        PublicKey pub = kf.generatePublic(pubSpec);

        // encrypt AES key with RSA-OAEP
        Cipher rsa = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        rsa.init(Cipher.ENCRYPT_MODE, pub);
        byte[] wrappedKey = rsa.doFinal(aesKey.getEncoded());

        // write out: wrappedKey || iv || ciphertext
        byte[] out = new byte[wrappedKey.length + iv.length + ciphertext.length];
        System.arraycopy(wrappedKey,0,out,0,wrappedKey.length);
        System.arraycopy(iv,0,out,wrappedKey.length,iv.length);
        System.arraycopy(ciphertext,0,out,wrappedKey.length+iv.length,ciphertext.length);

        Files.write(plaintextFile.resolveSibling(plaintextFile.getFileName().toString()+".enc"), out);
        System.out.println("Encrypted to " + plaintextFile.resolveSibling(plaintextFile.getFileName().toString()+".enc"));
    }

    public static void decrypt(Path cipherFile) throws Exception {
        byte[] in = Files.readAllBytes(cipherFile);
        // read private key
        byte[] privBytes = Base64.getDecoder().decode(Files.readString(Path.of("java-keys/private.pem")).replaceAll("-----.*KEY-----",""));
        java.security.spec.PKCS8EncodedKeySpec privSpec = new java.security.spec.PKCS8EncodedKeySpec(privBytes);
        java.security.KeyFactory kf = java.security.KeyFactory.getInstance("RSA");
        java.security.PrivateKey priv = kf.generatePrivate(privSpec);

        // wrappedKey length for 2048-bit RSA
        int wrappedLen = 256;
        byte[] wrappedKey = java.util.Arrays.copyOfRange(in, 0, wrappedLen);
        byte[] iv = java.util.Arrays.copyOfRange(in, wrappedLen, wrappedLen+12);
        byte[] ciphertext = java.util.Arrays.copyOfRange(in, wrappedLen+12, in.length);

        Cipher rsa = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        rsa.init(Cipher.DECRYPT_MODE, priv);
        byte[] aesKeyBytes = rsa.doFinal(wrappedKey);
        SecretKeySpec aesKey = new SecretKeySpec(aesKeyBytes, "AES");

        Cipher aes = Cipher.getInstance("AES/GCM/NoPadding");
        aes.init(Cipher.DECRYPT_MODE, aesKey, new GCMParameterSpec(128, iv));
        byte[] plaintext = aes.doFinal(ciphertext);

        Files.write(cipherFile.resolveSibling(cipherFile.getFileName().toString()+".dec"), plaintext);
        System.out.println("Decrypted to " + cipherFile.resolveSibling(cipherFile.getFileName().toString()+".dec"));
    }
}
