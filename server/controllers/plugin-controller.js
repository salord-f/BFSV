const Plugin = require('../models/plugin');

createPlugin = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a plugin.',
        })
    }

    body.image = req.file.path;
    const plugin = new Plugin(body);
    if (!plugin) {
        return res.status(400).json({success: false, message: 'Wrong plugin format.'})
    }
    console.log('Plugin created.');
    console.log(plugin);
    plugin.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: plugin._id,
                message: 'Plugin created.',
                plugin: plugin,
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({
                error,
                message: 'Plugin not created.',
                plugin: plugin
            })
        });

};

updatePlugin = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update a plugin.',
        })
    }

    Plugin.findOne({_id: req.params.id}, (err, plugin) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Plugin not found.',
            })
        }
        /*plugin.name = body.name;
        plugin.time = body.time;
        plugin.rating = body.rating;*/
        // TODO
        plugin.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: plugin._id,
                    message: 'Plugin updated.',
                    plugin: plugin
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Plugin not updated.',
                })
            })
    })
};

deletePlugin = async (req, res) => {
    await Plugin.findOneAndDelete({_id: req.params.id}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!plugin) {
            return res
                .status(404)
                .json({success: false, error: `Plugin not found.`})
        }

        return res.status(200).json({success: true, data: plugin})
    }).catch(err => console.log(err))
};

getPluginById = async (req, res) => {
    await Plugin.findOne({_id: req.params.id}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        return res.status(200).json({success: true, data: plugin})
    }).catch(err => console.log(err))
};

getPluginImage = async (req, res) => {
    console.log('getting plugin');
    await Plugin.findOne({_id: req.params.id}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).sendFile(__dirname + '/../' + plugin.image);
    }).catch(err => console.log(err))
};

getPlugins = async (req, res) => {
    await Plugin.find({}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!plugin.length) {
            return res
                .status(404)
                .json({success: false, error: `No plugin.`})
        }
        return res.status(200).json({success: true, data: plugin})
    }).catch(err => console.log(err))
};

module.exports = {
    createPlugin,
    updatePlugin,
    deletePlugin,
    getPlugins,
    getPluginById,
    getPluginImage
};
