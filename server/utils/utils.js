const generateString = function generateString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const errorHandler = function errorHandler(res, message) {
    console.log('Error : ' + message);
    return res.status(400).json({
        success: false,
        error: message
    })
};

module.exports = {generateString, errorHandler};
