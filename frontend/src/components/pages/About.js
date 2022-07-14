import React from 'react';
import '../../App.css';
import './About.css';
import Navbar from '../Navbar.js';

export default function About() {

  return (
<>
<Navbar/>
<section class="about-section">
        <div class="inner-container">
            <h1>Housing Approval</h1>
            <p class="text">
                Following Housing approvals are offered.
            </p>
            <div class="skills">
                <span>Guest House</span>
                <span>Married</span>
                <span>Day Scholar</span>
				<span>Hostel</span>
            </div>
        </div>
    </section>
	<section class="about-section2">
        <div class="inner-container">
            <h1>Mess Approval</h1>
            <p class="text">
                Students get an option to choose between Lower Dining Hall (LDH) and Upper Dining Hall (UDH).
            </p>
            <div class="skills">
                <span>LDH</span>
                <span>UDH</span>
           
            </div>
        </div>
    </section>
	<section class="about-section3">
        <div class="inner-container">
            <h1>Project Approval</h1>
            <p class="text">
                Students submit their projects and get approved by their respective faculty.
            </p>
          
        </div>
    </section>
	<section class="about-section4">
        <div class="inner-container">
            <h1>Scholarship Approval</h1>
            <p class="text">
              Students whose parent's annual income are less than 5 lacs are guarenteed scholarship.
            </p>
          
        </div>
    </section>
	<section class="about-section5">
        <div class="inner-container">
            <h1>Leave Approval</h1>
            <p class="text">
                Students can request leave for valid reasons.
            </p>
           
        </div>
    </section>
	<section class="about-section6">
        <div class="inner-container">
            <h1>Course Change Approval</h1>
            <p class="text">
              Students  can change some of their courses.
            </p>
           
        </div>
    </section>
</>
  );
}
