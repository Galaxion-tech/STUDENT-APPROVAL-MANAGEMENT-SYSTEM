import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../App.css';
import './form.css'

export default function Leave() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('')
  const [duration, setDuration] = useState(0)
  useEffect(() => {
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
    window.st_id = session.data.studentID
}

  async function postForm(event){
      event.preventDefault()
      console.log(window.st_id)
      const exist = {
        method : 'POST',
        url : 'http://192.168.51.76:1337/api/usercheck',
        data : {
          studentID : window.st_id,
        },
        headers : {'Content-Type': 'application/json'},
      }    
      try { 
        const isUser = await Axios(exist)
        console.log(isUser)
        const config= {
          method : 'POST',
          url : 'http://192.168.51.76:1337/api/forms/leave',
          data : {
            studentID : window.st_id,
            status : 'pending',
            reason,
            duration
          },
          headers : {'Content-Type': 'application/json'},
        }
        const response = await Axios(config)
        console.log(response)
        alert("Approval recorded successfully")
        navigate('/dashboard')
      } catch(error) {
        alert("Invalid Student ID Entered!")
      }
  }
  return (
    <div className="app">
    <div className='hostel'>
      <h1>Leave Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>Reason</p>   
          <select value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value = "">-Select Option-</option>  
            <option value="medical">Medical Grounds</option>
            <option value="homesick">Homesickness</option>
            <option value="function">Attending Function</option>
          </select>
            </label>
            <br />
	          <label>
            <p>Duration (in days)</p>   
          <input
            value={duration}  required autoComplete='on'
            onChange={(e) => setDuration(e.target.value)}
            type="number" min="1" max="7"
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
