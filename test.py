import mysql.connector

DB_HOST = "buh89x1pi8cgvaw4161i-mysql.services.clever-cloud.com"
DB_USER = "ucwyejivetooukiz"
DB_PASSWORD = "aAo8DieytbUo0FiYV4RY"
DB_NAME = "buh89x1pi8cgvaw4161i"

conn = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)

if conn.is_connected():
    print("Connected")

    mycursor = conn.cursor()

try:
    # Execute the SELECT query
    mycursor.execute("SELECT * FROM users")  # Select all columns and rows from the 'users' table

    # Fetch all the results
    myresult = mycursor.fetchall()

    # Print the table header (column names)
    column_names = [i[0] for i in mycursor.description] #extract column names
    print("|".join(column_names))
    print("-" * (sum(len(name) + 1 for name in column_names))) #print separator

    # Print the table data
    for row in myresult:
        print(" | ".join(str(value) for value in row)) #convert values to string before joining
        

except mysql.connector.Error as err:
    print(f"Error: {err}")
