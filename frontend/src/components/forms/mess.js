import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './form.css'

export default function Mess() {
  const [mess, setMess] = useState('')
  const navigate = useNavigate()
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
    window.program = session.data.program
}

  async function postForm(event){
      event.preventDefault()
      const exist = {
        method : 'POST',
        url : 'http://192.168.51.76:1337/api/usercheck',
        data : {
          studentID : window.st_id,
        },
        headers : {
          'Content-Type': 'application/json'
        }

      }    
      try { 
        const isUser = await Axios(exist)
        console.log(isUser)
        const config= {
          method : 'POST',
          url : 'http://192.168.51.76:1337/api/forms/mess',
          data : {
            studentID : window.st_id,
            status: 'pending',
            program : window.program,
            mess,
          },
          headers : {'Content-Type': 'application/json'}
        }
        const response = await Axios(config)
        console.log(response)
        alert("Approval recorded successfully!")
        navigate('/dashboard')
      } catch(error) {
        alert("Invalid Student ID Entered!")
      }
  }
  return (
    <div className="app">
    <div className='hostel'>
      <h1>Mess Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>Select Mess</p>
            <div className="dropdown">
              <div className='select'>
          <select value={mess} onChange={(e) => setMess(e.target.value)} required>  
            <option value="">-Select Mess-</option>
            <option value="LDH">LDH</option>
            <option value="UDH">UDH</option>
          </select>
          </div>
          </div>
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>

  );
}
