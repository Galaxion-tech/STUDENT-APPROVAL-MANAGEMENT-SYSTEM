import React from 'react';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import '../../App.css';
import Axios from 'axios'
import "./Login.css"
import "./Register.css"
export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [studentID, setStudentID] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(()=>{
    test()
  }, [])
  
  async function test() {
    const sess = {
        method : 'GET',
        url : 'http://192.168.51.76:1337/api/Login',
        withCredentials : true
    }
    const session = await Axios(sess)
    console.log(session)
    if (session.data.status === "logout") navigate("/login")
    console.log(session.data.role)
    if (session.data.role !== "Admin") navigate("/")
  }

  async function registerUser(event){
    if (password===confirmPassword){
    event.preventDefault()
    const response = {
      method:'POST',  
      url: 'http://192.168.51.76:1337/api/Register',
      // headers:{
      //   'Content-Type':'application/json',
      // },
      data: {
        role,
        name : name.toUpperCase(),
        studentID : studentID.toUpperCase(),
        password
      }
    }

    const resp = await Axios(response)
    console.log(resp)
    if (resp.data.status === "ok"){
      alert('User successfully registered!')
      navigate('/dashboardadmin')
    }
  }
else {
  alert('Password Do not Match')
}
}
  return (
    <div className='Register'>
      <h1 id="HeaderTitle">Register</h1>
        <form onSubmit={registerUser} >
          <label>
        <p>Role</p>   
          <select id="RoleButtonRegister" value={role} onChange={(e) => {setRole(e.target.value)}} required>  
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Approver">Approver</option>
            <option value="Admin">Admin</option>
          </select>
        </label >
          <p id="NameRegister">Name</p>
          <input
            value={name} required autoComplete='on'
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name" 
            />
            <br />
          <p>Student ID</p>
          <input
          
            value={studentID}  required autoComplete='on'
            onChange={(e) => setStudentID(e.target.value)}
            type="text"
            placeholder="ID" 
            />
            <br />
            <p>Password</p>
            <input
            id="Passwordregister"
            value={password}  required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password" 
            />
            <br />
            <p>Confirm Password</p>
            <input
            id="Passwordregister"
            value={confirmPassword}  required
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password" 
            />
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
  );
}