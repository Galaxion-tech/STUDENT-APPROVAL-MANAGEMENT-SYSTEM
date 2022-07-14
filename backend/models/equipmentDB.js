const mongoose = require('mongoose')
const moment = require('moment')

const fields = new mongoose.Schema({
    studentID: { type: String, required: true},
    comment: { type: String, default: ''},
    program: { type: String, required: true},
    grant: { type: Number, required: true},
    space: { type: Number, required: true},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS')},
    duration: { type: Number, required: true},
    status: { type: String, required: true, default: 'pending'},
}
)
const model = mongoose.model('equipmentDB',fields)

module.exports = model