import React, { useState, useEffect } from 'react';
import { Button } from './Button.js';
import { Link } from 'react-router-dom';
// import Contact_Us from "./pages/Contact_Us.js"
import './Navbar.css';
//import myImage from '../../public/images/login.jpg';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            {/* <i className='fab ' /> */}
            <img src="/images/newlogo2.png" className='logo'  />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/Dashboard' className='nav-links' onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/view'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                VIEW APPROVAL STATUS
              </Link>
              </li>
            <li className='nav-item'>
              <Link
                to='/logout'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                LOGOUT
              </Link>
              </li>
              
           </ul>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
