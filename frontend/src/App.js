import React from 'react';
import './App.css';
import Home from './components/pages/Home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/pages/About.js';
import Login from './components/pages/Login.js'
import Scholarship from './components/forms/scholarship.js'
import CourseRegister from './components/pages/Course_reg.js'
import Hostel from './components/forms/hostel.js'
import Course from './components/forms/course.js'
import DayScholar from './components/forms/day.js'
import Guest from './components/forms/guest.js'
import Mess from './components/forms/mess.js'
import Leave from './components/forms/leave.js'
import MarriedScholar from './components/forms/msh.js';
import Equipment from './components/forms/project_equipment.js'
import Proposal from './components/forms/project_proposal.js'
import GetData from './components/forms/get_request.js'
import Register from './components/pages/Register.js'
import Dashboard from './components/Dashboard.js'
import Logout from './components/pages/Logout.js'
import Delete from './components/pages/Delete.js'
import DashboardAdmin from './components/DashboardAdmin.js'
import ViewData from './components/forms/view.js'
import DeleteCourse from "./components/pages/Course_del.js"
function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/home' exact element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/forms/course' exact element={<Course />} />
          <Route path='/forms/day' exact element={<DayScholar />} />
          <Route path='/view' exact element={<ViewData />} />
          <Route path='/forms/equipment' exact element={<Equipment />} />
          <Route path='/forms/guest' exact element={<Guest />} />
          <Route path='/forms/hostel' exact element={<Hostel />} />
          <Route path='/forms/leave' exact element={<Leave />} />
          <Route path='/forms/mess' exact element={<Mess />} />
          <Route path='/forms/msh' exact element={<MarriedScholar />} />
          <Route path='/forms/proposal' exact element={<Proposal />} />
          <Route path='/forms/scholarship' exact element={<Scholarship />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/addcourse' exact element={<CourseRegister />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
*          <Route path='/getform' exact element={<GetData />} />
          <Route path='/delete' exact element={<Delete />} />
          <Route path='/dashboardadmin' exact element={<DashboardAdmin />} />
          <Route path='/logout' exact element={<Logout />} />
          <Route path='/deletecourse' exact element={<DeleteCourse />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;