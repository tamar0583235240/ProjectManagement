const User = require("d:/ProjectReactNode/Backend/models/User")
const bcrypt = require("bcrypt")
exports.SignUp = async (req, res) => {
    try {
        const { user_name, password, email, role, manager_id, organization_id } = req.body
        if (!user_name || !password || !email || !role || !organization_id) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email already exists in the system' });
        }
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject = { user_name, password: hashedPwd, email, role, manager_id, organization_id }
        const user = await User.create(userObject)
        if (user) {

            return res.status(201).json({
                user,
                message: `New user ${user.user_name} created`
            });
        

        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ message: 'Failed to add user', error: error.message });
    }
};
exports.SignIn = async (req, res) => {
    const { user_name, password } = req.body
    if (!user_name || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const user = await User.findOne({ user_name }).lean()
        if (!user || user.active) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Unauthorized' })
        res.json(user)
    }
    catch {
        return res.status(404).json({ message: 'user not found' })
    }

}