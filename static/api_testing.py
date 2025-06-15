curl -X POST -H "Content-Type: application/json" -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "mobile_no": "1234567890"
}' http://localhost:5000/add_user

curl http://localhost:5000/get_users

curl -X POST -H "Content-Type: application/json" -d '{
    "username": "john_doe",
    "transaction_id": "TX123456",
    "email": "john@example.com",
    "amount": 100.50,
    "commission": 10.05,
    "status": "success"
}' http://localhost:5000/add_transaction

curl http://localhost:5000/get_transactions


CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial admin (password: admin123)
INSERT INTO admins (username, password) 
VALUES ('admin', '$2b$10$examplehashedpassword');