#include <bits/stdc++.h>
using namespace std;

int main(){
	int sum=0,last=0;
	string str;
	getline(cin,str);
	for(int i=0;i<str.length();i++){
		if(str[i]>=48 && str[i]<=57){
			int x = str[i]-48;
			if(x%3==0)
				sum+=x;
			last = x;
		}
	}
	cout<<"The Sum is:"<<sum<<" and the last is: "<<last<<endl;
	return 0;
}