const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const util = require('util');
const cors = require('cors');

const DB = path.join(__dirname, 'data.db');
const db = new sqlite3.Database(DB);
const dbAll = util.promisify(db.all.bind(db));
const dbRun = util.promisify(db.run.bind(db));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_samples_ts ON samples(ts)`);
});

const app = express();
app.use(bodyParser.json());
if (process.env.ENABLE_CORS === '1') app.use(cors());

function okJson(res, payload, code = 200) { return res.status(code).json(payload); }

app.post('/collect', async (req, res) => {
  try {
    const { value } = req.body || {};
    if (value === undefined || value === null || isNaN(Number(value))) return okJson(res, { error: 'missing or invalid value' }, 400);
    const ts = new Date().toISOString();
    await dbRun('INSERT INTO samples (ts, value) VALUES (?,?)', [ts, Number(value)]);
    return okJson(res, { status: 'ok' }, 201);
  } catch (err) {
    console.error('collect error', err);
    return okJson(res, { error: String(err) }, 500);
  }
});

app.get('/analyze', async (req, res) => {
  try {
    const rows = await dbAll('SELECT value FROM samples');
    if (!rows || rows.length === 0) return okJson(res, { count: 0 });
    const vals = rows.map(r => Number(r.value)).filter(v => !isNaN(v));
    const n = vals.length;
    const sum = vals.reduce((a,b) => a+b, 0);
    const mean = sum / n;
    const sqmean = vals.reduce((a,b) => a + b*b, 0)/n;
    const variance = Math.max(0, sqmean - mean*mean);
    const std = Math.sqrt(variance);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    return okJson(res, { count: n, mean, std, min, max });
  } catch (err) {
    console.error('analyze error', err);
    return okJson(res, { error: String(err) }, 500);
  }
});

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Node data collector listening on ${port}`));
