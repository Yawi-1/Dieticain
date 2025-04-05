import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-12 pt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold">NutriCare</h3>
          <p className="text-gray-400 mt-2">
            Professional nutrition and diet consulting services to help you achieve your health goals.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Services</h4>
          <ul className="mt-2 space-y-2">
            <li><Link to="/services" className="text-gray-400 hover:text-white">Nutrition Consultation</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white">Diet Planning</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white">Weight Management</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white">Sports Nutrition</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <p className="text-gray-400 mt-2">123 Nutrition Street, Ludhiana City, IND 141002</p>
          <p className="text-gray-400">Phone: (+91)123-456-7890</p>
          <p className="text-gray-400">Email: contact@nutricare.com</p>
          <div className="flex space-x-4 my-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className='font-bold text-gray-400 text-xs text-center p-4 '>Created with ❤️ by Yawi </div>
    </footer>
  );
}

export default Footer;
