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

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.get("/create-post", (req, res) => {
    res.render("create-post");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});