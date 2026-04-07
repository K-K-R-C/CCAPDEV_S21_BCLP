const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const indexRoutes = require("./routes/indexRoutes");
const hbs = require("express-handlebars");
require('dotenv').config(); // load .env

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/gunitaph")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.engine("hbs", hbs.engine({
    extname: ".hbs",
    partialsDir: path.join(__dirname, "views/partials"),
    allowProtoPropertiesByDefault: true,
    defaultLayout: false,
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    helpers: {
        formatDate: (date) => {
            return new Date(date).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });
        },

        eq: (a, b) => a === b //For radio button checked state
    },
    runtimeOptions:
    {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || "gunita-secret",  // Fallback for local
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production'  // HTTPS on Render
    }
}));

// Middleware
app.use(async (req, res, next) => {
    if (req.session.userId) {
        const User = require("./model/user");
        res.locals.user = await User.findById(req.session.userId);
    }
    next();
});

// Routes
app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});