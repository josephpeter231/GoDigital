import { useState } from 'react';
import Footer from './components/Footer';
import AddCustomerForm from './components/AddCustomerForm';
import AddEventForm from './components/AddEventForm';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom'; 

const App = () => {
  const [activeForm, setActiveForm] = useState(null);
  const navigate = useNavigate(); // Using navigate hook for redirection

  const handleOpenForm = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);

  // Function to handle redirection
  const handleRedirect = (path) => {
    navigate(path); // Redirects to the passed path
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#FFFDD0' }}>
      <Navbar />
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-orange-700 mb-4"> Registered events</h2>
            <p className="text-gray-600 mb-4">View all the Registered Events.</p>
            <button
              onClick={() => handleRedirect('/registered-events')}
              className="bg-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition-colors duration-200"
            >
              View
            </button>
          </div>

           
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Show Event History </h2>
            <p className="text-gray-600 mb-4">View all History of Events that has been happend .</p>
            <button
              onClick={() => handleRedirect('/all-events-list')} // Update with the correct route for your event list page
              className="bg-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition-colors duration-200"
            >
              View
            </button>
          </div>
        </div>
      </main>
      <Footer onOpenForm={handleOpenForm} />
      {activeForm === 'customer' && <AddCustomerForm onClose={handleCloseForm} />}
      {activeForm === 'event' && <AddEventForm onClose={handleCloseForm} />}
    </div>
  );
};

export default App;
