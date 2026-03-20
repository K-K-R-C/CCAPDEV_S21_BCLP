const Comment = require("../model/Comment");

exports.createComment = async (req, res) =>
{
    try
    {
        if (!req.session.userId) return res.redirect("/login");

        const comment = new Comment
        ({
            text: req.body.text.trim(),
            author: req.session.userId,
            post: req.params.id
        });

        await comment.save();
        res.redirect(`/post/${req.params.id}`);
    }
    catch (err)
    {
        console.error(err);
        res.redirect(`/post/${req.params.id}`);
    }

}