const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const indexRoutes = require("./routes/indexRoutes");
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

// Trust proxy (useful if deployed behind proxies like Render or Heroku)
app.set("trust proxy", 1);

// Handlebars Setup
const hbs = exphbs.create({
    extname: ".hbs",
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: false,
    helpers: {
        formatDate: (date) => {
            return new Date(date).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });
        },
        eq: (a, b) => a === b, // for radio buttons
        json: (context) => JSON.stringify(context) // JSON helper for posts dataset
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});

// Register Handlebars engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/gunitaph")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || "gunita-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Add current user to locals for templates
app.use(async (req, res, next) => {
    if (req.session.userId) {
        const User = require("./model/User");
        res.locals.user = await User.findById(req.session.userId);
    }
    next();
});

// Routes
app.use("/", indexRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
