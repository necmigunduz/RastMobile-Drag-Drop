// InProgress Model
let mongoose = require('mongoose')
const Schema = mongoose.Schema
// Setup Schema
let inProgressSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inProgressType: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

// Export Model
var InProgress = module.exports = mongoose.model('inProgress', inProgressSchema)

module.exports.get = function (callback, limit) {
    InProgress.find(callback).limit(limit);
}