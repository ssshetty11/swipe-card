import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* <img 
              src= "swipe-invoice-manager/public/image.png"
              alt="Swipe" 
              className="h-8 w-auto"
            /> */}
            <span className="ml-2 text-xl font-semibold text-swipe-dark hidden sm:block">
              Simple Billing & Payments App
            </span>
            <span className="ml-2 text-xl font-semibold text-swipe-dark sm:hidden">
              Swipe
            </span>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Add mobile menu items if needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;