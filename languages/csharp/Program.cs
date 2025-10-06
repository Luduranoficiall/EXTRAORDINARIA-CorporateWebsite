using Microsoft.Data.Sqlite;
using System.Text.Json;
using System.Security.Cryptography;

var db = "languages/csharp/data.db";

void EnsureDb()
{
    using var conn = new SqliteConnection($"Data Source={db}");
    conn.Open();
    var cmd = conn.CreateCommand();
    cmd.CommandText = "CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)";
    cmd.ExecuteNonQuery();
}

EnsureDb();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/api/collect", async (HttpContext ctx) =>
{
    using var doc = await JsonDocument.ParseAsync(ctx.Request.Body);
    if (!doc.RootElement.TryGetProperty("value", out var v))
    {
        ctx.Response.StatusCode = 400;
        await ctx.Response.WriteAsJsonAsync(new { error = "missing value" });
        return;
    }
    double value = v.GetDouble();
    using var conn = new SqliteConnection($"Data Source={db}");
    conn.Open();
    var cmd = conn.CreateCommand();
    cmd.CommandText = "INSERT INTO samples (ts,value) VALUES (datetime('now'), @p1)";
    cmd.Parameters.AddWithValue("@p1", value);
    cmd.ExecuteNonQuery();
    ctx.Response.StatusCode = 201;
    await ctx.Response.WriteAsJsonAsync(new { status = "ok" });
});

app.MapGet("/api/analyze", (HttpContext ctx) =>
{
    using var conn = new SqliteConnection($"Data Source={db}");
    conn.Open();
    var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT COUNT(*), AVG(value), AVG(value*value), MIN(value), MAX(value) FROM samples";
    using var rdr = cmd.ExecuteReader();
    if (rdr.Read())
    {
        var count = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0);
        var mean = rdr.IsDBNull(1) ? 0.0 : rdr.GetDouble(1);
        var sqmean = rdr.IsDBNull(2) ? 0.0 : rdr.GetDouble(2);
        var min = rdr.IsDBNull(3) ? 0.0 : rdr.GetDouble(3);
        var max = rdr.IsDBNull(4) ? 0.0 : rdr.GetDouble(4);
        var varv = sqmean - (mean * mean);
        if (varv < 0 && varv > -1e-12) varv = 0;
        var std = Math.Sqrt(Math.Max(0.0, varv));
        return Results.Json(new { count, mean, std, min, max });
    }
    return Results.Json(new { count = 0 });
});

app.Run();
