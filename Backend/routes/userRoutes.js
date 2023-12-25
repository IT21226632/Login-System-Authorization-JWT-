const express = require('express');
const router = express.Router();
const {registerUser, registerAdmin, loginUser, tokenDecoder} = require('../controllers/userController');

router.post('/registerUser', registerUser);
router.post('/registerAdmin', registerAdmin);
router.post('/login', loginUser);
router.get('/auth-user', tokenDecoder);

module.exports = router;