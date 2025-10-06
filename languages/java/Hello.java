import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class Hello {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello from Java - AES-GCM demo");
        String plaintext = "Mensagem secreta do CEO";

        // Gera chave AES 128
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(128);
        SecretKey key = keyGen.generateKey();

        // IV (não seguro para produção gerar IV assim; apenas demo)
        byte[] iv = new byte[12];
        java.security.SecureRandom.getInstanceStrong().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // Usando AES/GCM/NoPadding - em Java 8 pode precisar de JCE moderno
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, key, new javax.crypto.spec.GCMParameterSpec(128, iv));
        byte[] encrypted = cipher.doFinal(plaintext.getBytes("UTF-8"));

        String b64Key = Base64.getEncoder().encodeToString(key.getEncoded());
        String b64Iv = Base64.getEncoder().encodeToString(iv);
        String b64Cipher = Base64.getEncoder().encodeToString(encrypted);

        System.out.println("Key (base64): " + b64Key);
        System.out.println("IV  (base64): " + b64Iv);
        System.out.println("Cipher(base64): " + b64Cipher);

        // Decrypt
        Cipher decipher = Cipher.getInstance("AES/GCM/NoPadding");
        decipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(Base64.getDecoder().decode(b64Key), "AES"), new javax.crypto.spec.GCMParameterSpec(128, Base64.getDecoder().decode(b64Iv)));
        byte[] decrypted = decipher.doFinal(Base64.getDecoder().decode(b64Cipher));

        System.out.println("Decrypted: " + new String(decrypted, "UTF-8"));
    }
}
