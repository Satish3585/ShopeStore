// 1. Load environment variables from .env FIRST (must be at the top)
require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const morgan    = require('morgan');
const connectDB = require('./config/db');

// ── Import route files ────────────────────────────────────────────
const authRoutes    = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes    = require('./routes/cartRoutes');
const orderRoutes   = require('./routes/orderRoutes');

// 2. Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors());             // allow frontend to call this API
app.use(morgan('dev'));      // log every request in the terminal
app.use(express.json());     // parse JSON body from requests

// ── Routes ────────────────────────────────────────────────────────
app.use('/',         authRoutes);    // POST /register   POST /login
app.use('/products', productRoutes); // GET /products    POST /products  etc.
app.use('/cart',     cartRoutes);    // GET /cart        POST /cart/add  etc.
app.use('/orders',   orderRoutes);   // POST /orders/place

// ── Start server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀  Server running on http://localhost:${PORT}`);
});
