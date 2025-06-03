
// const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
 const router = express.Router()
 const {SignIn,SignUp, forgotPassword, resetPassword} = require("../controllers/authController")
//  const {invite,setPassword,login} = require("../controllers/inviteController")

// const Controller = require('../controllers/inviteController');

 router.post("/SignIn", SignIn)
 router.post("/SignUp", SignUp)
 router.post("/forgot-password", forgotPassword); 
router.post("/reset-password/:token", resetPassword); 


module.exports = router;

