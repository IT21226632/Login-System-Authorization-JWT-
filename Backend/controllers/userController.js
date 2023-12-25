const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const {generateAccessToken , generateRefreshToken} = require('../controllers/tokenController');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

//user registration function
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, age, password, rePassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedRepassword = await bcrypt.hash(rePassword, salt);

    //check the password and repassword
    if (password === rePassword) {
        const response = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            password: hashedPassword,
            rePassword: hashedRepassword,
            role: 'user'
        })

        if (response) {
            // User registration successful
            return res.status(200).json({ message: "User registered successfully" });
        }
        else{
            res.status(403).json('user could not be created!')
        }
    }

    else {
        // User registration failed
        return res.status(400).json({ message: "Passwords do not match" });
    }

})

//Admin registration function
const registerAdmin = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, age, password, rePassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedRepassword = await bcrypt.hash(rePassword, salt);

    //check the password and repassword
    if (password === rePassword) {
        const response = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            password: hashedPassword,
            rePassword: hashedRepassword,
            role: 'admin'
        })

        if (response) {
            // User registration successful
            return res.status(200).json({ message: "User registered successfully" });
        }
        else{
            res.status(403).json('user could not be created!')
        }
    }

    else {
        // Admin registration failed
        return res.status(400).json({ message: "Passwords do not match" });
    }

})

//login function
const loginUser = asyncHandler(async(req, res) => {

    const {email , password} = req.body

    const response = await userModel.findOne({email: email})

    if(response){
        const match = await bcrypt.compare(password , response.password)

        if(match){
            const token = generateAccessToken(response)
            res.status(200).json({
                id: response._id,
                firstName: response.firstName,
                role: response.role,
                accessToken: token
            })
        }
        else{
            res.status(403).json('password or email mismatch!')
        }
    }
    else{
        res.status(404).json({error:'user not found!'})
    }})

//json token decode function
const tokenDecoder = (req, res) => {
    const authHeader = req.headers['Authorization'];
    if (authHeader == null) {
        return res.status(404).json('No token found');
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    return res.status(401).json('Token not valid');
                } else {
                    return res.status(200).json(user);
                }
            });
        } else {
            return res.status(200).json(user);
        }
    });
};

module.exports = { registerUser, registerAdmin, loginUser, tokenDecoder }
