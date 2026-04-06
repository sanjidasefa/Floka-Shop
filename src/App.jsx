import React, { useState } from 'react';
import Home from './pages/Home';
import Preloader from './components/ui/Preloader';
import ScrollProgress from './components/ui/ScrollProgress';
import { useLenis } from './hooks/useLenis';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="fixed inset-0 -z-[100] h-screen w-full pointer-events-none bg-[#0a0a0c]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,_rgba(108,99,255,0.08)_0%,_rgba(10,10,12,0)_50%)]"></div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.05)_0%,_rgba(10,10,12,0)_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <ScrollProgress />
      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Home />
      </div>
    </>
  );
}

export default App;