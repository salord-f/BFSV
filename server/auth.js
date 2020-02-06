const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'BaPtIsTeLeGaY');
        const mail = decodedToken.user.mail;
        if (req.body.mail && req.body.mail !== mail) {
            throw 'Invalid user ID';
        } else {
            req.body.mail = mail;
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
