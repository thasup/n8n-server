require('dotenv').config();

// Validate required environment variables
const requiredEnvs = ['HTTPBIN_API_TOKEN', 'HTTPBIN_DOMAIN'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  console.error('Missing required environment variables:', missingEnvs);
  console.error('Please check your .env file or set the environment variables.');
  process.exit(1);
}

// Export the validated environment configuration
module.exports = {
  httpbinApiToken: process.env.HTTPBIN_API_TOKEN,
  httpbinDomain: process.env.HTTPBIN_DOMAIN,
};
