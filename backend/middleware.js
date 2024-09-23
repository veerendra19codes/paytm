const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware  = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader: ", authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);

        req.userId = decode.userId;

        next();
    } catch (error) {
        return res.status(403).json({});
    }
}

module.exports = { authMiddleware }