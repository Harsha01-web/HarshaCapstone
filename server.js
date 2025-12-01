const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wool_monitoring'
});

let dbConnected = false;

db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err.message);
    console.log('Using mock data mode');
    dbConnected = false;
  } else {
    console.log('Connected to MySQL database');
    dbConnected = true;
  }
});

// Initialize database tables
function initializeTables() {
  const createTables = [
    `CREATE TABLE IF NOT EXISTS farms (
      farm_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      contact VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS batches (
      batch_id INT AUTO_INCREMENT PRIMARY KEY,
      farm_id INT,
      batch_code VARCHAR(50) UNIQUE NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      weight DECIMAL(10,2),
      quality ENUM('Premium', 'Standard', 'Basic') DEFAULT 'Standard',
      status ENUM('Harvested', 'Processing', 'Quality Check', 'Shipped', 'Delivered') DEFAULT 'Harvested',
      FOREIGN KEY (farm_id) REFERENCES farms(farm_id)
    )`,
    `CREATE TABLE IF NOT EXISTS events (
      event_id INT AUTO_INCREMENT PRIMARY KEY,
      batch_id INT,
      event_type VARCHAR(100) NOT NULL,
      note TEXT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (batch_id) REFERENCES batches(batch_id)
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('farmer', 'processor', 'admin', 'buyer') DEFAULT 'farmer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];
  
  createTables.forEach(sql => {
    db.query(sql, (err) => {
      if (err) console.log('Table creation error:', err.message);
    });
  });
  
  // Insert sample data
  const sampleData = [
    "INSERT IGNORE INTO farms (name, location, contact) VALUES ('Green Valley Farm', 'Montana, USA', '+1-555-0101'), ('Highland Wool Co.', 'Scotland, UK', '+44-555-0102'), ('Outback Sheep Station', 'Queensland, Australia', '+61-555-0103')",
    "INSERT IGNORE INTO batches (farm_id, batch_code, weight, quality, status) VALUES (1, 'GVF-2024-001', 150.50, 'Premium', 'Processing'), (2, 'HWC-2024-002', 200.75, 'Standard', 'Quality Check'), (3, 'OSS-2024-003', 175.25, 'Premium', 'Shipped')",
    "INSERT IGNORE INTO events (batch_id, event_type, note) VALUES (1, 'Harvested', 'High quality wool harvested from premium sheep'), (1, 'Quality Check', 'Passed initial quality assessment'), (2, 'Processing', 'Cleaning and sorting in progress'), (3, 'Shipped', 'Batch shipped to textile manufacturer')"
  ];
  
  sampleData.forEach(sql => {
    db.query(sql, (err) => {
      if (err && !err.message.includes('Duplicate')) {
        console.log('Sample data error:', err.message);
      }
    });
  });
}

if (dbConnected) {
  initializeTables();
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes
// Farms API
app.get('/api/farms', (req, res) => {
  if (!dbConnected) {
    return res.json([
      { farm_id: 1, name: 'Green Valley Farm', location: 'Montana, USA', contact: '+1-555-0101' },
      { farm_id: 2, name: 'Highland Wool Co.', location: 'Scotland, UK', contact: '+44-555-0102' },
      { farm_id: 3, name: 'Outback Sheep Station', location: 'Queensland, Australia', contact: '+61-555-0103' }
    ]);
  }
  db.query('SELECT * FROM farms ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/farms', (req, res) => {
  const { name, location, contact } = req.body;
  db.query('INSERT INTO farms (name, location, contact) VALUES (?, ?, ?)', 
    [name, location, contact], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Farm added successfully' });
  });
});

// Batches API
app.get('/api/batches', (req, res) => {
  db.query(`SELECT b.*, f.name as farm_name FROM batches b 
            JOIN farms f ON b.farm_id = f.farm_id 
            ORDER BY b.date DESC`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/batches', (req, res) => {
  const { farm_id, batch_code, weight, quality, status } = req.body;
  db.query('INSERT INTO batches (farm_id, batch_code, weight, quality, status) VALUES (?, ?, ?, ?, ?)', 
    [farm_id, batch_code, weight, quality, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Batch added successfully' });
  });
});

// Users API
app.post('/api/users/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', 
      [name, email, hashedPassword, role || 'farmer'], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
    
    res.json({ 
      id: user.user_id, 
      name: user.name, 
      email: user.email, 
      role: user.role,
      message: 'Login successful' 
    });
  });
});

// Tracking API
app.get('/api/tracking/:batchId', (req, res) => {
  const { batchId } = req.params;
  db.query('SELECT * FROM events WHERE batch_id = ? ORDER BY date DESC', [batchId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/tracking', (req, res) => {
  const { batch_id, event_type, note } = req.body;
  db.query('INSERT INTO events (batch_id, event_type, note) VALUES (?, ?, ?)', 
    [batch_id, event_type, note], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Event added successfully' });
  });
});

// Analytics API
app.get('/api/analytics', (req, res) => {
  const analytics = {
    totalFarms: 0,
    totalBatches: 0,
    qualityDistribution: {},
    monthlyProduction: []
  };
  
  db.query('SELECT COUNT(*) as count FROM farms', (err, farmResult) => {
    if (err) return res.status(500).json({ error: err.message });
    analytics.totalFarms = farmResult[0].count;
    
    db.query('SELECT COUNT(*) as count FROM batches', (err, batchResult) => {
      if (err) return res.status(500).json({ error: err.message });
      analytics.totalBatches = batchResult[0].count;
      
      db.query('SELECT quality, COUNT(*) as count FROM batches GROUP BY quality', (err, qualityResult) => {
        if (err) return res.status(500).json({ error: err.message });
        qualityResult.forEach(row => {
          analytics.qualityDistribution[row.quality] = row.count;
        });
        
        res.json(analytics);
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});