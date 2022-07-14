import React from 'react';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import '../../App.css';
import Axios from 'axios'
import "./Login.css"
import "./Delete.css"
export default function Delete() {
  const navigate = useNavigate()
  const [role, setRole] = useState('Default')
  const [studentID, setStudentID] = useState('')

  useEffect(() => {
    test()
  })
  async function test() {

    const sess = {
        method : 'GET',
        url : 'http://192.168.51.76:1337/api/Login',
        withCredentials : true
    }
    const session = await Axios(sess)
    console.log(session)
    if (session.data.status === "logout" || session.data.role !== "Admin") navigate("/login")
  }
  async function deleteUser(event){
    if (role !== "Default") {
      event.preventDefault()
      const response = {
        method:'POST',  
        url: 'http://192.168.51.76:1337/api/Delete',
        // headers:{
        //   'Content-Type':'application/json',
        // },
        data: {
          role,
          studentID,
        }
      }
      const resp = await Axios(response)
      console.log(resp)
      if (resp.data.status === "ok"){
        alert('User successfully deleted!')
        navigate('/dashboardadmin')
      }
    } else {
      alert("Enter a role!")
    }
  }
  return (
    <div className='delete'>
      <img src="/images/avatar.jpg"  className="avatar" alt="" ></img>
      <h1>Delete User</h1>
        <form onSubmit={deleteUser} >
          <label>
        <p>Role</p> 
        <div className='drop'>
          <select value={role} onChange={(e) => {setRole(e.target.value)}}>  
            <option value="Default">-Select Role-</option>
            <option value="Student">Student</option>
            <option value="Approver">Approver</option>
            <option value="Admin">Admin</option>
          </select>
          </div>  
        </label>
          
          <p>Student ID</p>
          <input
            value={studentID} 
            onChange={(e) => setStudentID(e.target.value)}
            type="text"
            placeholder="ID" 
            />
            
            <input type="submit" value="Submit" />
        </form>
    </div>
  );
}
