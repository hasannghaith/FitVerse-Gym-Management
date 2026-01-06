-- Create database
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    UserType ENUM('admin', 'user') DEFAULT 'user',
    Email VARCHAR(100),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table (equipment)
CREATE TABLE IF NOT EXISTS products (
    ProdID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    Category VARCHAR(50),
    Image VARCHAR(255),
    Stock INT DEFAULT 0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Programs table (fitness programs)
CREATE TABLE IF NOT EXISTS programs (
    ProgID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    Duration VARCHAR(50),
    Image VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    TotalAmount DECIMAL(10,2),
    Status VARCHAR(50) DEFAULT 'pending',
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES users(UserID)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    ProgramID INT,
    Quantity INT,
    Price DECIMAL(10,2),
    ItemType ENUM('product', 'program'),
    FOREIGN KEY (OrderID) REFERENCES orders(OrderID)
);

-- Insert demo data
INSERT INTO users (Username, Password, UserType, Email) VALUES
('admin', 'admin123', 'admin', 'admin@fitverse.com'),
('user', 'user123', 'user', 'user@fitverse.com');

INSERT INTO products (Name, Description, Price, Category, Stock) VALUES
('Adjustable Dumbbells', 'Set of 2 adjustable dumbbells 10 lbs.', 120.00, 'equipment', 50),
('Yoga Mat', 'Non-slip yoga mat, 6mm thick, eco-friendly.', 30.00, 'equipment', 100),
('Solid Lifting Straps', 'A pair of solid adjustable lifting hook.', 15.00, 'equipment', 75),
('Normal Lifting Straps', 'A pair of normal weight lifting straps.', 10.00, 'equipment', 80),
('Resistance Band', 'A 7-11kg resistance level.', 10.00, 'equipment', 200),
('Protein Shaker', 'A 1000ml Protein Shaker.', 5.00, 'accessories', 150),
('Water Bottle', '600ml water bottle.', 5.00, 'accessories', 200),
('Aerobic Fitness Step', 'Aerobic fitness step black and red.', 20.00, 'equipment', 60),
('Multi Resistance Train Kit', 'A multi resistance train kit with a variety of levels.', 35.00, 'equipment', 40),
('Gym Towel', 'Gym towel microfiber cloths.', 7.00, 'accessories', 300);

INSERT INTO programs (Name, Description, Price, Duration) VALUES
('Upper Lower Program', '4 weeks Upper Lower 4 days program perfect to start your fitness journey', 50.00, '4 weeks'),
('Powerlifting', '4 weeks powerlifting program focusing on strength', 60.00, '4 weeks'),
('Bro Split', '4 weeks Old schooled bro split grouping 2 muscles each day', 50.00, '4 weeks'),
('PPL Program', 'Push Pull legs 6 days program focusing on building muscles', 50.00, '4 weeks');