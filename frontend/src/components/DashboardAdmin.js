import React, {useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import Navbar from './NavbarAdmin.js'
import Axios from 'axios'
import "./Dashboard.css"

function DashboardAdmin() {
    const navigate = useNavigate();
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
            <img src="/images/avatar.jpg"  className="avatar" alt="" ></img>
            <h1>Dashboard Admin</h1>
            <div className="card">
                <Link to="/register" className="dashboard-link">Register User</Link> <br />
                <Link to="/delete" className="dashboard-link">Delete User</Link> <br />
                <Link to="/addcourse" className="dashboard-link">Add course</Link> <br />
                <Link to="/deletecourse" className="dashboard-link">Delete course</Link> <br />

            </div>
            
    </div>
        </>
    );
}

export default DashboardAdmin;