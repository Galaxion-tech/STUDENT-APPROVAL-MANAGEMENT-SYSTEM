import React from 'react';
import '../App.css';
//import { Button } from './Button.js';
import './HeroSection.css';

function HeroSection() {
return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      {/* <video src='/videos/video-16.mp-5' autoPlay loop muted /> */}
      <img src="/images/iith.jpg" alt='STUDENT APPROVAL MANAGEMENT SYSTEM' />
      <h1>STUDENT'S APPROVAL MANAGEMENT SYSTEM</h1>
      {/* <p>What are you waiting for?</p> */}
      {/* <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
    </div>
  );
}

export default HeroSection;
