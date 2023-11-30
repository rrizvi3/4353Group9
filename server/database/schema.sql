-- Drop tables if they exist
DROP TABLE IF EXISTS FuelQuotes;
DROP TABLE IF EXISTS Clients;
DROP TABLE IF EXISTS Users CASCADE;
DROP EXTENSION IF EXISTS pgcrypto;

-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create UserCredentials table with encrypted passwords
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

-- Create ClientInformation table
CREATE TABLE IF NOT EXISTS Clients (
  user_id INT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  address1 VARCHAR(255) NOT NULL,
  address2 VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Create FuelQuote table
CREATE TABLE IF NOT EXISTS FuelQuotes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  gallons_requested DECIMAL(10, 2) NOT NULL,
  delivery_date DATE NOT NULL,
  suggested_price DECIMAL(10, 2) NOT NULL,
  total_amount_due DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Insert mock data into Users table with encrypted passwords
INSERT INTO Users (username, password_hash)
VALUES
  ('user1', crypt('password1', gen_salt('bf'))),
  ('user2', crypt('password2', gen_salt('bf'))),
  ('user3', crypt('password3', gen_salt('bf')));

-- Insert mock data into Clients table
INSERT INTO Clients (user_id, full_name, address1, address2, city, state, zip_code)
VALUES
  (1, 'John Doe', '123 Main St', 'Apt 4B', 'Albany', 'NY', '10001'),
  (2, 'Jane Smith', '456 Elm St', 'Unit 2A', 'New York', 'NY', '10002'),
  (3, 'Mike Johnson', '789 Oak St', '', 'Los Angeles', 'CA', '90001');

-- Insert mock data into FuelQuotes table
INSERT INTO FuelQuotes (user_id, gallons_requested, delivery_date, suggested_price, total_amount_due)
VALUES
  (1, 100, '2023-10-15', 2.50, 250.00),
  (1, 150, '2023-10-20', 2.45, 367.50),
  (2, 80, '2023-10-18', 2.55, 204.00),
  (3, 200, '2023-10-22', 2.48, 496.00);
