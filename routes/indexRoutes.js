const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

router.get("/", postController.getAllPosts);
router.get("/post/:id", postController.getPost);
router.get("/user/:username", postController.getUserProfile);
router.get("/create-post", postController.showCreatePost);
router.post("/posts", postController.createPost);
router.get("/register", userController.showRegister);
router.post("/register", userController.register);
router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;