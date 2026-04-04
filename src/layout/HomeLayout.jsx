import React from 'react';
import Header from '../Components/Shared/Header';
import Footer from '../Components/Shared/Footer';
import { Outlet } from 'react-router';
import CustomCursor from '../Components/Shared/CustomCursor';

const HomeLayout = () => {
  return (
    <>
    <div className='relative'>
      <CustomCursor></CustomCursor>
      <Header></Header>
    <div className='min-h-screen'>
        <Outlet/>
    </div>
      <Footer></Footer>
    </div>
    </>
  );
};

export default HomeLayout;