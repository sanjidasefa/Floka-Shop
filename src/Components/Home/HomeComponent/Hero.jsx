import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source 
          src="https://floka.casethemes.net/wp-content/uploads/2025/06/home-1-video.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/30"></div>
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Creative Digital Studio
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          We build digital products that help your business grow and stand out.
        </p>
        <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all uppercase text-sm tracking-widest">
          View Projects
        </button>
      </div>
    </section>
  );
};

export default Hero