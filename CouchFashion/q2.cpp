#include <bits/stdc++.h>
using namespace std;

int main(){
	int arr[] = {9,33,0,7,2,82,77};
	for(int i=0;i<8;i++){
		try{
			int result;
			if(i==7)
				result = arr[i]/arr[0];    
				/*Also we can check if the denominator is zero, and then not try to divide. Just continue the loop.*/
			else
				result = arr[i]/arr[i+1];
			cout<<"The result is: "<<result<<endl; 
		} catch(runtime_error& e){
			cout << "Exception Occurred" <<endl<< e.what();
			continue;
		}
	}
	return 0;
}