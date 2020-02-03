const assert = require('assert');

const UserConstroller = require('../controllers/user-controller');

const Mongo = require('../db/index');

const chai = require('chai'),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);

let server = require('../index');

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

describe('User controller', function () {
    describe('User', function () {
        it('should get all users', async () => {
            const req = await chai.request(server)
                .get('/users');
            assert.equal(req.status, 401)
        });
        it('should create a user and authenticate', async () => {
            await chai.request(server)
                .post('/users')
                .send({
                    mail: "test@email.com",
                    password: "password"
                });
            const req = await chai.request(server)
                .post('/users/login')
                .send({
                    mail: "test@email.com",
                    password: "password"
                });
            console.log(req.text);
            await chai.request(server)
                .get('/users')
                .set('Authorization', 'Bearer ' + req.text);
        })
    })
});
