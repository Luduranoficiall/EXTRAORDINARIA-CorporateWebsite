// Java client (puro) para testar backend endpoints
// Compilar: javac java_client.java
// Rodar: java java_client test

import java.io.*;
import java.net.*;

public class java_client {
    private static final String BACKEND = "http://127.0.0.1:5000";

    public static void main(String[] args) throws Exception {
        if (args.length < 1) { System.out.println("Usage: test | contact name email message"); return; }
        if (args[0].equals("test")) {
            System.out.println(get(BACKEND + "/api/test"));
        } else if (args[0].equals("contact")) {
            if (args.length < 4) { System.out.println("contact name email message"); return; }
            String name = args[1], email = args[2], message = args[3];
            String json = String.format("{\"nome\":\"%s\",\"email\":\"%s\",\"mensagem\":\"%s\"}", name, email, message);
            System.out.println(post(BACKEND + "/api/contact", json));
        }
    }

    public static String get(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        int status = conn.getResponseCode();
        InputStream in = (status >= 200 && status < 300) ? conn.getInputStream() : conn.getErrorStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        String line; StringBuilder sb = new StringBuilder();
        while((line = br.readLine()) != null) sb.append(line);
        conn.disconnect();
        return sb.toString();
    }

    public static String post(String urlStr, String json) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; utf-8");
        conn.setDoOutput(true);
        try(OutputStream os = conn.getOutputStream()) { byte[] input = json.getBytes("utf-8"); os.write(input, 0, input.length); }
        int status = conn.getResponseCode();
        InputStream in = (status >= 200 && status < 300) ? conn.getInputStream() : conn.getErrorStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(in, "utf-8"));
        String line; StringBuilder sb = new StringBuilder();
        while((line = br.readLine()) != null) sb.append(line);
        conn.disconnect();
        return sb.toString();
    }
}
