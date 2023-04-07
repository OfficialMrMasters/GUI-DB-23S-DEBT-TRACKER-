import random
import string

# Generate dummy data for users table
rows = []
for i in range(100):
    # Generate random username, password, first name, last name, age, admin status, nickname, phone number, and email
    username = ''.join(random.choice(string.ascii_letters) for i in range(10))
    password = ''.join(random.choice(string.ascii_letters + string.digits) for i in range(10))
    first_name = ''.join(random.choice(string.ascii_letters) for i in range(10))
    last_name = ''.join(random.choice(string.ascii_letters) for i in range(10))
    age = random.randint(18, 65)
    admin = random.choice([True, False])
    nickname = ''.join(random.choice(string.ascii_letters) for i in range(5))
    phone_number = ''.join(random.choice(string.digits) for i in range(10))
    email = ''.join(random.choice(string.ascii_letters) for i in range(10)) + '@example.com'
    
    # Add data to rows list
    rows.append((username, password, first_name, last_name, age, admin, nickname, phone_number, email))

# Export data to a text file
with open('users_data.txt', 'w') as f:
    for row in rows:
        admin_val = 1 if row[5] else 0 # Convert boolean value to 1 or 0 for SQL INSERT statement
        f.write("INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('{}', '{}', '{}', '{}', {}, {}, '{}', '{}', '{}');\n".format(row[0], row[1], row[2], row[3], row[4], admin_val, row[6], row[7], row[8]))
