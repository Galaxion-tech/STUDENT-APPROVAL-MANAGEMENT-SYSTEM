import React, { useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import '../../App.css';
import './form.css'

export default function Course() {
  const navigate = useNavigate()
  const [courseID, setCourseID] = useState('')
  const [repID, setRepID] = useState('')
  const [credits, setCredits] = useState(0)
  useEffect(()=>{
    test()
  }, [])
  async function test() {
    const sess = {
      method : 'GET',
      url : 'http://192.168.51.76:1337/api/Login',
    }
    const session = await Axios(sess)
    console.log(session)
    if (session.data.status === "logout") navigate("/login")
    window.st_id = session.data.studentID
  }

  async function postForm(event){
    event.preventDefault()
    const exist = {
      method : 'POST',
      url : 'http://192.168.51.76:1337/api/usercheck',
      data: {studentID : window.st_id,},
      headers: {'Content-Type': 'application/json'},
    }  
    const check = {
      method : 'POST',
      url : 'http://192.168.51.76:1337/api/coursecheck',
      data : {
        courseID : courseID.toUpperCase(),
        repID : repID.toUpperCase(),
      },
      headers: {'Content-Type': 'application/json'},
    }  
    try { 
      const isUser = await Axios(exist)
      console.log(isUser)
      const isCourse = await Axios(check)
      console.log(isCourse)
      const cid = courseID.toUpperCase()
      const rid = repID.toUpperCase()
      const config= {
        method : 'POST',
        url : 'http://192.168.51.76:1337/api/forms/course',
        data : {
          studentID : window.st_id,
          status : 'pending',
          courseID : cid,
          repID : rid,
          credits
        },
        headers: {'Content-Type': 'application/json'}
      }
      const response = await Axios(config)
      console.log(response)
      alert("Approval recorded successfully!")
      navigate('/dashboard')
    } catch(error) {
      alert("Invalid Student ID or Course IDs Entered!")
    }
  }
  return (
    <div className="app">
    <div className='hostel'>
      <h1>Course Change Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>ID of Failed Course</p>   
          <input
            value={courseID} 
            onChange={(e) => setCourseID(e.target.value)}
            type="text" required autoComplete='on'
            placeholder="ABXXXX" 
            />
            </label>
            <br />
	          <label>
            <p>Replacement Course ID</p>   
          <input
            value={repID} 
            onChange={(e) => setRepID(e.target.value)}
            type="text" required autoComplete='on'
            placeholder="ABXXXX" 
            />
            </label>
            <br />
	          <label>
            <p>Credits</p>   
          <input
            value={credits} 
            onChange={(e) => setCredits(e.target.value)}
            type="number" min="1" max="3" required autoComplete='on'
            placeholder="Duration" 
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
