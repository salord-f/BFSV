const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema(
    {
        authorMail: {type: String, required: true},
        content: {type: String, required: true},
        time: {type: Date, default: Date.now},
    }
);

module.exports = mongoose.model('comments', comment);
