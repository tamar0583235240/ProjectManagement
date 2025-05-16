const User = require('../models/User');
const Role = require('../models/Role');
const generatePasswordToken = require('../utils/generateToken');
const sendInviteEmail = require('../utils/mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. יצירת משתמש חדש (הזמנה)
exports.inviteUser = async (req, res) => {
  try {
    const { email, user_name, role, manager_id, organization_id } = req.body;

    // בדיקה אם משתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // יצירת טוקן חדש לבחירת סיסמה
    const password_token = generatePasswordToken();
    const password_token_expires = new Date(Date.now() + 60 * 60 * 1000); // שעתיים תוקף

    // יצירת משתמש חדש - סיסמה null, is_active=false
    const newUser = new User({
      email,
      user_name,
      role,
      manager_id: manager_id || null,
      organization_id,
      is_active: false,
      password_token,
      password_token_expires
    });

    await newUser.save();

    // שליחת מייל עם טוקן
    await sendInviteEmail(email, password_token);

    res.status(201).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. בחירת סיסמה דרך הטוקן
exports.setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // מציאת משתמש לפי הטוקן ותוקפו
    const user = await User.findOne({
      password_token: token,
      password_token_expires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // עדכון המשתמש: סיסמה, הפעלה, ניקוי הטוקן
    user.password = hashedPassword;
    user.is_active = true;
    user.password_token = null;
    user.password_token_expires = null;

    await user.save();

    res.status(200).json({ message: 'Password set successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. התחברות משתמש (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // מציאת המשתמש לפי המייל
    const user = await User.findOne({ email }).populate('role');

    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'Invalid credentials or inactive user' });
    }

    // בדיקת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // יצירת JWT
    const token = jwt.sign({
      id: user._id,
      role: user.role._id,
      organization_id: user.organization_id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ניתן לשלוח JWT בקוקי HttpOnly (לשמור על אבטחה)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ב-prod רק
      maxAge: 3600000,
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        user_name: user.user_name,
        role: user.role.name,
        organization_id: user.organization_id
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
