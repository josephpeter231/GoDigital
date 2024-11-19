const Footer = ({ onOpenForm }) => {
  return (
    <footer className="bg-gray-100 p-4 flex justify-around items-center shadow-inner">
      {/* Add Customer Button */}
      <button
        onClick={() => onOpenForm('customer')}
        className="flex flex-col items-center text-orange-700 hover:text-orange-900"
      >
       
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-1">
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M20 8h-4M18 6v4" />
        </svg>

        <span className="text-sm">Add Customer</span>
      </button>

      {/* Add Event Button */}
      <button
        onClick={() => onOpenForm('event')}
        className="flex flex-col items-center text-orange-700 hover:text-orange-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 mb-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm">Add Event</span>
      </button>
    </footer>
  );
};

export default Footer;
