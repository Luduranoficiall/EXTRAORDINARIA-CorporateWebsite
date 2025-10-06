package org.extra.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class EncryptedCollector {
    private final String dbPath;
    private final String jdbcUrl;

    public EncryptedCollector(String dbPath) {
        this.dbPath = dbPath;
        this.jdbcUrl = "jdbc:sqlite:" + dbPath;
    }

    public void init() throws Exception {
        Path p = Path.of(dbPath).toAbsolutePath().getParent();
        if (p != null && !Files.exists(p)) Files.createDirectories(p);
        try (Connection conn = DriverManager.getConnection(jdbcUrl)) {
            try (Statement st = conn.createStatement()) {
                st.execute("CREATE TABLE IF NOT EXISTS encrypted_samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, data TEXT)");
            }
        }
    }

    public static String encryptString(String plaintext, byte[] keyBytes) throws Exception {
        SecretKeySpec key = new SecretKeySpec(keyBytes, "AES");
        byte[] iv = new byte[12];
        java.security.SecureRandom.getInstanceStrong().nextBytes(iv);
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, iv));
        byte[] ct = cipher.doFinal(plaintext.getBytes("UTF-8"));
        byte[] out = new byte[iv.length + ct.length];
        System.arraycopy(iv,0,out,0,iv.length);
        System.arraycopy(ct,0,out,iv.length,ct.length);
        return Base64.getEncoder().encodeToString(out);
    }

    public void insertEncrypted(String base64Cipher) throws Exception {
        try (Connection conn = DriverManager.getConnection(jdbcUrl)) {
            try (PreparedStatement ps = conn.prepareStatement("INSERT INTO encrypted_samples (ts, data) VALUES (datetime('now'), ?)")) {
                ps.setString(1, base64Cipher);
                ps.executeUpdate();
            }
        }
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.out.println("Usage: EncryptedCollector <dbPath> [value] [base64Key]");
            return;
        }
        String db = args[0];
        EncryptedCollector ec = new EncryptedCollector(db);
        ec.init();
        if (args.length >= 2) {
            String val = args[1];
            byte[] key;
            if (args.length >=3) {
                key = Base64.getDecoder().decode(args[2]);
            } else {
                // generate random key and show it
                KeyGenerator kg = KeyGenerator.getInstance("AES");
                kg.init(256);
                SecretKey sk = kg.generateKey();
                key = sk.getEncoded();
                System.out.println("Generated key (base64): " + Base64.getEncoder().encodeToString(key));
            }
            String cipher = encryptString(val, key);
            ec.insertEncrypted(cipher);
            System.out.println("Inserted encrypted sample.");
        }
    }
}
