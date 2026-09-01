const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });

    }

    // Expected format:
    // Authorization: Bearer <token>

    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Invalid Token Format"
        });

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Save logged-in user info
        req.user = decoded;

        next();

    }
    catch (error) {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};

module.exports = verifyToken;
