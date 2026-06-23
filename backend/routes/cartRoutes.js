const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.get('/',           protect, getCart);
router.post('/add',      protect, addToCart);
router.delete('/remove', protect, removeFromCart);

module.exports = router;

 