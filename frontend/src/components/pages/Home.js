import React from 'react';
import '../../App.css';
import Cards from '../Cards.js';
import HeroSection from '../HeroSection.js';
import Footer from '../Footer.js';
import Navbar from '../Navbar.js';
function Home() {
  return (
    <>
    <Navbar/>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}
export default Home;