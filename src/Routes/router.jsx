import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layout/HomeLayout';
import Home from '../Components/Home/Home';

const router = createBrowserRouter ([
  {
    path : '/',
    element : <HomeLayout></HomeLayout>,
    children :[
      {
        index : true , 
        element : <Home></Home>,
      }
    ]
  }
])

export default router;