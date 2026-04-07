const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "public/uploads/" });

const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

function isAuthenticated(req, res, next) 
{
    if (!req.session.userId) 
    {
        return res.redirect("/login");
    }
    next();
}

// Create and Get Posts
router.get("/", postController.getAllPosts);
router.get("/post/:id", postController.getPost);
router.get("/create-post", isAuthenticated, postController.showCreatePost);
router.post("/posts", isAuthenticated, upload.array("photo", 5), postController.createPost);

// User Profile
router.get("/edit-profile", isAuthenticated, userController.showEditProfile);
router.post("/edit-profile", isAuthenticated, upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'coverPic', maxCount: 1 }
]), userController.editProfile);

router.get("/user/:username", postController.getUserProfile);

// Edit and Delete Posts
router.get("/post/:id/edit", isAuthenticated, postController.showEditPost);
router.post("/post/:id/edit", isAuthenticated, upload.array("photo", 5), postController.editPost);
router.post("/post/:id/delete", isAuthenticated, postController.deletePost);

// Comments
router.get('/comment/:id/edit', isAuthenticated, commentController.renderEditComment);
router.post("/post/:id/comment", isAuthenticated, commentController.createComment);
router.post("/comment/:commentId/delete", isAuthenticated, commentController.deleteComment);
router.post("/comment/:commentId/edit", isAuthenticated, commentController.editComment);

// Register and Login
router.get("/register", userController.showRegister);
router.post("/register", userController.register);
router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;