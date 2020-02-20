const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});


const PluginController = require('../controllers/plugin-controller');

const router = express.Router();

router.post('/', upload.fields([{name: 'image'}, {name: 'plugin'}]), PluginController.createPlugin);
router.put('/:id', PluginController.updatePlugin);
router.delete('/:id', PluginController.deletePlugin);
router.get('/:id', PluginController.getPluginById);
router.get('/', PluginController.getPlugins);

router.get('/:id/image', PluginController.getPluginImage);

router.post('/:id/comments', PluginController.addComment);

router.post('/:id/likes', PluginController.addLike);
router.delete('/:id/likes', PluginController.deleteLike);



module.exports = router;
