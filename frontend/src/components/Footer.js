import React from 'react';
import './Footer.css';
//import { Button } from './Button.js';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
           Join the Adventure newsletter to receive our best vacation deals 
        </p>
        <p className='footer-subscription-text'>
           You can unsubscribe at any time. 
        </p>
         <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div> 
      </section> */}
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          {/* <div className='footer-link-items'>
            <h2>About Us </h2>
            <Link to='/Work'>How It Works</Link>
           
          </div> */}
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            {/* <Link to='/'>MVP</Link> */}
            {/* < a href='https://github.com/Deepshikha11004'>Deepshikha</a>
            <a href='https://github.com/goats-9'>Gautam Singh</a>
            <a href='https://github.com/galaxion-tech'>Harsh Goyal</a> */}
            <a href='https://www.iith.ac.in/cse/mvp/'>Gentle Reminder!</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
        
          <div className='footer-link-items'>
            {/* <h2>Social Media</h2> */}
            {/* <Link to='/'>Instagram</Link> */}
            {/* <Link to='/'>Facebook</Link> */}
            {/* <Link to='/'>Twitter</Link>
            <Link to='/'>Email</Link> */}
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              IITH
              {/* <img src="/images/newlogo2.png" className='logo'  /> */}
            </Link>
          </div>
          <small className='website-rights'>Made by:Deepshikha,Gautam,Harsh</small>
          <div className='social-icons'>
            {/* <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link> */}
            <a
              className='social-icon-link instagram'
              href='https://www.instagram.com/iit_hyderabad'
              // target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a>
           
            <a
              className='social-icon-link twitter'
              href='https://twitter.com/IITHyderabad'
              // target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </a>
            {/* <a
              className='social-icon-link twitter'
              href='https://in.linkedin.com/company/department-of-cse-iit-hyderabad'
              // target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-Linkedin' />
            </a> */}
            <a
              className='social-icon-link twitter'
             href='https://in.linkedin.com/company/department-of-cse-iit-hyderabad'
              //target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </a>
            <a
              className='social-icon-link facebook'
             href='https://www.facebook.com/cseiith'
              //target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
