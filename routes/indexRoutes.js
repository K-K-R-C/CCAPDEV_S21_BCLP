const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "public/uploads/" });

const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

// Create and Get Posts
router.get("/", postController.getAllPosts);
router.get("/post/:id", postController.getPost);
router.get("/create-post", postController.showCreatePost);
router.post("/posts", upload.array("photo", 5), postController.createPost);

// User Profile
router.get("/user/:username", postController.getUserProfile);

// Edit and Delete Posts
router.get("/post/:id/edit", postController.showEditPost);
router.post("/post/:id/edit", upload.array("photo", 5), postController.editPost);
router.post("/post/:id/delete", postController.deletePost);

// Comments
router.post("/post/:id/comment", commentController.createComment);

// Register and Login
router.get("/register", userController.showRegister);
router.post("/register", userController.register);
router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;