import React from 'react';
import {useState, useNavigate} from 'react';
import '../../App.css';
import Axios from 'axios'
import "./Login.css"
import "./Register.css"
export default function CourseRegister() {
  const [courseID, setCourseID] = useState('')
  const [credits, setCredits] = useState(0)
  const navigate = useNavigate()
  async function register(event){
    event.preventDefault()
    if (courseID.charAt(2) < '5') window.program="BTECH"
    else if (courseID.charAt(2) < '7') window.program="MTECH"
    else window.program="RESCH"
    const response = {
      method:'POST',  
      url: 'http://192.168.51.76:1337/api/addcourse',
      data: {
        department : courseID.slice(0,2).toUpperCase(),
        courseID : courseID.toUpperCase(),
        program : window.program,
        credits
      }
    }

    const resp = await Axios(response)
    console.log(resp)
    if (resp.data.status === "ok"){
      alert('Course successfully added!')
      navigate('/dashboardadmin')
    }
  }
  return (
    <div className="Register">
      <h1>Add Course</h1>
        <form onSubmit={register} >
          <p>Course ID</p>
          <input
            value={courseID}  required
            onChange={(e) => setCourseID(e.target.value)}
            type="text"
            placeholder="Course ID" 
            />
            <br />
            <p>Number of Credits</p>
            <input
            value={credits}  required
            onChange={(e) => setCredits(e.target.value)}
            type="number" min="1" max="3"
            />
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
  );
}
