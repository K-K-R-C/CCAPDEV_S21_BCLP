const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author")
            .sort({ createdAt: -1 })
            .lean();
        res.render("index", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author")
            .lean();

        const comments = await Comment.find({ post: req.params.id })
            .populate("author")
            .lean();

        res.render("post", { post, comments });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const profile = await User.findOne({ username: req.params.username }).lean();

        const posts = await Post.find({ author: profile._id })
            .populate("author")
            .lean();

        const comments = await Comment.find({ author: profile._id })
            .populate("post")
            .lean();

        res.render("profile", { profile, posts, comments });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.showCreatePost = async (req, res) => {
    res.render("create-post");
};

exports.createPost = async (req, res) => {
    try {
        const { title, description, location, 'travel-style': travelStyle } = req.body;

        const newPost = new Post({
            title,
            body: description,
            author: req.session.userId,
            hashtags: [location, travelStyle].filter(Boolean),
            images: req.file ? [req.file.filename] : [] 
        });

        await newPost.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};