// C++ client usando libcurl para GET /api/test e POST /api/contact
// Requer libcurl (instalar e linkar com -lcurl)

#include <iostream>
#include <string>
#include <curl/curl.h>

static size_t write_cb(void* contents, size_t size, size_t nmemb, void* userp) {
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int call_test(const std::string& backend) {
    CURL* curl = curl_easy_init();
    if(!curl) return 1;
    std::string url = backend + "/api/test";
    std::string response;
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
    CURLcode res = curl_easy_perform(curl);
    if(res != CURLE_OK) {
        std::cerr << "curl error: " << curl_easy_strerror(res) << std::endl;
        curl_easy_cleanup(curl);
        return 2;
    }
    std::cout << response << std::endl;
    curl_easy_cleanup(curl);
    return 0;
}

int call_contact(const std::string& backend, const std::string& name, const std::string& email, const std::string& message) {
    CURL* curl = curl_easy_init();
    if(!curl) return 1;
    std::string url = backend + "/api/contact";
    std::string json = "{\"nome\":\"" + name + "\",\"email\":\"" + email + "\",\"mensagem\":\"" + message + "\"}";
    struct curl_slist* headers = NULL;
    headers = curl_slist_append(headers, "Content-Type: application/json");
    std::string response;
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json.c_str());
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
    CURLcode res = curl_easy_perform(curl);
    if(res != CURLE_OK) {
        std::cerr << "curl error: " << curl_easy_strerror(res) << std::endl;
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
        return 2;
    }
    std::cout << response << std::endl;
    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);
    return 0;
}

int main(int argc, char** argv) {
    std::string backend = "http://127.0.0.1:5000";
    if(argc < 2) {
        std::cerr << "Usage: cpp_client test | contact <name> <email> <message>" << std::endl;
        return 1;
    }
    std::string cmd = argv[1];
    if(cmd == "test") return call_test(backend);
    if(cmd == "contact") {
        if(argc < 5) { std::cerr << "contact requires name email message\n"; return 1; }
        return call_contact(backend, argv[2], argv[3], argv[4]);
    }
    std::cerr << "Unknown command" << std::endl;
    return 1;
}
