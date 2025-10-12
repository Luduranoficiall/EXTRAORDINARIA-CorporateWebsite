// C# client (puro) para testar backend
// Compilar com: csc csharp_client.cs  (ou use dotnet new console and replace Program.cs)
// Executar: csharp_client.exe test

using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class csharp_client {
    static HttpClient _http = new HttpClient();
    const string BACKEND = "http://127.0.0.1:5000";
    public static async Task<int> Main(string[] args) {
        if (args.Length < 1) { Console.WriteLine("Usage: test | contact name email message"); return 1; }
        if (args[0] == "test") {
            var res = await _http.GetAsync(BACKEND + "/api/test");
            Console.WriteLine(await res.Content.ReadAsStringAsync());
            return 0;
        } else if (args[0] == "contact") {
            if (args.Length < 4) { Console.WriteLine("contact name email message"); return 1; }
            var name = args[1]; var email = args[2]; var message = args[3];
            var json = $"{\"nome\":\"{name}\",\"email\":\"{email}\",\"mensagem\":\"{message}\"}";
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var res = await _http.PostAsync(BACKEND + "/api/contact", content);
            Console.WriteLine(await res.Content.ReadAsStringAsync());
            return 0;
        }
        Console.WriteLine("Unknown command");
        return 1;
    }
}
