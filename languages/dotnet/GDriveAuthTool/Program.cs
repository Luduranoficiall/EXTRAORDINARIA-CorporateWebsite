using System.CommandLine;
using System.Net;
using System.Diagnostics;
using System.Text;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Requests;
using Google.Apis.Auth.OAuth2.Responses;

// Simple .NET console utility mirroring the Python helper to get a Google Drive refresh token
// Supported modes: local-server (OAuth installed app) and service-account validation

var defaultScopes = new[] { "https://www.googleapis.com/auth/drive.file" };

static string[] ParseScopes(string? scopesStr, string[] defaults)
{
    if (string.IsNullOrWhiteSpace(scopesStr)) return defaults;
    var parts = scopesStr.Replace(",", " ")
        .Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    return parts.Length > 0 ? parts : defaults;
}

static void WriteDotEnv(string path, IDictionary<string, string?> entries)
{
    var sb = new StringBuilder();
    foreach (var kv in entries)
    {
        if (kv.Value is null) continue;
        sb.Append(kv.Key).Append('=').Append(kv.Value).Append('\n');
    }
    Directory.CreateDirectory(Path.GetDirectoryName(path)!);
    File.WriteAllText(path, sb.ToString(), new UTF8Encoding(false));
}

async Task<int> RunAsync(string mode, string? clientId, string? clientSecret, string? scopes, string? dotenv,
    string? serviceAccountFile, string? subject)
{
    var parsedScopes = ParseScopes(scopes, defaultScopes);

    if (mode is "local-server")
    {
        clientId ??= Environment.GetEnvironmentVariable("GOOGLE_DRIVE_CLIENT_ID")
                ?? Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
        clientSecret ??= Environment.GetEnvironmentVariable("GOOGLE_DRIVE_CLIENT_SECRET")
                ?? Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");

        if (string.IsNullOrWhiteSpace(clientId) || string.IsNullOrWhiteSpace(clientSecret))
        {
            Console.Error.WriteLine("Defina --client-id e --client-secret ou as variáveis GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET.");
            return 2;
        }

        try
        {
            var refreshToken = await OAuthLocalServerAsync(clientId!, clientSecret!, parsedScopes);

            Console.WriteLine("\nCopie estas variáveis para seu ambiente (.env ou Secrets):");
            Console.WriteLine($"GOOGLE_DRIVE_CLIENT_ID={clientId}");
            Console.WriteLine("GOOGLE_DRIVE_CLIENT_SECRET=<seu_segredo>");
            Console.WriteLine($"GOOGLE_DRIVE_REFRESH_TOKEN={refreshToken}");

            if (!string.IsNullOrWhiteSpace(dotenv))
            {
                WriteDotEnv(dotenv!, new Dictionary<string, string?>
                {
                    ["GOOGLE_DRIVE_CLIENT_ID"] = clientId,
                    ["GOOGLE_DRIVE_CLIENT_SECRET"] = clientSecret,
                    ["GOOGLE_DRIVE_REFRESH_TOKEN"] = refreshToken,
                });
                Console.WriteLine($"\nArquivo .env salvo em: {dotenv}");
            }

            Console.WriteLine("\nPowerShell (temporário nesta sessão):");
            Console.WriteLine($"$Env:GOOGLE_DRIVE_CLIENT_ID=\"{clientId}\"");
            Console.WriteLine("$Env:GOOGLE_DRIVE_CLIENT_SECRET=\"<seu_segredo>\"");
            Console.WriteLine($"$Env:GOOGLE_DRIVE_REFRESH_TOKEN=\"{refreshToken}\"");
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Falha no fluxo OAuth: {ex.Message}");
            return 1;
        }
    }
    else if (mode is "device")
    {
        clientId ??= Environment.GetEnvironmentVariable("GOOGLE_DRIVE_CLIENT_ID")
                ?? Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
        clientSecret ??= Environment.GetEnvironmentVariable("GOOGLE_DRIVE_CLIENT_SECRET")
                ?? Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");

        if (string.IsNullOrWhiteSpace(clientId) || string.IsNullOrWhiteSpace(clientSecret))
        {
            Console.Error.WriteLine("Defina --client-id e --client-secret ou as variáveis GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET.");
            return 2;
        }

        try
        {
            var refreshToken = await OAuthConsoleAsync(clientId!, clientSecret!, parsedScopes);

            Console.WriteLine("\nCopie estas variáveis para seu ambiente (.env ou Secrets):");
            Console.WriteLine($"GOOGLE_DRIVE_CLIENT_ID={clientId}");
            Console.WriteLine("GOOGLE_DRIVE_CLIENT_SECRET=<seu_segredo>");
            Console.WriteLine($"GOOGLE_DRIVE_REFRESH_TOKEN={refreshToken}");

            if (!string.IsNullOrWhiteSpace(dotenv))
            {
                WriteDotEnv(dotenv!, new Dictionary<string, string?>
                {
                    ["GOOGLE_DRIVE_CLIENT_ID"] = clientId,
                    ["GOOGLE_DRIVE_CLIENT_SECRET"] = clientSecret,
                    ["GOOGLE_DRIVE_REFRESH_TOKEN"] = refreshToken,
                });
                Console.WriteLine($"\nArquivo .env salvo em: {dotenv}");
            }

            Console.WriteLine("\nPowerShell (temporário nesta sessão):");
            Console.WriteLine($"$Env:GOOGLE_DRIVE_CLIENT_ID=\"{clientId}\"");
            Console.WriteLine("$Env:GOOGLE_DRIVE_CLIENT_SECRET=\"<seu_segredo>\"");
            Console.WriteLine($"$Env:GOOGLE_DRIVE_REFRESH_TOKEN=\"{refreshToken}\"");
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Falha no fluxo OAuth (console): {ex.Message}");
            return 1;
        }
    }
    else if (mode is "service-account")
    {
        var saJsonEnv = Environment.GetEnvironmentVariable("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON");
        var info = ServiceAccountInfo(serviceAccountFile, saJsonEnv, parsedScopes, subject);

        Console.WriteLine("Service Account configurada. Não há refresh token nesse modo.");
        Console.WriteLine("Use estas variáveis:");
        if (info.TryGetValue("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON", out var val) && !string.IsNullOrWhiteSpace(val))
            Console.WriteLine($"GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON={val}");
        else
            Console.WriteLine("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=<JSON ou caminho para sua Service Account>");

        if (info.TryGetValue("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT", out var subj) && !string.IsNullOrWhiteSpace(subj))
            Console.WriteLine($"GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT={subj}");

        if (!string.IsNullOrWhiteSpace(dotenv))
        {
            WriteDotEnv(dotenv!, new Dictionary<string, string?>
            {
                ["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = info.GetValueOrDefault("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON") ?? "<JSON-ou-caminho>",
                ["GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT"] = info.GetValueOrDefault("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT") ?? string.Empty,
            });
            Console.WriteLine($"\nArquivo .env salvo em: {dotenv}");
        }

        Console.WriteLine("\nPowerShell (temporário nesta sessão):");
        if (info.TryGetValue("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON", out var p) && !string.IsNullOrWhiteSpace(p))
            Console.WriteLine($"$Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=\"{p}\"");
        else
            Console.WriteLine("$Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=\"<JSON ou caminho para sua Service Account>\"");
        if (info.TryGetValue("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT", out var s) && !string.IsNullOrWhiteSpace(s))
            Console.WriteLine($"$Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT=\"{s}\"");
        return 0;
    }
    else
    {
        Console.Error.WriteLine("Modo suportado: local-server ou service-account");
        return 2;
    }
}

static async Task<string> OAuthLocalServerAsync(string clientId, string clientSecret, string[] scopes)
{
    // Create a code receiver that spins up a local HTTP listener on a free port
    var receiver = new LocalServerCodeReceiver();

    var clientSecrets = new ClientSecrets
    {
        ClientId = clientId,
        ClientSecret = clientSecret
    };

    var oAuth = await GoogleWebAuthorizationBroker.AuthorizeAsync(
        clientSecrets,
        scopes,
        "user",
        CancellationToken.None,
        null,
        receiver);

    if (oAuth.Token.RefreshToken is { Length: > 0 } rt)
        return rt;

    // If refresh token is not present, attempt token exchange to force refresh issuance
    // Usually Google only issues refresh token the first time; ensure access_type=offline via receiver
    throw new TokenResponseException(new TokenErrorResponse { Error = "no_refresh_token", ErrorDescription = "Refresh token não retornado. Revogue o acesso nas Contas Google e tente novamente, garantindo consentimento offline." });
}

static async Task<string> OAuthConsoleAsync(string clientId, string clientSecret, string[] scopes)
{
    // Console prompt flow (prints URL and asks user to paste the code)
    var receiver = new ConsolePromptCodeReceiver();

    var clientSecrets = new ClientSecrets
    {
        ClientId = clientId,
        ClientSecret = clientSecret
    };

    var oAuth = await GoogleWebAuthorizationBroker.AuthorizeAsync(
        clientSecrets,
        scopes,
        "user",
        CancellationToken.None,
        null,
        receiver);

    if (oAuth.Token.RefreshToken is { Length: > 0 } rt)
        return rt;

    throw new TokenResponseException(new TokenErrorResponse { Error = "no_refresh_token", ErrorDescription = "Refresh token não retornado. Revogue o acesso nas Contas Google e tente novamente, garantindo consentimento offline." });
}

static Dictionary<string, string?> ServiceAccountInfo(
    string? saFile,
    string? saJsonEnv,
    string[] scopes,
    string? subject)
{
    var result = new Dictionary<string, string?>
    {
        ["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = null,
        ["GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT"] = subject
    };

    if (!string.IsNullOrWhiteSpace(saFile) && File.Exists(saFile))
    {
        var abs = Path.GetFullPath(saFile);
        // Validate by loading credentials
        _ = GoogleCredential.FromFile(abs)
            .CreateScoped(scopes)
            .MaybeWithSubject(subject);
        result["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = abs;
        return result;
    }

    if (!string.IsNullOrWhiteSpace(saJsonEnv))
    {
        if (File.Exists(saJsonEnv))
        {
            var abs = Path.GetFullPath(saJsonEnv);
            _ = GoogleCredential.FromFile(abs)
                .CreateScoped(scopes)
                .MaybeWithSubject(subject);
            result["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = abs;
            return result;
        }
        try
        {
            _ = GoogleCredential.FromJson(saJsonEnv)
                .CreateScoped(scopes)
                .MaybeWithSubject(subject);
            result["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = saJsonEnv;
            return result;
        }
        catch (Exception ex)
        {
            throw new ApplicationException($"GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON não é um JSON válido nem caminho de arquivo: {ex.Message}");
        }
    }

    throw new ApplicationException("Forneça --service-account-file ou a variável de ambiente GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON.");
}

// CLI setup using System.CommandLine
var modeOption = new Option<string>(name: "--mode", getDefaultValue: () => "local-server", description: "local-server | device | service-account");
var clientIdOption = new Option<string?>(name: "--client-id", description: "Client ID (GOOGLE_DRIVE_CLIENT_ID/GOOGLE_CLIENT_ID)");
var clientSecretOption = new Option<string?>(name: "--client-secret", description: "Client Secret (GOOGLE_DRIVE_CLIENT_SECRET/GOOGLE_CLIENT_SECRET)");
var scopesOption = new Option<string?>(name: "--scopes", description: "Escopos separados por vírgula ou espaço");
var dotenvOption = new Option<string?>(name: "--write-dotenv", description: "Caminho para salvar um .env");
var saFileOption = new Option<string?>(name: "--service-account-file", description: "Caminho para JSON de Service Account");
var subjectOption = new Option<string?>(name: "--subject", description: "E-mail para impersonar (Domain-wide Delegation)");

var root = new RootCommand("Google Drive auth helper (.NET)");
root.AddOption(modeOption);
root.AddOption(clientIdOption);
root.AddOption(clientSecretOption);
root.AddOption(scopesOption);
root.AddOption(dotenvOption);
root.AddOption(saFileOption);
root.AddOption(subjectOption);

root.SetHandler(async (string mode, string? cid, string? cs, string? sc, string? dotenv, string? saFile, string? subject) =>
{
    var exit = await RunAsync(mode, cid, cs, sc, dotenv, saFile, subject);
    Environment.ExitCode = exit;
}, modeOption, clientIdOption, clientSecretOption, scopesOption, dotenvOption, saFileOption, subjectOption);

await root.InvokeAsync(Environment.GetCommandLineArgs());

// Helper to set subject only when provided
static class GoogleCredentialExtensions
{
    public static GoogleCredential MaybeWithSubject(this GoogleCredential cred, string? subject)
    {
        return string.IsNullOrWhiteSpace(subject) ? cred : cred.CreateWithUser(subject);
    }
}

// A simple ICodeReceiver that prints the auth URL and prompts user for the auth code (OOB/console style)
internal sealed class ConsolePromptCodeReceiver : ICodeReceiver
{
    public string RedirectUri => "urn:ietf:wg:oauth:2.0:oob";

    public Task<AuthorizationCodeResponseUrl> ReceiveCodeAsync(AuthorizationCodeRequestUrl url, CancellationToken taskCancellationToken)
    {
        var authUri = url.Build().AbsoluteUri;
        Console.WriteLine("Abra esta URL no navegador e autorize o acesso:");
        Console.WriteLine(authUri);
        TryOpenBrowser(authUri);
        Console.Write("\nCole aqui o código de autorização e pressione Enter: ");
        var code = Console.ReadLine();
        return Task.FromResult(new AuthorizationCodeResponseUrl { Code = code });
    }

    private static void TryOpenBrowser(string url)
    {
        try
        {
            var psi = new ProcessStartInfo
            {
                FileName = url,
                UseShellExecute = true
            };
            Process.Start(psi);
        }
        catch { /* ignore */ }
    }
}
