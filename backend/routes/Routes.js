const express = require('express');
const router = express.Router();
const Service = require('../Services/mainService');
const authenticateToken = require('../middleware/verify.middleware');

router.post('/register', Service.register);
router.post('/login', Service.login);
router.post('/cart',authenticateToken, Service.addtocart);
router.post('/orders',authenticateToken, Service.addOrder);
router.get('/getUsername',authenticateToken, Service.getUsername);
router.get('/getCartData',authenticateToken, Service.getCartData);
router.get('/getOrderData',authenticateToken, Service.getOrderData);
router.post('/confirmOrder',authenticateToken, Service.confirmOrder);

module.exports = router;
