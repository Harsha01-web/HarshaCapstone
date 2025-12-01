const fs = require('fs');
const path = require('path');

const professionalStyles = {
    body: `background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); min-height: 100vh; background-attachment: fixed; margin: 0; font-family: 'Inter', sans-serif;`,
    
    navigation: `<nav style="background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1400px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; height: 70px;">
            <a href="../index.html" style="display: flex; align-items: center; gap: 12px; font-size: 1.5em; font-weight: 700; color: white; text-decoration: none; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🐑 Wool Monitor</a>
            <div style="display: flex; gap: 8px; align-items: center;">
                <a href="dashboard.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Dashboard</a>
                <a href="farm-registry.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Farms</a>
                <a href="analytics.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Analytics</a>
                <a href="blockchain.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Blockchain</a>
            </div>
        </div>
    </nav>`,
    
    header: `<div style="background: linear-gradient(135deg, rgba(102,126,234,0.9) 0%, rgba(118,75,162,0.9) 50%, rgba(240,147,251,0.9) 100%); backdrop-filter: blur(20px); color: white; padding: 60px 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h1 style="font-size: 3.5em; margin-bottom: 15px; text-shadow: 2px 2px 20px rgba(0,0,0,0.3); font-weight: 800;">TITLE_PLACEHOLDER</h1>
        <p style="font-size: 1.3em; opacity: 0.95; font-weight: 300; text-shadow: 1px 1px 10px rgba(0,0,0,0.2);">SUBTITLE_PLACEHOLDER</p>
    </div>`,
    
    card: `background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.9) 100%); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 30px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); transition: all 0.3s ease;`,
    
    button: `background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); color: white; padding: 12px 24px; border: none; border-radius: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(102,126,234,0.3); text-decoration: none; display: inline-block;`
};

const pages = [
    'farm-registry.html', 'supply-chain.html', 'ai-quality.html', 'blockchain.html',
    'analytics.html', 'iot-monitoring.html', 'e-marketplace.html', 'live-tracking.html',
    'certificates.html', 'notifications.html', 'help-support.html', 'quality.html'
];

pages.forEach(page => {
    const filePath = path.join(__dirname, 'public', page);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update body tag
        content = content.replace(/<body[^>]*>/, `<body style="${professionalStyles.body}">`);
        
        // Add navigation after body tag
        if (!content.includes('nav style=')) {
            content = content.replace('<body', professionalStyles.navigation + '\n<body');
        }
        
        // Update header sections
        content = content.replace(
            /<div class="header"[^>]*>[\s\S]*?<\/div>/,
            professionalStyles.header.replace('TITLE_PLACEHOLDER', page.replace('.html', '').replace('-', ' ')).replace('SUBTITLE_PLACEHOLDER', 'Professional wool monitoring system')
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${page} with professional design`);
    }
});

console.log('All pages updated with professional inline CSS design!');