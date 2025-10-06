package org.extra.data;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

public class DataCollectorTest {

    @Test
    public void smokeTestInsertAndAnalyze() throws Exception {
        Path tmpdir = Files.createTempDirectory("dc-test");
        String db = tmpdir.resolve("data.db").toString();
        DataCollector dc = new DataCollector(db);
        dc.init();
        dc.insertSample(10.5);
        dc.insertSample(20.0);
        Map<String,Object> res = dc.analyze();
        assertEquals(2, ((Number)res.get("count")).intValue());
        assertTrue(((Number)res.get("mean")).doubleValue() > 0);
        assertEquals(10.5, ((Number)res.get("min")).doubleValue(), 0.0001);
    }
}
