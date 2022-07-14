import React, { useEffect } from 'react';
import Axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavbarApprover.js';
import JSONFormatter from 'json-formatter-js'
import '../../App.css';
import './getreq.css'

export default function GetData() {
  const navigate = useNavigate();
  const [database, setDatabase] = useState('')
  const [mongoID, setMongoID] = useState('')
  const [prevStatus, setPrevStatus] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [comment, setComment] = useState('')
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
    if (session.data.status === "logout" || session.data.role !== "Approver") navigate("/login")
  }
  async function getForm(event){
    event.preventDefault()
    const config= {
      method : 'GET',
      url : 'http://192.168.51.76:1337/api/getform',
      params : {
        db : database,
        status : prevStatus
      },
      headers : {
        'Content-Type' : 'application/json',
      }
    }
    console.log(config.params)
    const response = await Axios(config)
    try {    
      console.log(response)
      document.getElementById("head").innerHTML = ""
      document.getElementById("details").innerHTML = ""
      if (response.data.data.length > 0) {
        const formatter = new JSONFormatter(response.data.data)
        document.getElementById("details").appendChild(formatter.render())
        document.getElementById("status").className = ""
        document.getElementById("update").className = ""
        document.getElementById("head").innerHTML = "Choose New Status"
        document.getElementById("comment").innerHTML = "Enter Comment"
        document.getElementById("resp").className = ""
        document.getElementById("mongoid").innerHTML = "Enter Approval __id"
        document.getElementById("mongoin").className = ""
      } else {
        document.getElementById("head").innerHTML = "No records found"
      }
    } catch(err) {
      console.log(err)
    }
  }

  async function updStatus(event) {
    event.preventDefault()
    const config= {
      method : 'POST',
      url : 'http://192.168.51.76:1337/api/update',
      data : {
        mongoID,
        database,
        newStatus,
        prevStatus,
        comment
      },
      headers : {'Content-Type': 'application/json'},
    }
    const response = await Axios(config)
    console.log(response)
    if (response.statusText === 'OK') {
      alert("Success!")
    } else {
      alert("Error")
    }
  }
  return (
    <div>
      <Navbar />
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
          <label>
            <p>Select Approval Status</p>
            <select value={prevStatus} onChange={(e) => setPrevStatus(e.target.value)} required>
              <option value="">-Select Status-</option>
              <option value="rejected">Not Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
            </select>
          </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
            <p id="details"></p> 
            <br />
            <p id="mongoid"></p>
            <input id = "mongoin" className="invisible" placeholder="__id (copy and paste)" required type="text" autoComplete='on'
            value = {mongoID} onChange={(e) => setMongoID(e.target.value)} />
            <p className="invisible" id='head'></p>
            <select id="status" value={newStatus} required onChange={(e) => setNewStatus(e.target.value)} className="invisible">
              <option value="default">-Select Status-</option>
              <option value="rejected">Not Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
            </select>
            <br />
            <p id="comment"></p>
            <input className="invisible" id="resp"
            placeholder="Comment" required type="text" 
            autoComplete='on'
            value={comment} onChange={(e) => setComment(e.target.value)}
            />
            <button id="update" className="invisible" onClick={updStatus}>Update Status</button>
    </div>
    </div>
  );
}
