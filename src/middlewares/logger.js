const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'requests.log');

fs.mkdirSync(LOG_DIR, { recursive: true });

function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const line = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - start}ms`;
    console.log(line);
    fs.appendFile(LOG_FILE, line + '\n', () => {});
  });

  next();
}

module.exports = logger;
