const express = require('express');

const UserController = require('../controllers/user-controller');

const router = express.Router();
const auth = require('../auth');

router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getUserById);
router.get('/', auth, UserController.getUsers);

router.post('/login', UserController.login);

module.exports = router;
