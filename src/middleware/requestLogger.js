const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('../config/env');

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), config.logging.dir);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Request logger
const requestLogger = morgan(config.logging.format, {
  stream: fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
  )
});

// Console logger for development
const consoleLogger = morgan('dev');

module.exports = {
  fileLogger: requestLogger,
  consoleLogger
};
