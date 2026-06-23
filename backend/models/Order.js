const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	user:          { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
	products:      [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
	total:         { type: Number, required: true },
	paymentStatus: { type: String, default: 'paid' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };

