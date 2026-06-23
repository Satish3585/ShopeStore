// const mongoose = require('mongoose');

// const connectDB = async () => {
// 	try {
// 		// process.env.MONGODB_URL reads from your .env file
// 		await mongoose.connect(process.env.MONGODB_URL);
// 		console.log('✅  Database connected');
// 	} catch (error) {
// 		console.log('❌  Database connection failed:', error.message);
// 		// Stop the server if the database fails to connect
// 		process.exit(1);
// 	}
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // ✅ correct key
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
