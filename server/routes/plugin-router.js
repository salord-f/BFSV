const express = require('express');

const PluginController = require('../controllers/plugin-controller');

const router = express.Router();

router.post('/', PluginController.createPlugin);
router.put('/:id', PluginController.updatePlugin);
router.delete('/:id', PluginController.deletePlugin);
router.get('/:id', PluginController.getPluginById);
router.get('/', PluginController.getPlugins);

module.exports = router;
