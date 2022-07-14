const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const courseData = require('./models/course.model')
const HostelDB = require('./models/hostelDB')
const DayDB = require('./models/dayDB')
const GuestDB = require('./models/guestDB')
const MshDB = require('./models/mshDB')
const LeaveDB = require('./models/leaveDB')
const CourseDB = require('./models/courseDB')
const EquipmentDB = require('./models/equipmentDB')
const ScholarshipDB = require('./models/scholarshipDB')
const ProposalDB = require('./models/proposalDB')
const MessDB = require('./models/messDB')
const bcrypt = require('bcryptjs')
const db = require("./config/keys").mongoURI;
const keys=require('./config/keys')
const session=require('express-session')
const bodyParser = require('body-parser')

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.51.76:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}))
app.use(express.json())

app.use(
    session({
      name: "GDH-session",
      secret: keys.secretOrPrivateKey, // should use as secret environment variable
      resave: true,
      cookie : {maxAge: 60 * 60 * 1000, sameSite : "none"},
      saveUninitialized:true,
    //   httpOnly: true
    })
);

app.post('/api/Register',async (req,res)=>{
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password,10)
        var ID= req.body.studentID
        const user = await User.create({
            role: req.body.role,
            name: req.body.name,
            studentID: ID,
            password: newPassword,
            email: ID.toLowerCase()+"@iith.ac.in",
            department: ID.slice(0,2),
            program: ID.slice(4,9),
        })
        res.json({status: 'ok'})
    }
    catch (err) {
        res.json({status: 'error', error : err})
    }
})

app.post('/api/addcourse',async (req,res)=>{
    console.log(req.body)
    try {
        const course = await courseData.create(req.body)
        res.json({status: 'ok'})
    }
    catch (err) {
        res.json({status: 'error', error : err})
    }
})

app.post('/api/deletecourse',async (req,res)=>{
    console.log(req.body)
    try {
        const course = await courseData.delete(req.body)
        res.json({status: 'ok'})
    }
    catch (err) {
        res.json({status: 'error', error : err})
    }
})

app.post('/api/Delete',async (req,res)=>{
    console.log(req.body)
    try {
        const user = await User.deleteOne({
            role: req.body.role,
            studentID: req.body.studentID,
        })
        res.json({status: 'ok'})
    }
    catch (err) {
        res.json({status: 'error', error : err})
    }
})
app.post('/api/Login',
    bodyParser.urlencoded({extended:true}),
    async (req,res)=>{ 
        const user = await User.findOne({
            role: req.body.role,
            studentID: req.body.studentID,
        })
        console.log(user)
        if (user === null) return res.json({status: 'error',error:'Invalid error',data: user})
        const isValidPassword = bcrypt.compare(req.body.password,user.password);
        if (isValidPassword) {
            req.session.studentID = user.studentID
            req.session.program = user.program
            req.session.role = user.role
            return res.json({status: 'success', studentID: user.studentID, role: user.role, program: user.program})
        } else return res.json({status : 'failed'})
    }
)

app.get('/api/Login', async (req,res) => {
    console.log(req.session)
    console.log(req.session.studentID)
    if (req.session.studentID !== undefined) {
        res.json({status : 'through', studentID: req.session.studentID, program: req.session.program, role: req.session.role})
    } else {
        res.json({status: "logout"})
    }
})

app.get('/api/logout', (req, res) => {
    // req.session.loggedIn = undefined;
    req.session.destroy(err => {
    if (err) return res.json({status : 'error', err})
    else return res.json({status : 'success'})
    })
})

app.post('/api/usercheck',async (req,res) => { 
    console.log(req.body)
    const user = await User.findOne({
        studentID: req.body.studentID,
    })
    if (!user) res.status(404).json({status: 'error',error:'Student not found'})
    else res.status(200).json({status: 'success'})
})

app.post('/api/coursecheck',async (req,res) => {
    console.log(req.body) 
    const course = await courseData.findOne({
        courseID: req.body.courseID,
    })
    const rep = await courseData.findOne({
        courseID: req.body.repID,
    })
    if (!course || !rep) res.status(404).json({status: 'error', error:'Course not found'})
    else res.status(200).json({status: 'success'})
})

//for form data processing
app.post('/api/forms/hostel',async (req,res)=>{
    var approval = new HostelDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/scholarship' ,async (req,res) => {
    var approval = new ScholarshipDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : approval
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/day',async (req,res)=>{
    var approval = new DayDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/guest',async (req,res)=>{
    var approval = new GuestDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/msh',async (req,res)=>{
    var approval = new MshDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/course',async (req,res)=>{
    var approval = new CourseDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/leave',async (req,res)=>{
    var approval = new LeaveDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/mess',async (req,res)=>{
    var approval = new MessDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/equipment',async (req,res)=>{
    var approval = new EquipmentDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.post('/api/forms/proposal',async (req,res)=>{
    var approval = new ProposalDB(req.body)
    try{
        await approval.save()
        res.status(201).json({
            status: 'Success',
            data : {
                approval
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.get('/api/getform', async (req,res) => {
    var DB
    switch(req.query.db) {
      case "hostel":
        DB=HostelDB
        break
      case "course":
        DB=CourseDB
        break
      case "equipment":
        DB=EquipmentDB
        break
      case "mess":
        DB=MessDB
        break
      case "proposal":
        DB=ProposalDB
        break
      case "leave":
        DB=LeaveDB
        break
      case "msh":
        DB=MshDB
        break
      case "scholarship":
        DB=ScholarshipDB
        break
      case "guest":
        DB=GuestDB
        break
      case "dayscholar":
        DB=DayDB
        break
    }
    const result = await DB.find({status : req.query.status})
    try{
        res.status(200).json({
            status : 'Success',
            data : result,
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.get('/api/viewform', async (req,res) => {
    var DB
    switch(req.query.db) {
      case "hostel":
        DB=HostelDB
        break
      case "course":
        DB=CourseDB
        break
      case "equipment":
        DB=EquipmentDB
        break
      case "mess":
        DB=MessDB
        break
      case "proposal":
        DB=ProposalDB
        break
      case "leave":
        DB=LeaveDB
        break
      case "msh":
        DB=MshDB
        break
      case "scholarship":
        DB=ScholarshipDB
        break
      case "guest":
        DB=GuestDB
        break
      case "dayscholar":
        DB=DayDB
        break
    }
    const result = await DB.find({studentID : req.query.id})
    try{
        res.status(200).json({
            status : 'Success',
            data : result,
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})
app.post('/api/update', async (req,res) => {
    var DB
    switch(req.body.database) {
      case "hostel":
        DB=HostelDB
        break
      case "course":
        DB=CourseDB
        break
      case "equipment":
        DB=EquipmentDB
        break
      case "mess":
        DB=MessDB
        break
      case "proposal":
        DB=ProposalDB
        break
      case "leave":
        DB=LeaveDB
        break
      case "msh":
        DB=MshDB
        break
      case "scholarship":
        DB=ScholarshipDB
        break
      case "guest":
        DB=GuestDB
        break
      case "dayscholar":
        DB=DayDB
        break
    }
    try{
        await DB.findByIdAndUpdate(req.body.mongoID, { $set: {'status' : req.body.newStatus, 'comment' : req.body.comment}})
        const result = await DB.findById(req.body.mongoID)
        res.status(200).json({
            data : result
        })
    }catch(err){
        res.status(500).json({
            message : err
        })
    }
})


const port = process.env.PORT || 1337; // process.env.port is Heroku's port if you choose to deploy the app thereapp.listen(port, () => console.log(`Server up and running on port ${port} !`));
app.listen(port,() => {
console.log(`Server up and running on port ${port}!`)
})