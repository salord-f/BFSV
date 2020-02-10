const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

const PluginController = require('../controllers/plugin-controller');

const router = express.Router();

router.post('/', upload.single('image'), PluginController.createPlugin);
router.put('/:id', PluginController.updatePlugin);
router.delete('/:id', PluginController.deletePlugin);
router.get('/:id', PluginController.getPluginById);
router.get('/:id/image', PluginController.getPluginImage);
router.get('/', PluginController.getPlugins);

module.exports = router;
