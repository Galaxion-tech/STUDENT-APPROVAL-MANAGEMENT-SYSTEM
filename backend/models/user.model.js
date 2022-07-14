const mongoose = require('mongoose')
const moment = require('moment')

const User = new mongoose.Schema({
    role: { type: String, required: true},
    name: {type: String, required: true},
    studentID: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    department: {type: String, required: true},
    date: {type: String, default: moment().format('YYYY-MM-DD[ ]HH:MM:SS')},
    program: {type: String, required: true},
},
{
    collection: 'user-data'
}
)
const model = mongoose.model('credentials',User)

module.exports = model