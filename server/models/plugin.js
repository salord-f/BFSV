const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');
const categories = require('./categories');
const comment = require('./comment');

const plugin = new Schema(
    {
        name: {type: String, required: true},
        version: {type: String, required: true, validate: /\d.\d.\d/},
        description: {type: String, required: true},
        author: {type: String, required: true},
        image: {type: String, required: true},
        codeLink: String,
        categories: [categories],
        tags: [String],
        youtubeLink: String,
        likes: [String], // user mails
        comments: [{type: mongoose.Schema.ObjectId, ref: 'comments'}],
        status: {
            available: {type: Boolean, default: false},
            automaticValidation: {type: Boolean, default: false},
            manualValidation: {type: Boolean, default: false},
        },
        tryLink: String,
        price: Number,
        zipLocation: String,
    },
    {timestamps: true}
);

module.exports = mongoose.model('plugins', plugin);
