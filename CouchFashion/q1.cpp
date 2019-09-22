#include <bits/stdc++.h>
using namespace std;
class Data{
public:
	int left,top,height,width;
};

Data calculate(){
	Data temp;
	int left,top,height,width;
	bool flag = true,flag1 = true;
	for(int i=0;i<12;i++){
		string str;
		cin>>str;
		int counter = 0;
		for(int j=0;j<str.length();j++){
			if(str[j]=='w'){
				if(flag){
					left=j;
					top=i;
					flag = false;
				}
				counter ++;
			}
		}
		if(counter!=0)
			width = counter;
		if(counter == 0 && flag1 == true && flag == false){
			height = i-top;
			flag1 = false;
		}
	}
	temp.left = left;
	temp.top = top;
	temp.height = height;
	temp.width = width;
	return temp;
}
int main(){
	Data obj;
	obj = calculate();
	cout<< obj.left<< " "<<obj.top<<" "<<obj.width<<" "<<obj.height<<"\n";
	return 0;
}