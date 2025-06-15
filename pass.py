# Run this in Python shell to create initial admin
import bcrypt
password = "admin123".encode('utf-8')
hashed = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

# Then insert into admins table using your MySQL client:
# INSERT INTO admins (username, password) VALUES ('admin', '<hashed-password>');
