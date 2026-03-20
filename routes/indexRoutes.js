const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "public/uploads/" });

const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

router.get("/", postController.getAllPosts);
router.get("/post/:id", postController.getPost);
router.get("/user/:username", postController.getUserProfile);
router.get("/create-post", postController.showCreatePost);
router.post("/posts", upload.array("photo", 5), postController.createPost);
router.post("/post/:id/comment", commentController.createComment);
router.get("/register", userController.showRegister);
router.post("/register", userController.register);
router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;