const generateString = require('../utils/utils').generateString;
const mongoose = require('mongoose');

const assert = require('assert');

const User = require('../models/user');

const Mongo = require('../db/index');

after(function () {
    Mongo.close()
});

const mail = generateString(10) + '@email.com';


describe('User', function () {
    it('Should create a new user', async () => {
        let user = new User;
        user.mail = mail;
        user.password = 'password';
        await user.save();
        user = await Mongo.collection('users').findOne({mail: user.mail});
        assert(user.mail === mail);
        assert(user.mail !== 'password'); // since it's hashed
    });
    it('Should add plugins to the user cart', async () => {
        const user = await Mongo.collection('users').findOne({mail: mail});
        assert(user.mail === mail);
        user.cart.push();
    });
    it('Should delete the created user', async () => {
        let user = await Mongo.collection('users').findOne({mail: mail});
        assert(user !== null);
        await Mongo.collection('users').findOneAndDelete({mail: user.mail});
        user = await Mongo.collection('users').findOne({mail: user.mail});
        assert(user === null);
    });

});
