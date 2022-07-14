import React from 'react';
import './Cards.css';
import CardItem from './CardItem.js';

function Cards() {
  return (
    <div className='cards'>
     
      <div className='cards__container'>
        {/* <div className='cards__wrapper'> */}
          {/* <ul className='cards__items'>
            <CardItem
              src='public/images/img-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/About'
            />
            <CardItem
              src='public/images/img-2.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/About'
            />
          </ul> */}
          <section className="approvals">
<h1>APPROVALS WE OFFER</h1>

<div className="row">
    <div className="course-col">
        <h2>Housing Approval</h2>
     
    </div>


    <div className="course-col">
        <h2>Mess Approval</h2>
    
    </div>


    <div className="course-col">
        <h2>Scholarship Approval</h2>
    
    </div>
</div>
  

<div className="row">
    <div className="course-col">
        <h2>Project Approval</h2>

    </div>


    <div className="course-col">
        <h2>Leave Approval</h2>

    </div>


    <div className="course-col">
        <h2>Course change Approval</h2>
       
    </div>
</div>

</section>
<h1>OUR CAMPUS</h1>
          <ul className='cards__items'>
            <CardItem
              src='images/acad.jpg'
               text='Our academics section'
              label='Acad'
              path='/About'
            />
            <CardItem
              src='images/office.jpg'
               text='Our Hostel Office inside Campus'
              label='Office'
              path='/Contact_Us'
            />
            <CardItem
              src='images/mess.jpg'
              text='Our mess '
              label='Mess'
              path='/Login'
            />
          </ul>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Cards;
