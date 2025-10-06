#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(int argc, char** argv) {
    double value = 0;
    if (argc > 1) value = atof(argv[1]);
    else { printf("Usage: %s <value>\n", argv[0]); return 1; }
    FILE *f = fopen("data.csv", "a");
    if (!f) { perror("fopen"); return 1; }
    time_t t = time(NULL);
    fprintf(f, "%ld,%.6f\n", (long)t, value);
    fclose(f);
    printf("Appended %f at %ld\n", value, (long)t);
    return 0;
}
