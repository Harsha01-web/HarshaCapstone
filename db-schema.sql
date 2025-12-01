-- Create database
CREATE DATABASE IF NOT EXISTS wool_monitoring;
USE wool_monitoring;

-- Farms table
CREATE TABLE farms (
    farm_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Batches table
CREATE TABLE batches (
    batch_id INT AUTO_INCREMENT PRIMARY KEY,
    farm_id INT,
    batch_code VARCHAR(50) UNIQUE NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    weight DECIMAL(10,2),
    quality ENUM('Premium', 'Standard', 'Basic') DEFAULT 'Standard',
    status ENUM('Harvested', 'Processing', 'Quality Check', 'Shipped', 'Delivered') DEFAULT 'Harvested',
    FOREIGN KEY (farm_id) REFERENCES farms(farm_id)
);

-- Events table for tracking
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id INT,
    event_type VARCHAR(100) NOT NULL,
    note TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id)
);

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('farmer', 'processor', 'admin', 'buyer') DEFAULT 'farmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO farms (name, location, contact) VALUES
('Green Valley Farm', 'Montana, USA', '+1-555-0101'),
('Highland Wool Co.', 'Scotland, UK', '+44-555-0102'),
('Outback Sheep Station', 'Queensland, Australia', '+61-555-0103');

INSERT INTO batches (farm_id, batch_code, weight, quality, status) VALUES
(1, 'GVF-2024-001', 150.50, 'Premium', 'Processing'),
(2, 'HWC-2024-002', 200.75, 'Standard', 'Quality Check'),
(3, 'OSS-2024-003', 175.25, 'Premium', 'Shipped');

INSERT INTO events (batch_id, event_type, note) VALUES
(1, 'Harvested', 'High quality wool harvested from premium sheep'),
(1, 'Quality Check', 'Passed initial quality assessment'),
(2, 'Processing', 'Cleaning and sorting in progress'),
(3, 'Shipped', 'Batch shipped to textile manufacturer');

INSERT INTO users (name, email, password_hash, role) VALUES
('John Farmer', 'john@greenvalley.com', '$2b$10$example', 'farmer'),
('Sarah Admin', 'admin@wooltrack.com', '$2b$10$example', 'admin'),
('Mike Processor', 'mike@processor.com', '$2b$10$example', 'processor');