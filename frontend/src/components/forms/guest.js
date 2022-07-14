import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import './form.css'
import { useNavigate } from 'react-router-dom';

export default function Guest() {
  const navigate = useNavigate();
  const [member, setMember] = useState(0)
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
    const exist = {
      method : 'POST',
      url : 'http://192.168.51.76:1337/api/usercheck',
      data : {
        studentID : window.st_id,
      },
      headers : { 'Content-Type': 'application/json'}
    }    
    try {
      const isUser = await Axios(exist)
      console.log(isUser)   
      const config = {
        method : 'POST',
        url : 'http://192.168.51.76:1337/api/forms/guest',
        data : {
          studentID : window.st_id,
          status : 'pending',
          member,
          duration,
        },
        headers : { 'Content-Type': 'application/json'}
      }
      const response = await Axios(config)
      console.log(response)
      alert("Approval recorded successfully!")
      navigate('/dashboard')
    } catch(err) {
      alert("Invalid Student ID Entered!")
    }
  }
  return (
    <div className="app">
    <div className='hostel'>
      <h1>Guest House Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>No. of Members</p>   
          <input
            value={member}  required
            onChange={(e) => setMember(e.target.value)}
            type="number" min="1" max="4" autoComplete='on' 
            />
            </label>
            <br />   	
	          <label>
            <p>Duration (in weeks)</p>   
          <input
            value={duration}  required
            onChange={(e) => setDuration(e.target.value)}
            type="number" min="1" max="4"  autoComplete='on'
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
