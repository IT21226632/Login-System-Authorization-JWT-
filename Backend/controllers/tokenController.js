const jwt = require('jsonwebtoken');

//generate Access token
const generateAccessToken = (user) => {
    const token = jwt.sign({ _id: user._id, name:user.firstName, email: user.email, role: user.role }, process.env.ACCESS_TOKEN, { expiresIn: '10s' })
    return token
}

//generate Refresh token
const generateRefreshToken = (user) => {
    const token = jwt.sign({ _id: user._id, name:user.firstName, email: user.email, role: user.role }, process.env.REFRESH_TOKEN, { expiresIn: '3h' })
    return token
}

module.exports = { generateAccessToken, generateRefreshToken }