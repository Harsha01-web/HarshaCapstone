# Wool Monitoring System - Farm to Fabric

A comprehensive web application for monitoring wool production from farm to final fabric, featuring digital certificates, IoT integration, blockchain transparency, AI-based quality assessment, and complete supply chain visibility.

## 🚀 Features

### Core Functionality
- **Farm Management**: Register and manage wool farms with detailed profiles
- **Batch Tracking**: Complete wool batch lifecycle management
- **Quality Assessment**: AI-powered wool quality analysis with digital certificates
- **Supply Chain Tracking**: End-to-end visibility from sheep to textile
- **Real-time Monitoring**: IoT sensor integration for environmental monitoring
- **Blockchain Ledger**: Immutable tracking records for transparency
- **E-Marketplace**: Connect farmers with buyers worldwide
- **Analytics Dashboard**: Comprehensive production insights and reporting

### Advanced Features
- **Mobile-Responsive Design**: Optimized for all devices
- **Multi-language Support**: Available in multiple languages
- **Live Market Prices**: Real-time wool market pricing
- **Digital Certificates**: Automated quality certification
- **Notification System**: Real-time alerts and updates
- **User Authentication**: Secure login and role-based access
- **System Monitoring**: Real-time system health and status

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Charts**: Chart.js for data visualization
- **Authentication**: bcrypt for password hashing
- **API**: RESTful API design

## 📁 Project Structure

```
capstone617/
├── index.html                 # Landing page
├── mobile-app-wireframes.html # Mobile UI wireframes
├── server.js                  # Express server
├── package.json              # Dependencies
├── db-schema.sql             # Database schema
├── README.md                 # This file
└── public/                   # Static files
    ├── dashboard.html        # Main dashboard
    ├── login.html           # User authentication
    ├── register.html        # User registration
    ├── farm-registry.html   # Farm management
    ├── supply-chain.html    # Supply chain overview
    ├── ai-quality.html      # AI quality assessment
    ├── blockchain.html      # Blockchain ledger
    ├── analytics.html       # Analytics dashboard
    ├── iot-monitoring.html  # IoT sensor monitoring
    ├── e-marketplace.html   # Wool marketplace
    ├── live-tracking.html   # Real-time tracking
    ├── certificates.html    # Digital certificates
    ├── notifications.html   # Alert system
    ├── help-support.html    # Help and support
    └── images/              # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capstone617
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database named `wool_monitoring`
   - Import the schema:
   ```bash
   mysql -u root -p wool_monitoring < db-schema.sql
   ```

4. **Configure database connection**
   - Open `server.js`
   - Update the MySQL connection settings:
   ```javascript
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'your_password', // Change this
     database: 'wool_monitoring'
   });
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`

## 🔧 Configuration

### Database Setup
The application uses MySQL with the following tables:
- `farms`: Farm information and details
- `batches`: Wool batch data and tracking
- `events`: Supply chain events and timeline
- `users`: User authentication and profiles

### Environment Variables
Create a `.env` file for production deployment:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=wool_monitoring
JWT_SECRET=your_jwt_secret
```

## 📱 Mobile App Wireframes

The application includes comprehensive mobile wireframes accessible at:
`http://localhost:3000/mobile-app-wireframes.html`

Features include:
- Login and authentication screens
- Dashboard with quick stats
- Batch tracking interface
- Quality assessment tools
- Farm management screens
- Notification system

## 🔐 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Farm Management
- `GET /api/farms` - Get all farms
- `POST /api/farms` - Create new farm

### Batch Management
- `GET /api/batches` - Get all batches
- `POST /api/batches` - Create new batch

### Tracking
- `GET /api/tracking/:batchId` - Get batch tracking events
- `POST /api/tracking` - Add tracking event

### Analytics
- `GET /api/analytics` - Get analytics data

## 🎯 Key Features Explained

### AI Quality Assessment
- Upload wool sample images for analysis
- Automated fiber length, diameter, and color grading
- Quality scoring and certification generation
- Defect detection and recommendations

### Blockchain Integration
- Immutable transaction records
- Complete supply chain transparency
- Cryptographic verification of authenticity
- Tamper-proof quality certificates

### IoT Monitoring
- Real-time environmental sensor data
- Temperature, humidity, and air quality monitoring
- Automated alerts for optimal conditions
- Historical data analysis and trends

### Supply Chain Tracking
- End-to-end batch visibility
- Real-time GPS tracking simulation
- Timeline-based progress monitoring
- Multi-stakeholder transparency

## 🔒 Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Secure session management

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Sample Data

The application includes sample data for demonstration:
- 3 sample farms with different locations
- Multiple wool batches in various stages
- Sample users with different roles
- Mock IoT sensor data
- Blockchain transaction history

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set up production database
2. Configure environment variables
3. Build and deploy:
```bash
npm start
```

### Docker Deployment (Optional)
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@woolmonitor.com
- Documentation: Available in the Help & Support section
- Issues: Submit via GitHub issues

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- Complete farm-to-fabric tracking system
- AI quality assessment integration
- Blockchain transparency features
- IoT monitoring capabilities
- Mobile-responsive design

## 🎯 Future Enhancements

- Mobile native applications (iOS/Android)
- Advanced AI models for quality prediction
- Integration with external IoT platforms
- Multi-tenant architecture for enterprise
- Advanced analytics and machine learning
- Integration with textile manufacturing systems

---

**Built with ❤️ for the wool industry**

For more information, visit the application at `http://localhost:3000` after setup.