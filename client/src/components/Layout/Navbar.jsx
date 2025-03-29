import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

  const location = useLocation();

  return (
    <nav className="z-50 bg-white shadow-md sticky top-0 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl shadow px-4 py-2 rounded font-bold text-blue-600">
            NutriCare
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`${location.pathname === link.path ? 'text-blue-600 font-semibold' : 'text-gray-600'}  hover:text-blue-600 transition`}>
                {link.name}
              </Link>
            ))}
            <Link to="/booking" className="bg-blue-600 text-white px-3 py-2 font-semibold text-sm rounded-lg hover:bg-blue-700">
              Book Appointment
            </Link>
          </div>
          
          <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden bg-white  rounded-lg p-4">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="block border m-1 p-2 rounded-lg text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link to="/booking" className="block mt-2 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700" onClick={() => setIsOpen(false)}>
              Book Appointment
            </Link>
          </div>
        )}
      </div> 
    </nav>
  );
}

export default Navbar;