// InProgress Controller
let InProgress = require('../Models/inProgressModel')

// Index
exports.index = function(req, res) {
    InProgress.get(function(err, inProgresses){
        if(err){
            res.json({
                status: "error",
                message: err
            })
        }

        res.json({
            status: "success",
            message: "InProgresss retrieved successfully!",
            data: inProgresses
        })
    })
}

// Create
exports.new = function(req, res) {
    let inProgress = new InProgress()
    inProgress.name = req.body.name ? req.body.name : inProgress.name
    inProgress.description = req.body.description
    inProgress.inProgressType = req.body.inProgressType
    inProgress.color = req.body.color

    // Save inProgress
    inProgress.save(function(err){
        if(err)
            res.json(err)

        res.json({
            message: "New inProgress is successfully created!",
            data: inProgress
        })
    })
}

// View
exports.view = function(res, req) {
    InProgress.findById(req.params.inProgress_id, function(err, inProgress){
        if(err)
            res.send(err)

        res.json({
            message: "InProgress details uploading!",
            data: inProgress
        })
    })
}

// Update
exports.update = function(req, res) {
    InProgress.findById(req.params.inProgress_id, function(err, inProgress){
        if(err)
            res.send(err)

        inProgress.name = req.body.name ? req.body.name : inProgress.name
        inProgress.description = req.body.description
        inProgress.inProgressType = req.body.inProgressType
        inProgress.color = req.body.color
        // Save updated inProgress
        inProgress.save(function(err){
            if(err)
                res.json(err)

            res.json({
                message: "InProgress info is updated successfullly!",
                data: inProgress
            })
        })
    })
}

// Delete 
exports.delete = function(req, res) {
    InProgress.remove({
        _id: req.params.inProgress_id
    }, function(err, inProgress){
        if(err)
            res.send(err)

        res.json({
            status: "success",
            message: "InProgress is deleted successfully!"
        })
    })
}