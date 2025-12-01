const fs = require('fs');
const path = require('path');

const pages = [
    'dashboard.html', 'login.html', 'register.html', 'signup.html', 'farm-registry.html',
    'supply-chain.html', 'ai-quality.html', 'blockchain.html', 'analytics.html',
    'iot-monitoring.html', 'e-marketplace.html', 'live-tracking.html', 'certificates.html',
    'notifications.html', 'help-support.html', 'quality.html', 'farm.html', 'farm-gallery.html',
    'multilanguage-support.html', 'system-status.html', 'live-market-prices.html',
    'supply-chain-tracking.html', 'government-schemes.html', 'beneficiaries.html',
    'tenders.html', 'policies.html', 'animal-database.html'
];

pages.forEach(page => {
    const filePath = path.join(__dirname, 'public', page);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add sidebar CSS if not present
        if (!content.includes('sidebar-menu.css')) {
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="sidebar-menu.css">\n</head>'
            );
        }
        
        // Add sidebar JavaScript if not present
        if (!content.includes('sidebar-menu.js')) {
            content = content.replace(
                '</body>',
                '    <script src="sidebar-menu.js"></script>\n</body>'
            );
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Added sidebar to ${page}`);
    }
});

console.log('Sidebar menu added to all pages!');