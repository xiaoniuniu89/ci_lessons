import psycopg2

# connect to chinook 

connection = psycopg2.connect(database="chinook")

# build cursor obj of database 

cursor = connection.cursor()

# Query 1 - select all records from Artist table 
# cursor.execute('SELECT * FROM "Artist"')

# Query 2 select only name from artist table 
# cursor.execute('SELECT "Name" FROM "Artist"')

# Query 3 - select only Queen from the artist table 
# cursor.execute('SELECT * From "Artist" WHERE "Name" = %s', ["Queen"])

# Query 4 - select only by artist id 51 from the artist table 
# cursor.execute('SELECT * FROM "Artist" WHERE "ArtistId" = %s', [51])

# Query 5 - select only the albums with artist id 51 on albums table 
# cursor.execute('SELECT * FROM "Track" WHERE "Composer" = %s', ["Queen"])

# Query 6 - select all tracks where the composer is "Queen" from the "track" 
# cursor.execute('SELECT * FROM "Track" WHERE "Composer" = %s', ["Queen"])

cursor.execute('SELECT * FROM "Artist" WHERE "ArtistId" = %s', [50])
cursor.execute('SELECT * FROM "Track" WHERE "Composer" = %s', ["Metallica"])
# fetch the result (multiple)

results = cursor.fetchall()

# fetch results (single)
# results = cursor.fetchone()

# close the connection

connection.close()

# print results

for result in results:
    print(result)

