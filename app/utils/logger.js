import colors from 'colors';

const logger = {
  success: (message) => console.log(`✅ ${message}`.green),
  info: (message) => console.log(`ℹ️  ${message}`.blue),
  warn: (message) => console.log(`⚠️  ${message}`.yellow),
  error: (message) => console.log(`❌ ${message}`.red),
  request: (method, url) => console.log(`📨 ${method} ${url}`.cyan),
  verse: (category, reference) => console.log(`📖 ${category} - ${reference}`.magenta)
};

export default logger;
