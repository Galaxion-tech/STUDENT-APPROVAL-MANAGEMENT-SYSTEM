import { useEffect} from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css';
import './Login.css'
import Axios from 'axios'
export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => { logoutUser() });
  async function logoutUser() {
    console.log('Initiating logout process');
    await Axios.get('http://192.168.51.76:1337/api/logout').then((resp) => { navigate("/login") })
  }
  return ( <p></p> )
}