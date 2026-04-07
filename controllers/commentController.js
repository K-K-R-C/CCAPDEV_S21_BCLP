const Comment = require("../model/comment");
const Post = require("../model/post");

exports.createComment = async (req, res) =>
{
    try
    {
        if (!req.session.userId) return res.redirect("/login");

        const text = req.body.text ? req.body.text.trim() : "";

        // validates commnent text
        if (!text) 
        {
            return res.redirect(`/post/${req.params.id}`);
        }

        const parentComment = req.body.parentComment || null;

        const comment = new Comment
        ({
            text: req.body.text.trim(),
            author: req.session.userId,
            post: req.params.id,
            parentComment: parentComment
        });

        await comment.save();

        // increases comment count
        await Post.findByIdAndUpdate(req.params.id, {
            $inc: { commentCount: 1 }
        });

        res.redirect(`/post/${req.params.id}`);
    }
    catch (err)
    {
        console.error(err);
        res.redirect(`/post/${req.params.id}`);
    }

}

exports.deleteComment = async (req, res) =>
{
    try
    {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment)
        {
            return res.redirect("back");
        }

        // only owner can delete
        if (comment.author.toString() !== req.session.userId)
        {
            return res.status(403).send("Unauthorized");
        }

        await Comment.deleteOne({ _id: comment._id });

        // decreases the comment count
        await Post.findByIdAndUpdate(comment.post, {
            $inc: { commentCount: -1 }
        });

        res.redirect(`/post/${comment.post}`);
    }
    catch (err)
    {
        console.error(err);
        res.redirect("back");
    }
}

exports.editComment = async (req, res) =>
{
    try
    {
        const { text } = req.body;

        const comment = await Comment.findById(req.params.commentId);

        if (!comment)
        {
            return res.redirect("back");
        }

        // only author can edit
        if (comment.author.toString() !== req.session.userId)
        {
            return res.status(403).send("Unauthorized");
        }

        if (!text)
        {
            return res.redirect(`/post/${comment.post}`);
        }

        comment.text = text.trim();
        await comment.save();

        res.redirect(`/post/${comment.post}`);
    }
    catch (err)
    {
        console.error(err);
        res.redirect("back");
    }
}

exports.renderEditComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.redirect("back");
        }

        // only author can edit
        if (comment.author.toString() !== req.session.userId) {
            return res.status(403).send("Unauthorized");
        }

        res.render("edit-comment", { comment });
    } catch (err) {
        console.error(err);
        res.redirect("back");
    }
};