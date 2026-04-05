import React from 'react';
import Logo from '/Logo.png'

const RotatingCircle = () => {
  const text = "FLOKA • LUXURIOUS • CREATIVE STUDIO • PLAYFULL • UNIQUE "; 

  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full animate-spin-slow" 
        style={{ animation: 'spin-custom 12s linear infinite' }}
      >
        <path
          id="circlePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
          fill="none" 
        />
        <text 
          className="text-[9px] uppercase font-bold tracking-[2px] fill-gray-300"
        >
          <textPath xlinkHref="#circlePath" className='text-gray-50'>
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute rounded-full">  <img src={Logo} alt="Logo" className=' w-30'/></div>
    </div>
  );
};

export default RotatingCircle;