// const express = require('express');
// const router = express.Router();
// const { inviteUser, setPassword, login } = require('../controllers/inviteController');

// router.post('/inviteUser', inviteUser);
// router.post('/setPassword',setPassword);
// router.post('/login', login);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { inviteUser, setPassword, login } = require('../controllers/inviteController');
const verifyJWT = require('../middleware/verifyJWT'); // ייבוא ה-middleware לאימות JWT
const verifyRole = require('../middleware/verifyRole'); // ייבוא ה-middleware לאימות תפקיד
const Role = require('../enums/role.enum'); // ייבוא ה-enum של התפקידים

router.post('/inviteUser', verifyJWT, verifyRole(Role.Manager), inviteUser); // הוספת Middlewares
router.post('/setPassword',setPassword);
router.post('/login', login);

module.exports = router;