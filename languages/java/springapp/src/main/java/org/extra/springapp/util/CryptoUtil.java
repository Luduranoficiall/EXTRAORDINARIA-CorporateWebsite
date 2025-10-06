package org.extra.springapp.util;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class CryptoUtil {

    private static SecureRandom secureRandom() {
        try {
            return SecureRandom.getInstanceStrong();
        } catch (Throwable t) {
            return new SecureRandom();
        }
    }

    public static KeyPair generateRsaKeyPair() throws GeneralSecurityException {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048, secureRandom());
        return kpg.generateKeyPair();
    }

    private static byte[] decodePemOrBase64(String input) {
        if (input == null) throw new IllegalArgumentException("input is null");
        String trimmed = input.trim();
        if (trimmed.startsWith("-----BEGIN")) {
            // remove PEM headers/footers and whitespace
            String noHeaders = trimmed.replaceAll("(?m)-----BEGIN [^-]+-----", "")
                    .replaceAll("(?m)-----END [^-]+-----", "")
                    .replaceAll("\\s+", "");
            return Base64.getDecoder().decode(noHeaders);
        }
        // assume pure base64
        return Base64.getDecoder().decode(trimmed);
    }

    private static String toPem(String base64, String type) {
        StringBuilder sb = new StringBuilder();
        sb.append("-----BEGIN ").append(type).append("-----\n");
        int idx = 0;
        while (idx < base64.length()) {
            int end = Math.min(idx + 64, base64.length());
            sb.append(base64, idx, end).append('\n');
            idx = end;
        }
        sb.append("-----END ").append(type).append("-----\n");
        return sb.toString();
    }

    public static Map<String, String> hybridEncrypt(byte[] plaintext, PublicKey pub) throws GeneralSecurityException {
        // generate AES key
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        try {
            kg.init(256, secureRandom());
        } catch (InvalidParameterException ipe) {
            // fallback to default strength if 256 not available
            kg.init(128, secureRandom());
        }
        SecretKey aes = kg.generateKey();

        byte[] iv = new byte[12];
        secureRandom().nextBytes(iv);

        Cipher aesCipher = Cipher.getInstance("AES/GCM/NoPadding");
        aesCipher.init(Cipher.ENCRYPT_MODE, aes, new GCMParameterSpec(128, iv));
        byte[] ct = aesCipher.doFinal(plaintext);

        byte[] ivct = new byte[iv.length + ct.length];
        System.arraycopy(iv, 0, ivct, 0, iv.length);
        System.arraycopy(ct, 0, ivct, iv.length, ct.length);

        // wrap AES key with RSA OAEP
        Cipher rsa = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        rsa.init(Cipher.ENCRYPT_MODE, pub);
        byte[] wrapped = rsa.doFinal(aes.getEncoded());

        Map<String, String> out = new HashMap<>();
        out.put("cipher", Base64.getEncoder().encodeToString(ivct));
        out.put("wrappedKey", Base64.getEncoder().encodeToString(wrapped));
        return out;
    }

    public static byte[] hybridDecrypt(String cipherB64, String wrappedB64, String privPemOrBase64) throws GeneralSecurityException {
        byte[] wrapped = Base64.getDecoder().decode(wrappedB64);
        byte[] ivct = Base64.getDecoder().decode(cipherB64);
        if (ivct.length < 12) throw new GeneralSecurityException("ciphertext too short");
        byte[] iv = new byte[12];
        System.arraycopy(ivct, 0, iv, 0, 12);
        byte[] ct = new byte[ivct.length - 12];
        System.arraycopy(ivct, 12, ct, 0, ct.length);

        byte[] privBytes = decodePemOrBase64(privPemOrBase64);
        PKCS8EncodedKeySpec privSpec = new PKCS8EncodedKeySpec(privBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        PrivateKey priv = kf.generatePrivate(privSpec);

        Cipher rsa = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        rsa.init(Cipher.DECRYPT_MODE, priv);
        byte[] aesKey = rsa.doFinal(wrapped);

        SecretKeySpec aes = new SecretKeySpec(aesKey, "AES");
        Cipher aesCipher = Cipher.getInstance("AES/GCM/NoPadding");
        aesCipher.init(Cipher.DECRYPT_MODE, aes, new GCMParameterSpec(128, iv));
        return aesCipher.doFinal(ct);
    }

    public static String publicKeyToPem(PublicKey pub) {
        String base64 = Base64.getEncoder().encodeToString(pub.getEncoded());
        return toPem(base64, "PUBLIC KEY");
    }

    public static String privateKeyToPem(PrivateKey priv) {
        String base64 = Base64.getEncoder().encodeToString(priv.getEncoded());
        return toPem(base64, "PRIVATE KEY");
    }

    // Quick local test - executable main to validate basic encrypt/decrypt
    public static void main(String[] args) throws Exception {
        KeyPair kp = generateRsaKeyPair();
        String message = "Teste de criptografia híbrida - Extraordinaria.ai";
        Map<String, String> enc = hybridEncrypt(message.getBytes("UTF-8"), kp.getPublic());
        byte[] dec = hybridDecrypt(enc.get("cipher"), enc.get("wrappedKey"), Base64.getEncoder().encodeToString(kp.getPrivate().getEncoded()));
        String recovered = new String(dec, "UTF-8");
        System.out.println("Original: " + message);
        System.out.println("Recovered: " + recovered);
        if (!message.equals(recovered)) throw new IllegalStateException("roundtrip mismatch");
        System.out.println("Hybrid encrypt/decrypt OK");
    }
}
