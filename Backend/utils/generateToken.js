const crypto = require('crypto');

function generatePasswordToken() {
  return crypto.randomBytes(32).toString('hex'); // טוקן אקראי באורך 64 תווים
}

module.exports = generatePasswordToken;
