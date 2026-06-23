const { User }  = require('../models/User');
const { Cart }  = require('../models/Cart');
const { Order } = require('../models/Order');

// ── Place Order ───────────────────────────────────────────────────
const placeOrder = async (req, res) => {
	try {
		// 1. Get user with their full cart (products populated)
		const user = await User.findOne({ email: req.user.email }).populate({
			path: 'cart',
			populate: { path: 'products', model: 'Product' }
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!user.cart || user.cart.products.length === 0) {
			return res.status(400).json({ message: 'Your cart is empty' });
		}

		// 2. Save the order to the database
		const order = await Order.create({
			user:          user._id,
			products:      user.cart.products.map(p => p._id),
			total:         user.cart.total,
			paymentStatus: 'paid'
		});

		// 3. Clear the cart after placing the order
		await Cart.findByIdAndUpdate(user.cart._id, { products: [], total: 0 });

		// 4. Return success message
		return res.status(200).json({
			message: 'Payment done successfully! Your order has been placed.',
			orderId: order._id,
			total:   order.total
		});

	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

module.exports = { placeOrder };

