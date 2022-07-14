const mongoose = require('mongoose')
const moment = require('moment')

const fields = new mongoose.Schema({
    studentID: { type: String, required: true},
    courseID: { type: String, required: true},
    repID: { type: String, required: true},
    credits: { type: Number, required: true},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS'), required: true},
}
)
const model = mongoose.model('courseDB',fields)

module.exports = model