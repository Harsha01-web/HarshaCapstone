const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  
  console.log('Connected to MySQL server');
  
  // Create database
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('Error creating database:', err.message);
      process.exit(1);
    }
    
    console.log('Database created successfully');
    
    // Use the database
    connection.query(`USE ${process.env.DB_NAME}`, (err) => {
      if (err) {
        console.error('Error selecting database:', err.message);
        process.exit(1);
      }
      
      // Create tables
      const createTables = `
        CREATE TABLE IF NOT EXISTS farms (
          farm_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          contact VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS batches (
          batch_id INT AUTO_INCREMENT PRIMARY KEY,
          farm_id INT,
          batch_code VARCHAR(50) UNIQUE NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          weight DECIMAL(10,2),
          quality ENUM('Premium', 'Standard', 'Basic') DEFAULT 'Standard',
          status ENUM('Harvested', 'Processing', 'Quality Check', 'Shipped', 'Delivered') DEFAULT 'Harvested',
          FOREIGN KEY (farm_id) REFERENCES farms(farm_id)
        );
        
        CREATE TABLE IF NOT EXISTS events (
          event_id INT AUTO_INCREMENT PRIMARY KEY,
          batch_id INT,
          event_type VARCHAR(100) NOT NULL,
          note TEXT,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (batch_id) REFERENCES batches(batch_id)
        );
        
        CREATE TABLE IF NOT EXISTS users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role ENUM('farmer', 'processor', 'admin', 'buyer') DEFAULT 'farmer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      connection.query(createTables, (err) => {
        if (err) {
          console.error('Error creating tables:', err.message);
          process.exit(1);
        }
        
        console.log('Tables created successfully');
        
        // Insert sample data
        const sampleData = `
          INSERT IGNORE INTO farms (name, location, contact) VALUES
          ('Green Valley Farm', 'Montana, USA', '+1-555-0101'),
          ('Highland Wool Co.', 'Scotland, UK', '+44-555-0102'),
          ('Outback Sheep Station', 'Queensland, Australia', '+61-555-0103');
          
          INSERT IGNORE INTO batches (farm_id, batch_code, weight, quality, status) VALUES
          (1, 'GVF-2024-001', 150.50, 'Premium', 'Processing'),
          (2, 'HWC-2024-002', 200.75, 'Standard', 'Quality Check'),
          (3, 'OSS-2024-003', 175.25, 'Premium', 'Shipped');
          
          INSERT IGNORE INTO events (batch_id, event_type, note) VALUES
          (1, 'Harvested', 'High quality wool harvested from premium sheep'),
          (1, 'Quality Check', 'Passed initial quality assessment'),
          (2, 'Processing', 'Cleaning and sorting in progress'),
          (3, 'Shipped', 'Batch shipped to textile manufacturer');
        `;
        
        connection.query(sampleData, (err) => {
          if (err) {
            console.error('Error inserting sample data:', err.message);
          } else {
            console.log('Sample data inserted successfully');
          }
          
          console.log('Database setup complete!');
          connection.end();
        });
      });
    });
  });
});