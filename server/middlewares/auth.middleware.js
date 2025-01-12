const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { config } = require("dotenv");

config();

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SEC);
        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({message: "User not found"})
        }

        req.user = user

        next();

    } catch (error) {
        console.log("Error in the protectRoute middleware", error.message);
        res.status(500).json({message: "Internal server error3"})
    }
};

module.exports = protectRoute;