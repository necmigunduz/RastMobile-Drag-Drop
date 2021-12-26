// ToDo Model
let mongoose = require('mongoose')
const Schema = mongoose.Schema
// Setup Schema
let toDoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    toDoType: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

// Export Model
var ToDo = module.exports = mongoose.model('toDo', toDoSchema)

module.exports.get = function (callback, limit) {
    ToDo.find(callback).limit(limit);
}