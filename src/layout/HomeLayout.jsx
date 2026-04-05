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
    <main className='min-h-screen mt-10 bg-gray-200'>
        <Outlet/>
    </main>
      <Footer></Footer>
    </div>
    </>
  );
};

export default HomeLayout;