const mongoose = require('mongoose')

const User = new mongoose.Schema({
    courseID: { type: String, required: true, unique: true},
    department: {type: String, required: true},
    program: {type: String, required: true},
    credits: { type: Number, required: true},
},
{
    collection: 'course-data'
}
)
const model = mongoose.model('courseData',User)

module.exports = model