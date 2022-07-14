const mongoose = require('mongoose')
const moment = require('moment')

const fields = new mongoose.Schema({
    studentID: { type: String, required: true},
    comment: { type: String, default: ''},
    program: { type: String, required: true},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS')},
    block: { type: String, required: true},
    status: { type: String, required: true, default: 'pending'},
}
)
const model = mongoose.model('hosteldb',fields)

module.exports = model