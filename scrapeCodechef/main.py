import requests
from bs4 import BeautifulSoup
import sys
import sqlite3

conn = sqlite3.connect("database.db");

url = "https://www.codechef.com/users/" +sys.argv[1]

r = requests.get(url)

soup = BeautifulSoup(r.content,'html5lib')

#print(soup.prettify())

table = soup.find('section',attrs = {'class':'user-details'})

print(table.prettify())

labels = []
for row in table.findAll('label'):
	labels.append(str(row.text))

for label in labels:
 	print(label)

print(" ")

i=1
texts = []
for row in table.findAll('span'):
 	if(i!=1):
 		if(i!=2):
 			if(i!=5):
 				try:
 					texts.append(str(row.text))
 				except UnicodeEncodeError:
 					print()
 					pass
 	i=i+1

for text in texts:
  	print(text)

print(" ")

details = dict(zip(labels,texts))

print(details)

conn.execute("""INSERT INTO PROFILES (USERNAME,STATE,CITY,INSTITUTION,PROFESSION) VALUES (?,?,?,?,?)""",(details.get('Username:'," "),details.get('State:'," "),
 	details.get('City:'," "),details.get('Institution:'," "),details.get('Student/Professional:'," ")))

conn.commit()


