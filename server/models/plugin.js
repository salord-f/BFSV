const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema(
    {
        authorMail: { type: String, required: true },
        content: { type: String, required: true },
        time: { type: Date, default: Date.now },
    }
);

const plugin = new Schema(
    {
        name: { type: String, required: true },
        version: { type: String, required: true, validate: /\d.\d.\d/ },
        description: { type: String, required: true },
        author: { type: String, required: true },
        image: { type: String, required: true },
        codeLink: String,
        categories: [String],
        tags: [String],
        youtubeLink: String,
        likes: [String], // user mails
        comments: [comment],
        status: {
            available: { type: Boolean, default: true },
            automaticValidation: { type: Boolean, default: false },
            manualValidation: { type: Boolean, default: false },
        },
        visible: { type: Boolean, default: true },
        tryLink: String,
        price: { type: Number, default: 0 },
        zipLocation: String,
    },
    { timestamps: true }
);

module.exports = { plugin: mongoose.model('plugins', plugin), comment: mongoose.model('comment', comment) };
