USE FuelRateDB;

-- Create UserCredentials table
CREATE TABLE UserCredentials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL
);

-- Create ClientInformation table
CREATE TABLE ClientInformation (
  id INT PRIMARY KEY,
  Full_Name VARCHAR(255) NOT NULL,
  Address1 VARCHAR(255) NOT NULL,
  Address2 VARCHAR(255),
  City VARCHAR(255) NOT NULL,
  State VARCHAR(255) NOT NULL,
  Zip_Code VARCHAR(10) NOT NULL
);

-- Create FuelQuote table
CREATE TABLE FuelQuote (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Client_ID INT NOT NULL,
  Gallons_Requested DECIMAL(10, 2) NOT NULL,
  Delivery_Date DATE NOT NULL,
  Suggested_Price DECIMAL(10, 2) NOT NULL,
  Total_Amount_Due DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (Client_ID) REFERENCES ClientInformation(id)
);
