const express = require('express');
const router = express.Router();
const Service = require('../Services/mainService');
const authenticateToken = require('../middleware/verify.middleware');

router.post('/register', Service.register);
router.post('/login', Service.login);
router.post('/cart',authenticateToken, Service.addtocart);
router.post('/orders',authenticateToken);

module.exports = router;
