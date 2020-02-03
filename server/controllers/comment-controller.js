const Comment = require('../models/comment');

createComment = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comment.',
        })
    }

    const comment = new Comment(body);

    if (!comment) {
        return res.status(400).json({success: false, message: 'Wrong comment format.'})
    }

    comment.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: comment._id,
                message: 'Comment created.',
                comment: comment,
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Comment not created.',
                comment: comment
            })
        })
};

updateComment = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update a comment.',
        })
    }

    Comment.findOne({_id: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comment not found.',
            })
        }
        /*comment.name = body.name;
        comment.time = body.time;
        comment.rating = body.rating;*/
        // TODO
        comment.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: comment._id,
                    message: 'Comment updated.',
                    comment: comment
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Comment not updated.',
                })
            })
    })
};

deleteComment = async (req, res) => {
    await Comment.findOneAndDelete({_id: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!comment) {
            return res
                .status(404)
                .json({success: false, error: `Comment not found.`})
        }

        return res.status(200).json({success: true, data: comment})
    }).catch(err => console.log(err))
};

getCommentById = async (req, res) => {
    await Comment.findOne({_id: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        return res.status(200).json({success: true, data: comment})
    }).catch(err => console.log(err))
};

getComments = async (req, res) => {
    await Comment.find({}, (err, comment) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!comment.length) {
            return res
                .status(404)
                .json({success: false, error: `No comment.`})
        }
        return res.status(200).json({success: true, data: comment})
    }).catch(err => console.log(err))
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
    getCommentById,
};
