package org.extra.springapp.controller;

import org.extra.springapp.service.DataService;
import org.extra.springapp.util.CryptoUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {
    private final DataService dataService;

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @PostMapping("/collect")
    public ResponseEntity<?> collect(@RequestBody Map<String,Object> body) {
        Object v = body.get("value");
        if (v == null) return ResponseEntity.badRequest().body(Map.of("error","missing value"));
        double value = Double.parseDouble(v.toString());
        dataService.insert(value);
        return ResponseEntity.status(201).body(Map.of("status","ok"));
    }

    @GetMapping("/analyze")
    public ResponseEntity<?> analyze() {
        Map<String,Object> res = dataService.analyze();
        return ResponseEntity.ok(res);
    }

    @PostMapping("/encrypt")
    public ResponseEntity<?> encrypt(@RequestBody Map<String,Object> body) throws Exception {
        String text = (String) body.get("value");
        if (text==null) return ResponseEntity.badRequest().body(Map.of("error","missing value"));
        var keyPair = CryptoUtil.generateRsaKeyPair();
        var pub = CryptoUtil.publicKeyToPem(keyPair.getPublic());
        var priv = CryptoUtil.privateKeyToPem(keyPair.getPrivate());
        var wrapped = CryptoUtil.hybridEncrypt(text.getBytes("UTF-8"), keyPair.getPublic());
        return ResponseEntity.ok(Map.of("cipher", wrapped.get("cipher"), "wrappedKey", wrapped.get("wrappedKey"), "privateKey", priv));
    }

    @PostMapping("/decrypt")
    public ResponseEntity<?> decrypt(@RequestBody Map<String,Object> body) throws Exception {
        String cipher = (String) body.get("cipher");
        String wrappedKey = (String) body.get("wrappedKey");
        String priv = (String) body.get("privateKey");
        if (cipher==null || wrappedKey==null || priv==null) return ResponseEntity.badRequest().body(Map.of("error","missing fields"));
        byte[] pt = CryptoUtil.hybridDecrypt(cipher, wrappedKey, priv);
        return ResponseEntity.ok(Map.of("plaintext", new String(pt,"UTF-8")));
    }
}
