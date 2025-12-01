const fs = require('fs');
const path = require('path');

// Update remaining pages with complete professional design
const pages = ['register.html', 'signup.html', 'supply-chain-tracking.html', 'farm.html', 'farm-gallery.html', 'multilanguage-support.html', 'system-status.html', 'live-market-prices.html'];

const professionalTemplate = `
<body style="background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); min-height: 100vh; background-attachment: fixed; margin: 0; font-family: 'Inter', sans-serif;">
    <nav style="background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1400px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; height: 70px;">
            <a href="../index.html" style="display: flex; align-items: center; gap: 12px; font-size: 1.5em; font-weight: 700; color: white; text-decoration: none; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🐑 Wool Monitor</a>
            <div style="display: flex; gap: 8px; align-items: center;">
                <a href="dashboard.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Dashboard</a>
                <a href="farm-registry.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Farms</a>
                <a href="analytics.html" style="padding: 8px 16px; border-radius: 12px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; background: rgba(255,255,255,0.1);">Analytics</a>
            </div>
        </div>
    </nav>
`;

pages.forEach(page => {
    const filePath = path.join(__dirname, 'public', page);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace body tag and add navigation
        content = content.replace(/<body[^>]*>/, professionalTemplate);
        
        // Update all .btn classes
        content = content.replace(/class="btn"/g, 'style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); color: white; padding: 12px 24px; border: none; border-radius: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(102,126,234,0.3); text-decoration: none; display: inline-block;"');
        
        // Update card classes
        content = content.replace(/class="[^"]*card[^"]*"/g, 'style="background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.9) 100%); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 30px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); transition: all 0.3s ease;"');
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${page} with complete professional design`);
    }
});

console.log('Final design updates complete!');