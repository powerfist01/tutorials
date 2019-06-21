import requests
from bs4 import BeautifulSoup
import sys
import sqlite3

username = sys.argv[1]

url = "https://www.codechef.com/users/" +username

r = requests.get(url)

soup = BeautifulSoup(r.content,'html5lib')

#print(soup.prettify())

table = soup.find('',attrs = {'class' : ['table-questions'],'id' : 'rankContentDiv'})

print(table.prettify())






