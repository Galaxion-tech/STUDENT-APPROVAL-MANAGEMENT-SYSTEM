import React, { useState,useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import Navbar from './NavbarStudent.js'
import Axios from 'axios'
import "./Dashboard.css"
import './script.js'
// import ScriptTag from 'react-script-tag';const Demo = props => (
//     <ScriptTag type="text/javascript" src="script.js" />
//     )

Axios.defaults.withCredentials = true;
const Dashboard = () => {

    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);
    const navigate = useNavigate()
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
    }
    return (
        <>
        <div className="dashboard">
            <Navbar/>
            {/* <img src="/images/avatar.jpg"  className="avatar" alt="" onLoad={test}></img> */}
            <h1>Dashboard</h1>
            <ul id="myUL">
            <li><span className="caret" >Housing Approval</span>
                <ul className="nested">
                    <li>
                <Link to="/forms/guest" className="sublink" onClick={closeMobileMenu}>
                    Guest Hostel Approval
                </Link>
                </li>
                <Link to="/forms/hostel" className="sublink" onClick={closeMobileMenu}>
                <li> Hostel Room Approval</li>
                </Link>
                
                <Link to="/forms/msh" className="sublink" onClick={closeMobileMenu}>
                <li> Married Student Housing Approval</li>
                </Link>
                <Link to="/forms/day" className="sublink" onClick={closeMobileMenu}>
                <li> Day Scholar Approval</li>
                </Link>
                </ul>
            </li>
            <li><span className="caret">Mess Approval</span>
                    <ul className="nested">
                <Link to="/forms/mess" className="sublink" onClick={closeMobileMenu}>
                    <li>Mess Approval</li>
                </Link>
                    </ul>
            </li>
            <li><span className="caret">Scholarship Approval</span>
                <ul className="nested">
                <Link to="/forms/scholarship" className="sublink" onClick={closeMobileMenu}>
                <li>Scholarship Approval</li>
                </Link>
                </ul>
            </li>
            <li><span className="caret">Leave Approval</span>
                <ul className="nested">
                <Link to="/forms/leave" className="sublink" onClick={closeMobileMenu}>
                <li>Leave Approval</li>
                </Link>
                </ul>
            </li>
            <li><span className="caret">Course Change Approval</span>
                <ul className="nested">
                <Link to="/forms/course" className="sublink" onClick={closeMobileMenu}>
                <li>Course Change Approval</li>
                </Link>
                </ul>
            </li>
            <li><span className="caret">Project Approval</span>
                <ul className="nested">
                <Link to="/forms/proposal" className="sublink" onClick={closeMobileMenu}>
                <li>Approval for research/project proposal</li>
                </Link>
                <Link to="/forms/equipment" className="sublink" onClick={closeMobileMenu}>
                <li>Approval for use of Equipment</li>
                </Link>
            </ul>
          </li>
          <li>
            {/* <ul>
            <Link to="/view" className="sublink" onClick={closeMobileMenu}>
                <li>View Approval Status</li>
                </Link>
            </ul> */}
          </li>
          
        </ul>
{/* 
    <script src="script.js" type="module"></script> */}
    {/* <script src = "script.js" defer></script> */}
    </div>
        </>
    );
}

export default Dashboard;