import requests
from bs4 import BeautifulSoup
import sys
import sqlite3

username = sys.argv[1]

url = "https://www.codechef.com/users/" +username

r = requests.get(url)

soup = BeautifulSoup(r.content,'html5lib')

#print(soup.prettify())

table = soup.find('aside',attrs = {'class' : ['sidebar' ,'small-4', 'columns', 'pr0']})

#print(table.prettify())

current_rating = str(table.find('div',attrs = {'class' : 'rating-number'}).text)

#print(current_rating.text)

highest_rating_string = table.find('small')

highest_rating = str(highest_rating_string.text[16:-1])

#print(highest_rating)

Long = []
Cook = []
Lunch = []
i = 1

for row in table.findAll('td'):
	if i<=4:
		Long.append(row.text)
	elif i<=8:
		Cook.append(row.text)
	else:
		Lunch.append(row.text)
	i=i+1

long_rating = Long[1]
cook_rating = Cook[1]
lunch_rating = Lunch[1]

print(long_rating)
print(cook_rating)
print(lunch_rating)

conn = sqlite3.connect("database.db")
try:
	conn.execute("INSERT INTO RATINGS VALUES (?,?,?,?,?,?)",(username,highest_rating,current_rating,long_rating,cook_rating,lunch_rating))
except sqlite3.IntegrityError:
	print("User Details Already Exists!!!")
conn.commit()
conn.close()



