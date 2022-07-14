const mongoose = require('mongoose')
const moment = require('moment')

const fields = new mongoose.Schema({
    studentID: { type: String, required: true},
    comment: { type: String, default: ''},
    member: { type: Number, required: true},
    duration: { type: Number, required: true},
    status: { type: String, required: true, default: 'pending'},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS')},
}
)
const model = mongoose.model('guestDB',fields)

module.exports = model