import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import JSONFormatter from 'json-formatter-js'
import '../../App.css';
import './getreq.css'
import { useNavigate } from 'react-router-dom';

export default function ViewData() {
  const navigate = useNavigate()
  const [database, setDatabase] = useState('')
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
    if (session.data.role !== "Student") navigate(-1)
    window.st_id = session.data.studentID
  }
  async function getForm(event) {
    event.preventDefault()
    const config= {
      method : 'GET',
      url : 'http://192.168.51.76:1337/api/viewform',
      params : {
        db : database,
        id : window.st_id,
      },
      headers : {
        'Content-Type' : 'application/json',
      }
    }
    console.log(config.params)
    const response = await Axios(config)
    try {    
      console.log(response)
      let arr = response.data.data
      document.getElementById("head").className = ""
      document.getElementById("details").innerHTML = ""
      if (arr.length > 0) {
        document.getElementById("head").innerHTML = ""
        const formatter = new JSONFormatter(arr)
        document.getElementById("details").appendChild(formatter.render())
      } else {
        document.getElementById("head").innerHTML = "No records found"
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='login' id='append'>
      <h1>Get Approval Requests</h1>
        <form onSubmit={getForm} >
          <label>
            <p>Select Approval Category</p> 
            <select id="cat" value={database} onChange={(e) => setDatabase(e.target.value)} required>
              <option value="">-Select Category-</option>
              <option value="course">Course Change</option>
              <option value="dayscholar">Day Scholar</option>
              <option value="guest">Guest House</option>
              <option value="hostel">Hostel</option>
              <option value="leave">Leave</option>
              <option value="mess">Mess</option>
              <option value="msh">Married Student Housing</option>
              <option value="equipment">Project Equipment</option>
              <option value="proposal">Project Proposal</option>
              <option value="scholarship">Scholarship</option>
            </select>
            <br/>
          </label>
            <button type="submit" value="Submit">Submit</button> 
        </form>
            <p className="invisible" id='head'></p>
            <br />
            <p id="details"></p> 
    </div>
  )
}