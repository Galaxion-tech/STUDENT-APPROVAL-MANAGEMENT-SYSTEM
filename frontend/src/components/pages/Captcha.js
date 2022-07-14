import React, { Component } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
//import "bootstrap/dist/css/bootstrap.min.css";

//import "./Login.css"
import "./Captcha.css"
class CaptchaTest extends Component {

   componentDidMount () {
      loadCaptchaEnginge(6); 
   };

   doSubmit = () => {
       let user_captcha = document.getElementById('user_captcha_input').value;

       if (validateCaptcha(user_captcha)===true) {
           alert('Captcha Matched');
           loadCaptchaEnginge(6); 
           document.getElementById('user_captcha_input').value = "";
       }

       else {
           alert('Captcha Does Not Match');
           document.getElementById('user_captcha_input').value = "";
       }
   };

   render() {
        

       return (
           <div id="captcha">
               <div className="form-control">

                   <div className='loadImage'>
                       <LoadCanvasTemplate />
                   </div>

                   <div >
                       <div><input placeholder="Enter Captcha Value" id="captcha-input" name="user_captcha_input" type="text"></input></div>
                   </div>

                   <div >
                       <div><button className='captcha-button' onClick={() => this.doSubmit()}>Submit Captcha</button></div>
                   </div>
                     
               </div>

           </div>
       );
   };
}

export default CaptchaTest;

