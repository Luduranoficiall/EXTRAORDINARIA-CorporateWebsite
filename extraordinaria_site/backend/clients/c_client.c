/* C client usando libcurl para GET /api/test e POST /api/contact
   Requer libcurl: compile com -lcurl
   Uso: ./c_client test
        ./c_client contact "Nome" "email" "mensagem"
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

size_t write_cb(void *contents, size_t size, size_t nmemb, void *userp) {
    size_t realsize = size * nmemb;
    char **response_ptr = (char **)userp;
    *response_ptr = realloc(*response_ptr, realsize + 1);
    if(*response_ptr == NULL) return 0;
    memcpy(*response_ptr, contents, realsize);
    (*response_ptr)[realsize] = '\0';
    return realsize;
}

int call_test(const char *backend) {
    CURL *curl = curl_easy_init();
    if(!curl) return 1;
    char url[512]; snprintf(url, sizeof(url), "%s/api/test", backend);
    char *response = NULL;
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
    CURLcode res = curl_easy_perform(curl);
    if(res != CURLE_OK) {
        fprintf(stderr, "curl error: %s\n", curl_easy_strerror(res));
        curl_easy_cleanup(curl);
        free(response);
        return 2;
    }
    printf("%s\n", response ? response : "");
    free(response);
    curl_easy_cleanup(curl);
    return 0;
}

int call_contact(const char *backend, const char *name, const char *email, const char *message) {
    CURL *curl = curl_easy_init();
    if(!curl) return 1;
    char url[512]; snprintf(url, sizeof(url), "%s/api/contact", backend);
    char json[1024]; snprintf(json, sizeof(json), "{\"nome\":\"%s\",\"email\":\"%s\",\"mensagem\":\"%s\"}", name, email, message);
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Content-Type: application/json");
    char *response = NULL;
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
    CURLcode res = curl_easy_perform(curl);
    if(res != CURLE_OK) {
        fprintf(stderr, "curl error: %s\n", curl_easy_strerror(res));
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
        free(response);
        return 2;
    }
    printf("%s\n", response ? response : "");
    free(response);
    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);
    return 0;
}

int main(int argc, char **argv) {
    const char *backend = "http://127.0.0.1:5000";
    if(argc < 2) { fprintf(stderr, "Usage: c_client test | contact name email message\n"); return 1; }
    if(strcmp(argv[1], "test") == 0) return call_test(backend);
    if(strcmp(argv[1], "contact") == 0) {
        if(argc < 5) { fprintf(stderr, "contact requires name email message\n"); return 1; }
        return call_contact(backend, argv[2], argv[3], argv[4]);
    }
    fprintf(stderr, "Unknown command\n");
    return 1;
}
