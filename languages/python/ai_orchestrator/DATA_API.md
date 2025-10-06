Data API (migrated from Node)

POST /data/collect { value: number }
GET  /data/analyze -> { count, mean, std, min, max }

Config:
- DATA_DB (default /data/metrics.db)
