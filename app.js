const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.connect("mongodb://127.0.0.1/gunitaph")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get("/", (req, res) => 
    res.render("index")
);

// Register
app.get("/register", (req, res) => 
    res.render("register")
);

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // TODO: save user in DB
  res.redirect("/login"); // after registration, go to login
});

// Login
app.get("/login", (req, res) => 
    res.render("login")
);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // TODO: check credentials
  res.redirect("/"); // go to home if correct
});

// Profile page
app.get("/profile", (req, res) => {
    res.render("profile"); // pass data
});

// Create post page
app.get("/create-post", (req, res) => {
    res.render("create-post");
});

// Single post page
app.get("/post/:id", (req, res) => 
    res.render("post", { // pass post data
}));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});