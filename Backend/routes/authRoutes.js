
// const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
 const router = express.Router()
 const {SignIn,SignUp} = require("../controllers/authController")
 router.post("/SignIn", SignIn)
 router.post("/SignUp", SignUp)
 module.exports = router