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
      <ScrollProgress />
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Home />
      </div>
    </>
  );
}

export default App;
