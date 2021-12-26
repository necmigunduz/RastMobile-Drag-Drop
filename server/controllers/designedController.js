// Designed Controller
let Designed = require('../Models/designedModel')

// Index
exports.index = function(req, res) {
    Designed.get(function(err, designeds){
        if(err){
            res.json({
                status: "error",
                message: err
            })
        }

        res.json({
            status: "success",
            message: "Designeds retrieved successfully!",
            data: designeds
        })
    })
}

// Create
exports.new = function(req, res) {
    let designed = new Designed()
    designed.name = req.body.name ? req.body.name : designed.name
    designed.description = req.body.description
    designed.designedType = req.body.designedType
    designed.color = req.body.color

    // Save designed
    designed.save(function(err){
        if(err)
            res.json(err)

        res.json({
            message: "New designed is successfully created!",
            data: designed
        })
    })
}

// View
exports.view = function(res, req) {
    Designed.findById(req.params.designed_id, function(err, designed){
        if(err)
            res.send(err)

        res.json({
            message: "Designed details uploading!",
            data: designed
        })
    })
}

// Update
exports.update = function(req, res) {
    Designed.findById(req.params.designed_id, function(err, designed){
        if(err)
            res.send(err)

        designed.name = req.body.name ? req.body.name : designed.name
        designed.description = req.body.description
        designed.designedType = req.body.designedType
        designed.color = req.body.color
        // Save updated designed
        designed.save(function(err){
            if(err)
                res.json(err)

            res.json({
                message: "Designed info is updated successfullly!",
                data: designed
            })
        })
    })
}

// Delete 
exports.delete = function(req, res) {
    Designed.remove({
        _id: req.params.designed_id
    }, function(err, designed){
        if(err)
            res.send(err)

        res.json({
            status: "success",
            message: "Designed is deleted successfully!"
        })
    })
}