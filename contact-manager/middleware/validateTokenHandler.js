const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User token is not authorised");
            }
            req.user = decoded.user;  // Corrected the typo
            console.log(req.user);     // Logging user to ensure it's decoded
            next();
        });
    } else {
        res.status(401);
        throw new Error("User is not authorised or token is missing.");
    }
});

module.exports = validateToken;
