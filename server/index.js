const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./auth');

const db = require('./db');
const pluginRouter = require('./routes/plugin-router');
const userRouter = require('./routes/user-router');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', auth, (req, res) => {
    res.send('Hello World!')
});

app.use('/plugins', pluginRouter);
app.use('/users', userRouter);


process.on('unhandledRejection', (error, promise) => {
    console.log('Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log('The error was: ', error);
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
