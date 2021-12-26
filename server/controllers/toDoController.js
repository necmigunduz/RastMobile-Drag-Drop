// ToDo Controller
let ToDo = require('../Models/toDoModel')

// Index
exports.index = function(req, res) {
    ToDo.get(function(err, toDos){
        if(err){
            res.json({
                status: "error",
                message: err
            })
        }

        res.json({
            status: "success",
            message: "ToDos retrieved successfully!",
            data: toDos
        })
    })
}

// Create
exports.new = function(req, res) {
    let toDo = new ToDo()
    toDo.name = req.body.name ? req.body.name : toDo.name
    toDo.description = req.body.description
    toDo.toDoType = req.body.toDoType
    toDo.color = req.body.color

    // Save toDo
    toDo.save(function(err){
        if(err)
            res.json(err)

        res.json({
            message: "New toDo is successfully created!",
            data: toDo
        })
    })
}

// View
exports.view = function(res, req) {
    ToDo.findById(req.params.toDo_id, function(err, toDo){
        if(err)
            res.send(err)

        res.json({
            message: "ToDo details uploading!",
            data: toDo
        })
    })
}

// Update
exports.update = function(req, res) {
    ToDo.findById(req.params.toDo_id, function(err, toDo){
        if(err)
            res.send(err)

        toDo.name = req.body.name ? req.body.name : toDo.name
        toDo.description = req.body.description
        toDo.toDoType = req.body.toDoType
        toDo.color = req.body.color
        // Save updated backlog
        toDo.save(function(err){
            if(err)
                res.json(err)

            res.json({
                message: "ToDo info is updated successfullly!",
                data: toDo
            })
        })
    })
}

// Delete 
exports.delete = function(req, res) {
    ToDo.remove({
        _id: req.params.toDo_id
    }, function(err, toDo){
        if(err)
            res.send(err)

        res.json({
            status: "success",
            message: "ToDo is deleted successfully!"
        })
    })
}