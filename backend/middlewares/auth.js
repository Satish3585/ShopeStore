const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
	try {
		// Read the token from the request header (sent by the frontend)
		const token = req.headers.token;

		if (!token) {
			return res.status(401).json({ message: 'No token. Please login first.' });
		}

		// Verify the token using the same secret used to create it
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach decoded user info to req so controllers can use it
		req.user = decoded;   // { email: '...' }

		next();  // token is valid — let the request continue

	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token.' });
	}
};

module.exports = { protect };

