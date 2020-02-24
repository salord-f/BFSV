const generateString = require('../utils/utils').generateString;

const assert = require('assert');
const mongoose = require('mongoose');

const Mongo = require('../db/index');

const chai = require('chai'),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);

let server = require('../index');

after(function () {
    Mongo.close()
});

const mail = generateString(10) + "@email.com";
let user;

describe('User controller', function () {
    it('should get all users', async () => {
        const req = await chai.request(server)
            .get('/users');
        assert.equal(req.status, 401)
    });
    it('should create a user and authenticate', async () => {
        let req = await chai.request(server)
            .post('/users')
            .send({
                mail: mail,
                password: "password"
            });
        assert.equal(req.status, 201);
        user = req.body.user;
        req = await chai.request(server)
            .post('/users/login')
            .send({
                mail: mail,
                password: "password"
            });
        assert.equal(req.status, 200);
        //console.log(req.text);
        const token = req.text;

        req = await chai.request(server)
            .get('/users')
            .set('Authorization', 'Bearer ' + token);
        //console.log(req)
        assert.equal(req.status, 200);
        //console.log(req.body)
    });
    it('Should add to the cart', async () => {
        let req = await chai.request(server)
            .put('/users/' + user._id + '/cart')
            .send({
                plugin: mongoose.Types.ObjectId()
            });
        assert.equal(req.status, 200)
    })
    it('Should delete the user', async() => {
        let req = await chai.request(server)
            .delete('/users/' + user._id);
        assert.equal(req.status, 200);
        req = await chai.request(server)
            .get('/users/' + user._id);
        assert.equal(req.status, 404);
    })
});
