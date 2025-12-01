// Quick script to update all HTML pages with new navigation and styles
const fs = require('fs');
const path = require('path');

const pages = [
    'login.html', 'register.html', 'farm-registry.html', 'supply-chain.html',
    'ai-quality.html', 'blockchain.html', 'analytics.html', 'iot-monitoring.html',
    'e-marketplace.html', 'live-tracking.html', 'certificates.html', 
    'notifications.html', 'help-support.html', 'quality.html'
];

const navigationHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-brand">🐑 Wool Monitor</a>
            <div class="nav-links">
                <a href="login.html" class="nav-link">Login</a>
                <a href="dashboard.html" class="nav-link">Dashboard</a>
                <a href="farm-registry.html" class="nav-link">Farms</a>
                <a href="supply-chain.html" class="nav-link">Supply Chain</a>
                <a href="ai-quality.html" class="nav-link">AI Quality</a>
                <a href="analytics.html" class="nav-link">Analytics</a>
                <a href="blockchain.html" class="nav-link">Blockchain</a>
                <a href="e-marketplace.html" class="nav-link">Marketplace</a>
                <a href="iot-monitoring.html" class="nav-link">IoT</a>
                <a href="live-tracking.html" class="nav-link">Tracking</a>
                <a href="certificates.html" class="nav-link">Certificates</a>
                <a href="notifications.html" class="nav-link">Notifications</a>
                <a href="help-support.html" class="nav-link">Help</a>
            </div>
        </div>
    </nav>
`;

pages.forEach(page => {
    const filePath = path.join(__dirname, 'public', page);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add shared styles if not present
        if (!content.includes('shared-styles.css')) {
            content = content.replace(
                '<title>',
                '<link rel="stylesheet" href="shared-styles.css">\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n    <title>'
            );
        }
        
        // Add navigation after <body> tag
        if (!content.includes('nav-container')) {
            content = content.replace('<body>', '<body>\n' + navigationHTML);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${page}`);
    }
});

console.log('All pages updated with navigation and styles!');