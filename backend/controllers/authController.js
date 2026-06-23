const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const { User }   = require('../models/User');

// ── Register ──────────────────────────────────────────────────────
const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// 1. Validate: all fields must be present
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		// 2. Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already registered' });
		}

		// 3. Hash the password
		const hashedPassword = bcrypt.hashSync(password, 10);

		// 4. Create a JWT token
		const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '365d' });

		// 5. Save user to database
		await User.create({ name, email, password: hashedPassword, token, role: 'user' });

		return res.status(201).json({ message: 'User registered successfully' });

	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// ── Login ─────────────────────────────────────────────────────────
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// 1. Find the user
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User not found. Please register first.' });
		}

		// 2. Compare entered password with stored hash
		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		// 3. Return user info and token to the frontend
		return res.status(200).json({
			id:    user._id,
			name:  user.name,
			email: user.email,
			role:  user.role,
			token: user.token
		});

	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

module.exports = { register, login };

