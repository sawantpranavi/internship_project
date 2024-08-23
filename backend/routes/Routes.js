const express = require('express');
const router = express.Router();
const Service = require('../Services/mainService');
const authenticateToken = require('../middleware/verify.middleware');

router.post('/register', Service.register);
router.post('/login', Service.login);
router.post('/cart',authenticateToken, Service.addtocart);
router.post('/orders',authenticateToken, Service.addOrder);
router.post('/getUsername',authenticateToken, Service.getUsername);
router.post('/getCartData',authenticateToken, Service.getCartData);
router.post('/getOrderData',authenticateToken, Service.getOrderData);

module.exports = router;
