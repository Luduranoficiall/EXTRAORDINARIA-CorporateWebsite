package org.extra.springapp.util;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class CryptoUtilTest {

    @Test
    public void testHybridRoundtrip() throws Exception {
        var kp = CryptoUtil.generateRsaKeyPair();
        String msg = "unit test message";
        Map<String, String> enc = CryptoUtil.hybridEncrypt(msg.getBytes("UTF-8"), kp.getPublic());
        byte[] dec = CryptoUtil.hybridDecrypt(enc.get("cipher"), enc.get("wrappedKey"), CryptoUtil.privateKeyToPem(kp.getPrivate()));
        assertArrayEquals(msg.getBytes("UTF-8"), dec);
    }
}
