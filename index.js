const { execSync } = require('child_process');

async function startN8n() {
  try {
    // Run n8n with production settings
    execSync('npx n8n start --tunnel=false --production', {
      stdio: 'inherit'
    });
  } catch (error) {
    console.error('Failed to start n8n:', error);
    process.exit(1);
  }
}

startN8n();
