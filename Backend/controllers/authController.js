const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generatePasswordToken = require("../utils/generateToken");
const sendInviteEmail = require("../utils/mailer");
exports.SignUp = async (req, res) => {
  try {
    const { user_name, password, email, role, manager_id, organization_id } = req.body
    if (!user_name || !password || !email || !role || !organization_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email already exists in the system' });
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { user_name, password: hashedPwd, email, role, manager_id, organization_id }
    const user = await User.create(userObject)
    if (!user) {
      return res.status(400).json({ message: 'User creation failed' })
    }
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        organization_id: user.organization_id,
        manager_id: user.manager_id,
        user_name: user.user_name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    return res.status(201).json({ accessToken, user });
  }
  catch (error) {
    console.error('Failed to add user:', error);
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email: ", email, "password: ", password);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(user);
    bcrypt.compare("214787673", "$2b$10$CvTyzzkXlhqXVE7fxdE7D.NXtTqKoABGsnabA1UftRxmv6oZ4mxWW")
      .then(result => console.log("Password match:", result))

    const flag = await bcrypt.compare(password, user.password);
    console.log("Password match:", flag);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        organization_id: user.organization_id,
        manager_id: user.manager_id,
        user_name: user.user_name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ accessToken: accessToken, user: user })
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("forgotPassword called with email:", email);
  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = generatePasswordToken();
    const expires = Date.now() + 1000 * 60 * 60 * 48; // 48 שעות
    console.log("Generated token:", token, "Expires at:", new Date(expires));
    user.password_token = token;
    user.password_token_expires = new Date(expires);
    await user.save();
    console.log("User updated with token:", user);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const html = `
        <p>קיבלת בקשה לאיפוס סיסמה.</p>
        <p>לכניסה לעמוד האיפוס לחץ כאן:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>אם לא אתה ביקשת, תוכל להתעלם מהמייל.</p>
      `;
    await sendInviteEmail(email, token, html, "איפוס סיסמה");
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("forgotPassword error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      password_token: token,
      password_token_expires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;
    user.password_token = null;
    user.password_token_expires = null;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

