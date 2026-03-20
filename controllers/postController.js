const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author")
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        posts.forEach(post => {
            post.date = new Date(post.createdAt).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });
        });
        res.render("index", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getPost = async (req, res) => {
    try {

        // Validate ObjectId
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).render('error', {
                message: 'Post not found'
            });
        }

        const post = await Post.findById(req.params.id)
            .populate("author")
            .lean();

        if (!post) {
            return res.status(404).render('error', {
                message: 'Post not found'
            });
        }

        const comments = await Comment.find({ post: req.params.id })
            .populate("author")
            .lean();

        res.render("post", { post, comments });
    } catch (err) {
        console.error(err);
        res.status(404).render("error", { message: "Post not found" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const profile = await User.findOne({ username: req.params.username });

        if (!profile)
        {
            return res.status(404).render('error', { message: `User '${req.params.username}' not found`} );
        }

        const posts = await Post.find({ author: profile._id })
            .populate("author")
            .sort({createdAt: -1 })
            .lean();

        const comments = await Comment.find({ author: profile._id })
            .populate("post")
            .lean();

        posts.forEach(post =>
        {
            post.date = new Date(post.createdAt).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });
        });

        comments.forEach(comment =>
        {
            comment.date = new Date(comment.createdAt).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });
        });


        res.render("profile",
        {
            profile: profile.toObject(),
            posts,
            comments,
            user: res.locals.user,
            isOwner: res.locals.user?._id?.toString() === profile._id.toString()
        });
    } catch (err) {
        console.error(err);
        res.status(500).render("error", { message: "SERVER ERROR" });
    }
};

exports.showCreatePost = async (req, res) => {
    res.render("create-post");
};

exports.createPost = async (req, res) => {
    try {
        const { title, description, location, "travel-style": travelStyle } = req.body;

        const imagePaths = req.files ?
            req.files.map(file => `/uploads/${file.filename}`) :
            [];

        const newPost = new Post({
            title,
            body: description,
            author: req.session.userId,
            hashtags: [location, travelStyle].filter(Boolean),
            images: imagePaths,
            commentCount: 0
        });

        await newPost.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};