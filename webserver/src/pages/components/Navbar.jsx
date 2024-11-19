
const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center shadow-md" style={{ backgroundColor: '#FFB347' }}>
    
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
      />
    
      <button className="ml-4 bg-white p-2 rounded-lg shadow hover:bg-gray-200">
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
    </nav>
  );
};

export default Navbar;
