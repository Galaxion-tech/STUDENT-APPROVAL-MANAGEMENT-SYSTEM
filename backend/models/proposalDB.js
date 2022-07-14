const moment = require('moment')
const mongoose = require('mongoose')

const fields = new mongoose.Schema({
    studentID: { type: String, required: true},
    comment: { type: String, default: ''},
    program: { type: String, required: true},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS')},
    title: { type: String, required: true},
    link: { type: String, required: true},
    status: { type: String, required: true, default: 'pending'},
}
)
const model = mongoose.model('proposalDB',fields)

module.exports = model