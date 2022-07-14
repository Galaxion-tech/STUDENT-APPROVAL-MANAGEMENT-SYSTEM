import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './form.css'

export default function Proposal() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
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
        headers : {'Content-Type': 'application/json'}
      }    
      try { 
        const isUser = await Axios(exist)
        console.log(isUser)
        const config= {
          method : 'POST',
          url : 'http://192.168.51.76:1337/api/forms/proposal',
          data : {
            studentID : window.st_id,
            status: 'pending',
            program : window.program,
            title,
            link,
          },
          headers: {'Content-Type': 'application/json'},
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
      <h1>Project Proposal Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>Title of the Project</p>   
          <input
            value={title}  autoComplete='on'
            onChange={(e) => setTitle(e.target.value)}
            type="text" required
            placeholder="Title" 
            />
            </label>
            <br />
	  	<label>
	    <p>Google Drive Link to Abstract Writeup</p>
          <input
            value={link}  autoComplete='on'
            onChange={(e) => setLink(e.target.value)}
            type="url" required
            placeholder="Insert shareable link (IITH account)" 
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
