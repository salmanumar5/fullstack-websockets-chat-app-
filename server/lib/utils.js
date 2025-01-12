const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SEC, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,  //prevent XXS attacks
        sameSite: "strict",  //CSRF attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
};

module.exports = generateToken;