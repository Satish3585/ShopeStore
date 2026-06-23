const express          = require('express');
const router           = express.Router();
const { protect }     = require('../middlewares/auth');
const {
	getAllProducts,
	getProductById,
	addProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/productController');

router.get('/',       getAllProducts);            // public
router.get('/:id',    protect, getProductById);   // protected
router.post('/',      protect, addProduct);        // protected
router.patch('/:id',  protect, updateProduct);     // protected
router.delete('/:id', protect, deleteProduct);     // protected

module.exports = router;

