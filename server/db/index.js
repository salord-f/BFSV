const mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/webstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;
