const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean(); 
        res.render("users", { users });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.showRegister = (req, res) => {
    res.render("register");
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const trimmedUsername = username ? username.trim() : "";

        // backend validation
        if (!trimmedUsername || !password) 
        {
            return res.render("register", 
            {
                error: "Username and password are required."
            });
        }

        if (password.length < 4) 
        {
            return res.render("register", 
            {
                error: "Password must be at least 4 characters long."
            });
        }

        const existing = await User.findOne({ username: trimmedUsername });
        if (existing) {
            return res.render("register", { error: "Username already taken!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username: trimmedUsername, handle: trimmedUsername, password: hashedPassword });
        await user.save();

        req.session.userId = user._id;
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.showLogin = (req, res) => {
    res.render("login");
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const trimmedUsername = username ? username.trim() : "";

        // backend validation
        if (!trimmedUsername || !password) 
        {
            return res.render("login", {
                error: "Username and password are required."
            });
        }       

        const user = await User.findOne({ username: trimmedUsername });
        if (!user) {
            return res.render("login", { error: "Username not found!" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render("login", { error: "Wrong password!" });
        }

        req.session.userId = user._id;
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect("/");
        }
        res.redirect("/login");
    });
};