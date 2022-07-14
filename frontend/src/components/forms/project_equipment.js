import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../App.css';
import './form.css'

export default function Equipment() {
  const navigate = useNavigate()
  const [grant, setGrant] = useState(0)
  const [space, setSpace] = useState(0)
  const [duration, setDuration] = useState(0)
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
          url : 'http://192.168.51.76:1337/api/forms/equipment',
          data : {
            studentID : window.st_id,
            program : window.program,
            status: 'pending',
            grant,
            space,
            duration
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
      <h1>Project Equipment Approval</h1>
        <form onSubmit={postForm} >
	          <label>
            <p>Grant (in lakhs of Rs.)</p>   
            <input
            value={grant}  required autoComplete='on'
            onChange={(e) => setGrant(e.target.value)}
            type="number" min="5" max="50"
            />
            </label>
            <br />
	          <label>
          <p>Space required (in sq. ft.)</p>   
            <input type="number" min="500" max="2000" step="250" required autoComplete='on'
              value={space} onChange={(e) => setSpace(e.target.value)}
            />
            </label>
            <br />
	          <label>
            <p>Duration of Use (in months)</p>   
          <input
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            type="number" min="3" max="12" required autoComplete='on'
            />
            </label>
            <br />
            <button type="submit" value="Submit">Submit</button> 
        </form>
    </div>
    </div>
  );
}
