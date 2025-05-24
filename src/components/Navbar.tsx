
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import Cart from './Cart';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <span className="text-futuristic-neon">Zero</span>
            <span>Waste</span>
            <span className="text-futuristic-neon">X</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/#process" className="text-white hover:text-futuristic-neon transition-colors">
              Process
            </Link>
            <Link to="/#demo" className="text-white hover:text-futuristic-neon transition-colors">
              Demo
            </Link>
            <Link to="/#transformation" className="text-white hover:text-futuristic-neon transition-colors">
              Transformation
            </Link>
            <CartIcon onClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </nav>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
