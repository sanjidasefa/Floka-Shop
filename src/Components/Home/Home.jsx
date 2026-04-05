import React from 'react';
import ContactUs from './HomeComponent/ContactUs';
import AboutUs from './HomeComponent/AboutUs';
import Hero from './HomeComponent/HEro';

const Home = () => {
  return (
    <>
    <div className='min-h-screen '>
      <Hero></Hero>
        <AboutUs></AboutUs>
      <ContactUs></ContactUs>
    </div>
    </>
  );
};

export default Home;