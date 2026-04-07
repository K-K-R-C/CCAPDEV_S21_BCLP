const Post = require("../model/post");
const User = require("../model/user");
const Comment = require("../model/comment");

// Helper function for destinations
const getDestination = (location) => {
    const lowerLoc = location?.toLowerCase();
    if (lowerLoc?.includes('luzon') || lowerLoc?.includes('manila') || lowerLoc?.includes('batanes')) return 'Luzon';
    if (lowerLoc?.includes('visayas') || lowerLoc?.includes('cebu') || lowerLoc?.includes('boracay')) return 'Visayas';
    if (lowerLoc?.includes('mindanao') || lowerLoc?.includes('davao')) return 'Mindanao';
    return null;
};

// Get all posts (NOW with search + Filter with Query Params)
exports.getAllPosts = async (req, res) => {
    try {
        const { search, destination, travelStyle } = req.query;

        let query = {};

        // Search in title, body or hashtags
        if (search)
        {
            query.$or =
            [
                { title: { $regex: search, $options: 'i' } },
                { body: { $regex: search, $options: 'i' } },
                { hashtags: { $regex: search, $options: 'i'} }
            ];
        }

        // Destination filter
        if (destination && destination !== 'all')
        {
            query.destination = destination;
        }

        // Travel style filter
        if (travelStyle && travelStyle !== 'all')
        {
            query.travelStyle = travelStyle;
        }

        const posts = await Post.find(query)
            .populate("author")
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        // Get hashtags from posts
        const trendingHashtags = [
            ...new Set(posts.flatMap(post => post.hashtags || []))
        ]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

        posts.forEach(post => {
            post.date = new Date(post.createdAt).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });

            post.isEdited =
                post.updatedAt &&
                post.createdAt &&
                new Date(post.updatedAt).getTime() > new Date(post.createdAt).getTime();
        });
        
        res.render("index",
        {
            posts,
            trendingHashtags,
            filters:
            {
                search: search || '',
                destination: destination || 'all',
                travelStyle: travelStyle || 'all'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Get post
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

        post.isEdited =
            post.updatedAt &&
            post.createdAt &&
            new Date(post.updatedAt).getTime() > new Date(post.createdAt).getTime();

        const buildCommentTree = (comments) => {
            const map = {};
            const roots = [];

            comments.forEach(comment => {
                comment.replies = [];
                map[comment._id] = comment;
            });

            comments.forEach(comment => {
                if (comment.parentComment) {
                    map[comment.parentComment]?.replies.push(comment);
                } else {
                    roots.push(comment);
                }
            });

            return roots;
        };

        const allComments = await Comment.find({ post: req.params.id })
            .populate("author")
            .lean();

        const comments = buildCommentTree(allComments);

        const markOwnership = (comments, user) => {
            comments.forEach(comment => {
                comment.isOwner =
                    user &&
                    comment.author._id.toString() === user._id.toString();

                if (comment.replies && comment.replies.length > 0) {
                    markOwnership(comment.replies, user);
                }
            });
        };

        markOwnership(comments, res.locals.user);

        const markEdited = (comments) => {
            comments.forEach(comment => {
                comment.isEdited =
                    comment.updatedAt &&
                    comment.createdAt &&
                    new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime();

                if (comment.replies && comment.replies.length > 0) {
                    markEdited(comment.replies);
                }
            });
        };

        markEdited(comments);

        res.render("post", {
            post,
            comments,
            user: res.locals.user,
            isOwner: res.locals.user?._id?.toString() === post.author._id.toString()
        });
    } catch (err) {
        console.error(err);
        res.status(404).render("error", { message: "Post not found" });
    }
};

// Show create post
exports.showCreatePost = async (req, res) => {
    res.render("create-post", { user: res.locals.user });
};

// Create a post
exports.createPost = async (req, res) => {
    try {
        let { title, description, location, "travel-style": travelStyle } = req.body;

        // VALIDATION IN BACKEND (for title/description length, and travel style option(s))
        title = title?.trim();
        description = description?.trim();

        if (!title || title.length < 3)
        {
            return res.render('create-post',
            {
                error: 'Title must be 3+ characters',
                user: res.locals.user
            });
        }

        if (!description || description.length < 10) {
            return res.render('create-post',
            {
                error: 'Description must be 10+ characters',
                user: res.locals.user
            });
        }

        if (!travelStyle) {
            return res.render('create-post', {
                error: 'Please select travel style',
                user: res.locals.user
            });
        }

        const imagePaths = req.files?.map(file => `/uploads/${file.filename}`) || [];

        const newPost = new Post({
            title,
            body: description,
            author: req.session.userId,
            hashtags: [location, travelStyle].filter(Boolean),
            images: imagePaths,
            commentCount: 0,
            destination: getDestination(location),
            travelStyle: travelStyle
        });

        await newPost.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).render("error", { message: "Server error" });
    }
};

// Get the user profile
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

            post.isEdited =
                post.updatedAt &&
                post.createdAt &&
                new Date(post.updatedAt).getTime() > new Date(post.createdAt).getTime();
        });

        comments.forEach(comment =>
        {
            comment.date = new Date(comment.createdAt).toLocaleDateString("en-PH", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            });

            comment.isEdited =
            comment.updatedAt &&
            comment.createdAt &&
            new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime();
        });

        const allPosts = await Post.find().lean();

        const trendingHashtags = [
            ...new Set(allPosts.flatMap(post => post.hashtags || []))
        ]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);


        res.render("profile",
        {
            profile: profile.toObject(),
            posts,
            comments,
            user: res.locals.user,
            isOwner: res.locals.user?._id?.toString() === profile._id.toString(),
            filters: req.query,
            trendingHashtags
        });
    } catch (err) {
        console.error(err);
        res.status(500).render("error", { message: "SERVER ERROR" });
    }
};

// Show the edit form
exports.showEditPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();

        if (!post) {
            return res.status(404).render("error", { message: "Post not found" });
        }

        // Ownership check
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).render("error", { message: "Unauthorized" });
        }

        res.render("edit-post", { post, user: res.locals.user });
    } catch (err) {
        console.error(err);
        res.status(500).render("error", { message: "Server error" });
    }
};

// Handle post edit
exports.editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).render("error", { message: "Post not found" });
        }

        // Post ownership check
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).render("error", { message: "Unauthorized" });
        }

        let { title, description, location, "travel-style": travelStyle } = req.body;

        // Trim inputs
        title = title?.trim() || post.title;
        description = description?.trim() || post.body;

        // Update post fields
        post.title = title;
        post.body = description;
        post.hashtags = [location, travelStyle].filter(Boolean);
        post.destination = getDestination(location);
        post.travelStyle = travelStyle || post.travelStyle;

        // Handle new images if uploaded
        if (req.files && req.files.length > 0) {
            post.images = req.files.map(file => `/uploads/${file.filename}`);
        }

        post.updatedAt = new Date();

        await post.save();
        res.redirect(`/post/${post._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).render("error", { message: "Server error" });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).render("error", { message: "Post not found" });
        }

        // Post ownership check
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).render("error", { message: "Unauthorized" });
        }

        await Post.deleteOne({ _id: post._id });

        // delete comments related to this post
        await Comment.deleteMany({ post: post._id });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).render("error", { message: "Server error" });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.session.userId;

        // Remove user from downvotes
        post.downvotes = post.downvotes.filter(id => id.toString() !== userId.toString());

        // Toggle like
        const hasLiked = post.upvotes.some(id => id.toString() === userId.toString());
        if (hasLiked) {
            post.upvotes = post.upvotes.filter(id => id.toString() !== userId.toString());
        } else {
            post.upvotes.push(userId);
        }

        await post.save();

        res.json({
            upvotes: post.upvotes.length,
            downvotes: post.downvotes.length,
            userLiked: !hasLiked,
            userDisliked: false
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Dislike a post
exports.dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.session.userId;

        // Remove user from upvotes
        post.upvotes = post.upvotes.filter(id => id.toString() !== userId.toString());

        // Toggle dislike
        const hasDisliked = post.downvotes.some(id => id.toString() === userId.toString());
        if (hasDisliked) {
            post.downvotes = post.downvotes.filter(id => id.toString() !== userId.toString());
        } else {
            post.downvotes.push(userId);
        }

        await post.save();

        res.json({
            upvotes: post.upvotes.length,
            downvotes: post.downvotes.length,
            userLiked: false,
            userDisliked: !hasDisliked
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
