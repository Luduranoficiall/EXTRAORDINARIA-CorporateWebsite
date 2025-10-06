package org.extra.data;

import java.sql.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

public class DataCollector {
    private final String dbPath;
    private final String jdbcUrl;

    public DataCollector(String dbPath) {
        this.dbPath = dbPath;
        this.jdbcUrl = "jdbc:sqlite:" + dbPath;
    }

    public void init() throws Exception {
        Path p = Path.of(dbPath).toAbsolutePath().getParent();
        if (p != null && !Files.exists(p)) Files.createDirectories(p);
        try (Connection conn = DriverManager.getConnection(jdbcUrl)) {
            try (Statement st = conn.createStatement()) {
                st.execute("CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)");
            }
        }
    }

    public void insertSample(double value) throws Exception {
        try (Connection conn = DriverManager.getConnection(jdbcUrl)) {
            try (PreparedStatement ps = conn.prepareStatement("INSERT INTO samples (ts, value) VALUES (datetime('now'), ?)")) {
                ps.setDouble(1, value);
                ps.executeUpdate();
            }
        }
    }

    public Map<String, Object> analyze() throws Exception {
        try (Connection conn = DriverManager.getConnection(jdbcUrl)) {
            try (Statement st = conn.createStatement()) {
                try (ResultSet rs = st.executeQuery("SELECT COUNT(*) as cnt, AVG(value) as mean, MIN(value) as mn, MAX(value) as mx FROM samples")) {
                    Map<String,Object> out = new HashMap<>();
                    if (rs.next()) {
                        out.put("count", rs.getInt("cnt"));
                        out.put("mean", rs.getDouble("mean"));
                        out.put("min", rs.getDouble("mn"));
                        out.put("max", rs.getDouble("mx"));
                    }
                    return out;
                }
            }
        }
    }

    // Simple CLI for Java pure usage
    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            System.out.println("DataCollector CLI\nUsage:\n  java org.extra.data.DataCollector init <dbPath>\n  java org.extra.data.DataCollector insert <dbPath> <value>\n  java org.extra.data.DataCollector analyze <dbPath>");
            return;
        }
        String cmd = args[0];
        if ("init".equals(cmd) && args.length>=2) {
            DataCollector dc = new DataCollector(args[1]);
            dc.init();
            System.out.println("Init done: " + args[1]);
            return;
        }
        if ("insert".equals(cmd) && args.length>=3) {
            DataCollector dc = new DataCollector(args[1]);
            double v = Double.parseDouble(args[2]);
            dc.insertSample(v);
            System.out.println("Inserted: " + v);
            return;
        }
        if ("analyze".equals(cmd) && args.length>=2) {
            DataCollector dc = new DataCollector(args[1]);
            Map<String,Object> res = dc.analyze();
            System.out.println(res.toString());
            return;
        }
        System.err.println("Invalid args");
    }
}
