const Plugin = require('../models/plugin').plugin;
const Comment = require('../models/plugin').comment;

const fs = require('fs');

const yauzl = require('yauzl');
const unzip = require('../utils/unzip');
const error = require('../utils/utils');
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');


createPlugin = (req, res) => {
    const body = req.body;

    if (!body || !body.name || !body.description || !body.version) {
        error.errorHandler(res, 'Plugin upload without information.');
    }
    if (!req.files.image) {
        error.errorHandler(res, 'Plugin upload without image.');
    }
    if (!req.files.plugin) {
        error.errorHandler(res, 'Plugin upload without zip.');
    }

    console.log('image');
    const image = req.files.image[0];
    const pluginZip = req.files.plugin[0];
    console.log(image.path);
    console.log('zip');
    console.log(pluginZip);

    yauzl.open(pluginZip.path, {lazyEntries: true}, function (err, zipfile) {
        if (err) throw err;
        unzip(err, zipfile, req.files.plugin[0].path.slice(0, -4));
    });

    fs.rename(image.path, 'uploads/images/' + pluginZip.originalname.slice(0, -4) + '-' + image.originalname, function (err) {
        if (err) {
            console.log('Unable to copy image to plugin folder.');
        }
    });


    body.image = 'uploads/images/' + pluginZip.originalname.slice(0, -4) + '-' + image.originalname;
    body.zipLocation = pluginZip.path;
    body.tryLink = pluginZip.originalname.slice(0, -4);

    const plugin = new Plugin(body);
    if (!plugin) {
        return res.status(400).json({success: false, message: 'Wrong plugin format.'})
    }
    console.log('Plugin created.');
    console.log(plugin);
    plugin.save()
        .then(async () => {
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
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
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
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
    }
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
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
    }
    await Plugin.findOne({_id: req.params.id}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        return res.status(200).json({success: true, data: plugin})
    }).catch(err => console.log(err))
};

getPluginImage = async (req, res) => {
    // console.log('getting plugin');
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
    }
    await Plugin.findOne({_id: req.params.id}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).sendFile(path.resolve(plugin.image));
    }).catch(err => console.log(err))
};

getPlugins = async (req, res) => {
    await Plugin.find({}, (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!plugin.length) {
            return res.status(200).json({success: true, error: `No plugin.`})
        }
        return res.status(200).json({success: true, data: plugin})
    }).catch(err => console.log(err))
};

addComment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
    }
    if (!req.body) {
        error.errorHandler(res, 'Trying to add a comment without content.');
    }
    Plugin.findOne({_id: req.params.id}, async (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        const comment = new Comment(req.body);
        plugin.comments.push(comment);
        await plugin.save();
        return res.status(200).json({success: true, data: plugin.comments})
    }).catch(err => console.log(err))
};

addLike = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
    }
    if (!req.body) {
        error.errorHandler(res, 'Trying to add a like without email adress.');
    }
    Plugin.findOne({_id: req.params.id}, async (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        plugin.likes.push(req.body.email);
        await plugin.save();
        return res.status(200).json({success: true, data: plugin.likes})
    }).catch(err => console.log(err))
};

deleteLike = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, error: 'Invalid id.'})
    }
    if (!req.body) {
        error.errorHandler(res, 'Trying to remove a like without email address.');
    }
    Plugin.findOne({_id: req.params.id}, async (err, plugin) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        plugin.likes = plugin.likes.filter(like => like !== req.body.email);
        await plugin.save();
        return res.status(200).json({success: true, data: plugin.likes})
    }).catch(err => console.log(err))
};

getUserPlugins = async (req, res) => {
    await Plugin.find({author: req.params.mail}, (err, plugins) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, data: plugins})
    }).catch(err => console.log(err))
};


module.exports = {
    createPlugin,
    updatePlugin,
    deletePlugin,
    getPlugins,
    getPluginById,
    getPluginImage,
    addComment,
    addLike,
    deleteLike,
    getUserPlugins
};
