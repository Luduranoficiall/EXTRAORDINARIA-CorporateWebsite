package org.extra.springapp.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DataService {
    private final JdbcTemplate jdbc;

    public DataService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    public void insert(double value) {
        jdbc.update("CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)");
        jdbc.update("INSERT INTO samples (ts, value) VALUES (datetime('now'), ?)", value);
    }

    public Map<String,Object> analyze() {
        jdbc.execute("CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)");
        // create an index to speed up selects
        jdbc.execute("CREATE INDEX IF NOT EXISTS idx_samples_ts ON samples(ts)");

        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM samples", Integer.class);
        Double mean = jdbc.queryForObject("SELECT AVG(value) FROM samples", Double.class);
        Double sqmean = jdbc.queryForObject("SELECT AVG(value*value) FROM samples", Double.class);
        Double min = jdbc.queryForObject("SELECT MIN(value) FROM samples", Double.class);
        Double max = jdbc.queryForObject("SELECT MAX(value) FROM samples", Double.class);

        double std = 0.0;
        if (mean != null && sqmean != null) {
            double variance = sqmean - (mean * mean);
            if (variance < 0 && variance > -1e-12) variance = 0; // numeric tolerance
            std = Math.sqrt(Math.max(0.0, variance));
        }

        Map<String,Object> res = new HashMap<>();
        res.put("count", count==null?0:count);
        res.put("mean", mean==null?0.0:mean);
        res.put("std", std);
        res.put("min", min==null?0.0:min);
        res.put("max", max==null?0.0:max);
        return res;
    }
}
