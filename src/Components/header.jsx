import React, { useEffect, useState } from 'react';
import "./header.css"
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    
    };
  
  }, []); 

  return (
    <div>
      <nav className={`navbar-expand-lg fixed-top${scrolled ? ' bg-transparent' : ' l'}`}>
        {scrolled ? <p>You have scrolled more than 20 pixels.</p> : <p>Keep scrolling...</p>}
      </nav>
    </div>
  );
};

export default Header;
