const assert = require('assert');

const User = require('../models/user');
const Comment = require('../models/comment');

const Mongo = require('../db/index');

after(function () {
    Mongo.close()
});

function generateString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('Model', function () {
    describe('User', function () {
        it('should create a new user', async () => {
            const user = new User;
            console.log(user._id);
            user.mail = generateString(10) + '@email.com';
            user.password = 'password';
            await user.save();
            Mongo.collection('users').findOneAndDelete({mail: user.mail})
        });
        it('should add a comment', async () => {
            const user = new User;
            console.log(user._id);
            user.mail = generateString(10) + '@email.com';
            user.password = 'password';
            await user.save();
            const comment = new Comment;
            comment.authorMail = user.mail;
            comment.content = 'Content';
            await comment.save();
            const result = await Mongo.collection('comments').findOne({_id: comment._id});
            assert('Content' === JSON.parse(JSON.stringify(result)).content);
            Mongo.collection('users').findOneAndDelete({mail: user.mail});
            Mongo.collection('comments').findOneAndDelete({_id: comment._id})
        })
    })
});
