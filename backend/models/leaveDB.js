const moment = require('moment')
const mongoose = require('mongoose')

const fields = new mongoose.Schema({
    studentID: { type: String, required: true},
    comment: { type: String, default: ''},
    reason: { type: String, required: true},
    duration: { type: Number, required: true},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS')},
    status: { type: String, required: true, default: 'pending'},
}
)
const model = mongoose.model('leaveDB',fields)

module.exports = model