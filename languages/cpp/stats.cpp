#include <bits/stdc++.h>
using namespace std;

int main(int argc, char** argv) {
    string file = (argc>1)?argv[1]:"data.csv";
    char delim = ',';
    if (argc>2 && argv[2] && argv[2][0]) delim = argv[2][0];

    ifstream in(file);
    if (!in) {
        cerr << "Cannot open "<<file<<". Create a CSV with numeric values in first column."<<endl;
        return 1;
    }
    vector<double> vals;
    string line;
    while (getline(in,line)){
        if(line.empty()) continue;
        stringstream ss(line);
        string tok;
        if (!getline(ss,tok,delim)) continue;
        try { vals.push_back(stod(tok)); } catch(...) { continue; }
    }
    if(vals.empty()){ cout<<"{\"count\":0}"<<endl; return 0; }
    double sum=accumulate(vals.begin(),vals.end(),0.0);
    double mean=sum/vals.size();
    double sqsum=0; for(auto v:vals) sqsum += v*v;
    double sqmean = sqsum/vals.size();
    double var = sqmean - mean*mean;
    if (var < 0 && var > -1e-12) var = 0;
    double stddev = sqrt(max(0.0,var));
    double mn = *min_element(vals.begin(), vals.end());
    double mx = *max_element(vals.begin(), vals.end());
    // JSON friendly output
    cout << "{\"count\":" << vals.size() << ",\"mean\":" << mean << ",\"std\":" << stddev << ",\"min\":" << mn << ",\"max\":" << mx << "}" << endl;
    return 0;
}
