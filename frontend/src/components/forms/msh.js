import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './form.css'

export default function MarriedScholar() {
  const navigate = useNavigate()
  const [link, setLink] = useState('')
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
    window.program = session.data.program
  }
  async function Post(event){
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
        url : 'http://192.168.51.76:1337/api/forms/msh',
        data : {
          status: 'pending',
          link,
          program : window.program,
          studentID : window.st_id
        },
        headers : {'Content-Type': 'application/json'}
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
      <h1>Married Student Housing Approval</h1>
        <form onSubmit={Post} >
	          <label>
            <p>Marriage Certificate</p>   
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="url" required autoComplete='on'
            placeholder="Insert IITH Account Drive Link"/>
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
