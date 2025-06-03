const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user?.role) return res.status(401).json({ message: 'Unauthorized' });

        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }

        next();
    };
};

module.exports = verifyRole;
