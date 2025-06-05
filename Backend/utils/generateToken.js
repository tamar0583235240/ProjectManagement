const crypto = require('crypto');

function generatePasswordToken() {
  return crypto.randomBytes(32).toString('hex'); 
}

module.exports = generatePasswordToken;
