const jwt = require('jsonwebtoken');

const User = require('../models/user');

createUser = (req, res) => {
    //console.log(req.body.mail);

    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user.',
        })
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({success: false, message: 'Wrong user format.'})
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created.',
                user: user,
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created.',
                user: user
            })
        })
};

updateUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update a user.',
        })
    }

    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found.',
            })
        }
        /*user.name = body.name;
        user.time = body.time;
        user.rating = body.rating;*/
        // TODO
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated.',
                    user: user
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated.',
                })
            })
    })
};

deleteUser = async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!user) {
            return res
                .status(404)
                .json({success: false, error: `User not found.`})
        }

        return res.status(200).json({success: true, data: user})
    }).catch(err => console.log(err))
};

getUserById = async (req, res) => {
    await User.findOne({_id: req.params.mail}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        return res.status(200).json({success: true, data: user})
    }).catch(err => console.log(err))
};

getUsers = async (req, res) => {
    // console.log(req.body.mail);
    await User.find({}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!user.length) {
            return res.status(200).json({success: false, error: `No user.`})
        }
        return res.status(200).json({success: true, data: user})
    }).catch(err => console.log(err))
};

login = async (req, res) => {
    const body = req.body;
    await User.findOne({mail: body.mail}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (body.password) {
            user.comparePassword(body.password, (err, correct) => {
                console.log('Correct password : ' + correct);
                if (correct) {
                    jwt.sign({user}, 'BaPtIsTeLeGaY', {expiresIn: '24h'}, (err, token) => {
                        if (err) {
                            console.log(err)
                        }
                        //console.log(token);
                        const decodedToken = jwt.verify(token, 'BaPtIsTeLeGaY');
                        console.log(decodedToken.user);
                        return res.send(token);
                    });
                } else {
                    res.status(403).send('Wrong password');
                }
            });
        } else {
            res.status(403).send('Please provide a password');
        }

    }).catch(err => console.log(err))
};

addToCart = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update the cart.',
        })
    }

    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found.',
            })
        }
        user.cart.push(body);
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Cart updated.',
                    cart: user.cart
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Cart not updated.',
                })
            })
    })
};

deleteFromCart = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update the cart.',
        })
    }

    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found.',
            })
        }

        user.cart = user.cart.filter(pluginId => pluginId !== body._id);
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Cart updated.',
                    cart: user.cart
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Cart not updated.',
                })
            })
    })
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    login,
    addToCart,
    deleteFromCart
};
