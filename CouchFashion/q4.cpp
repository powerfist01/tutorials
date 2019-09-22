#include <bits/stdc++.h>
using namespace std;

int func(int n) { 
    if (n == 1) 
        return 1; 
  
    if (n % 2 == 0) 
        return 2 * func(n / 2) - 1; 
    else
        return 2 * func(((n - 1) / 2)) + 1; 
}

int main(){
	int n = 100;
	cout<<func(n)<<endl;
	return 0;
}