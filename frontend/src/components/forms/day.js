import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
//import '../../App.css';
import './form.css'

export default function DayScholar() {
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [link, setLink] = useState('')
  useEffect(() => {
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
    window.prg = session.data.program
  }
  async function postForm(event){
    event.preventDefault()
    const exist = {
      method : 'POST',
      url : 'http://192.168.51.76:1337/api/usercheck',
      data : {
        studentID : window.st_id
      },
      headers : {'Content-Type': 'application/json'},
    }    
    try { 
      const isUser = await Axios(exist)
      console.log(isUser)
      const config= {
        method : 'POST',
        url : 'http://192.168.51.76:1337/api/forms/day',
        data : {
          studentID : window.st_id,
          status : "pending",
          reason,
          link,
        },
        headers : {'Content-Type': 'application/json'},
      }
      const response = await Axios(config)
      console.log(response)
      alert("Approval successfully created!")
      navigate('/dashboard')
    } catch(error) {
      alert("Invalid Student ID Entered!")
    }
  }
  return (
    <div className="app">
    <div className="hostel">
      <h1>Day Scholar Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>Reason for Being Day Scholar</p>   
          <select value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value = "">-Select Option-</option>  
            <option value="medical">Medical Grounds</option>
          </select>
            </label>
            <br />
	          <label>
            <p>Proof (Insert Drive Link)</p>   
          <input
            value={link}  autoComplete='on'
            onChange={(e) => setLink(e.target.value)}
            type="url" required
            placeholder="Insert IITH Account Drive Link" 
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
