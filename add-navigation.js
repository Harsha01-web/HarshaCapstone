const fs = require('fs');
const path = require('path');

const navigationHTML = `
    <nav style="background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1400px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; height: 70px;">
            <a href="../index.html" style="display: flex; align-items: center; gap: 12px; font-size: 1.5em; font-weight: 700; color: white; text-decoration: none; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                🐑 Wool Monitor
            </a>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <a href="dashboard.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">Dashboard</a>
                <a href="farm-registry.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">Farms</a>
                <a href="supply-chain.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">Supply</a>
                <a href="ai-quality.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">AI Quality</a>
                <a href="blockchain.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">Blockchain</a>
                <a href="analytics.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">Analytics</a>
                <a href="iot-monitoring.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">IoT</a>
                <a href="e-marketplace.html" style="padding: 6px 12px; border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 0.9em; background: rgba(255,255,255,0.1);">Market</a>
                <a href="login.html" style="padding: 6px 12px; border-radius: 8px; color: white; text-decoration: none; font-weight: 500; font-size: 0.9em; background: linear-gradient(135deg, #667eea, #764ba2);">Login</a>
            </div>
        </div>
    </nav>
`;

const publicDir = './public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has navigation
    if (content.includes('nav-container') || content.includes('navbar')) {
        console.log(`Skipping ${file} - already has navigation`);
        return;
    }
    
    // Add navigation after <body> tag
    if (content.includes('<body')) {
        const bodyIndex = content.indexOf('<body');
        const bodyEndIndex = content.indexOf('>', bodyIndex) + 1;
        
        content = content.slice(0, bodyEndIndex) + navigationHTML + content.slice(bodyEndIndex);
        
        fs.writeFileSync(filePath, content);
        console.log(`Added navigation to ${file}`);
    }
});

console.log('Navigation update complete!');