import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility
  const navigate = useNavigate(); // React Router navigate function

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
     
    if(path === 'logout'){
      localStorage.removeItem('userdetails')
      navigate('/')
    }
    else
    navigate(path);
    closeMenu(); 
  };

  return (
    <nav className="p-4 flex justify-between items-center shadow-md" style={{ backgroundColor: '#FFB347' }}>
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
      />

      <button
        className="ml-4 bg-white p-2 rounded-lg shadow hover:bg-gray-200"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-orange-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="w-64 bg-white absolute top-0 right-0 h-full shadow-lg p-4">
            {/* Close Button */}
            <button
              className="absolute top-4 left-4 text-gray-700 text-3xl"
              onClick={closeMenu}
            >
              &times;
            </button>

            {/* Menu Items */}
            <div className="mt-16">
              <ul className="space-y-4">
                <li className="text-lg font-semibold text-gray-800 hover:text-orange-600">
                  <button onClick={() => handleNavigation('/profile')}>Profile</button>
                </li>
                <li className="text-lg font-semibold text-gray-800 hover:text-orange-600">
                  <button onClick={() => handleNavigation('/about')}>About Us</button>
                </li>
                <li className="text-lg font-semibold text-gray-800 hover:text-orange-600">
                  <button onClick={() => handleNavigation('logout')}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
