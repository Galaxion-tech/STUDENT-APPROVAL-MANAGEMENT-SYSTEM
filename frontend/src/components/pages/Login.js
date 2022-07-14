import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import '../../App.css';
import './Login.css'
import Navbar from '../Navbar.js';
import Axios from 'axios'
import CaptchaTest from './Captcha.js';
export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Select User')
  const [studentID, setStudentID] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()
    const response = {
      method:'POST',  
      url :'http://192.168.51.76:1337/api/Login',
      data:{
        role,
        studentID : studentID.toUpperCase(),
        password
      },
    }
    const resp = await Axios(response)
    if (resp.data.status === "success"){
      alert('Login Successful')
      if (role==="Admin")
          navigate('/DashboardAdmin')
      else if (role==="Student")
          navigate('/dashboard')
      else if (role==="Approver")
          navigate('/getForm')
    } else { 
      alert("Invalid Login!!")
    }
    console.log(resp.data)
  }
  return (
    <>
    <Navbar/>
    <section className="deep">
      <div className="container">
        <div className="left"></div>
    <div className='loginbox'>
      <h1 id="HeaderTitle">Login</h1>
        <form onSubmit={loginUser} >
          <label >
            <p>Role</p>
          <select id="RoleButton" value={role} onChange={(e)=> setRole(e.target.value)} required>  
            <option id="Role" value="">Select a Role</option>
            <option value="Student">Student</option>
            <option value="Approver">Approver</option>
            <option value="Admin">Admin</option>
          </select>
            </label>
            <br />
            <br />
          <label>
            <p>UserID</p>   
          <input
            value={studentID} required autoComplete='on'
            onChange={(e) => setStudentID(e.target.value)}
            type="text"
            placeholder="User ID" 
            />
            </label>
            <br />
            <label>
              <p>Password</p>
            <input
            id ="Password"
            value={password} required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password" 
            />
            </label>
            
            <br />
            <button type="submit" value="Submit">LogIn</button> 
        </form>
    </div>
    </div>
    </section>
    </>
  )
}