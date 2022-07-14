import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import '../../App.css';
import './form.css'
import { useNavigate } from 'react-router-dom';

export default function Scholarship() {
  const navigate = useNavigate()
  const [bank, setBank] = useState('')
  const [dob, setDob] = useState('')
  const [uid, setUid] = useState('')
  const [pan, setPan] = useState('')
  const [itr, setItr] = useState('')
  useEffect(() => {
    test()
  },[])
  async function test() {
    const sess = {
      method : 'GET',
      url : 'http://192.168.51.76:1337/api/Login',
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
      headers : {'Content-Type': 'application/json'}
    }    
    try { 
      const isUser = await Axios(exist)
      console.log(isUser)
      const config= {
        method : 'POST',
        url : 'http://192.168.51.76:1337/api/forms/scholarship',
        data : {
          studentID : window.st_id,
          program : window.program,
          status: 'pending',
          dob : dob.toString(),
          bank,
          uid,
          pan,
          itr,
        },
        headers : {'Content-Type': 'application/json'},
      }
      console.log(config)
      const response = await Axios(config)
      console.log(response)
      alert("Approval recorded successfully")
      navigate('/dashboard')
    } catch(error) {
      console.log(error)
      alert("Invalid Student ID Entered!")
    }
  }
  return (
    <div className="app">
    <div className='hostel'>
      <h1>Scholarship Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>Date of Birth</p>   
          <input
            value={dob} 
            onChange={(e) => setDob(e.target.value)}
            type="date" required autoComplete='on'
            placeholder="MM-DD-YYYY" 
            min="1995-01-01" max="2005-12-31"
            />
            </label>
            <br />
	          <label>
            <p>Aadhar Card Number</p>   
          <input
            value={uid}  autoComplete='on'
            onChange={(e) => setUid(e.target.value)}
            type="text" required
            placeholder="Student Aadhar Card Number" 
            />
            </label>
            <br />
	          <label>
            <p>PAN Card Number</p>   
          <input
            value={pan}  autoComplete='on'
            onChange={(e) => setPan(e.target.value)}
            type="text" required
            placeholder="Student PAN Card Number" 
            />
            </label>
            <br />
	          <label>
            <p>Parent Bank Account Number</p>   
          <input
            value={bank}  autoComplete='on'
            onChange={(e) => setBank(e.target.value)}
            type="text" required
            placeholder="Parent's Bank Account Number" 
            />
            </label>
            <br />
	          <label>
            <p>Parent ITR Number</p>   
          <input
            value={itr}  autoComplete='on'
            onChange={(e) => setItr(e.target.value)}
            type="text" required
            placeholder="Parent's most recent ITR Number" 
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
