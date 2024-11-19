import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddEventForm from './components/AddEventForm';
import AddCustomerForm from './components/AddCustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const handleOpenForm = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://godigital-8n82.onrender.com/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerClick = async (id) => {
    try {
      const response = await axios.get(`https://godigital-8n82.onrender.com/customers/${id}`);
      setSelectedCustomer(response.data);
      console.log(response.data)
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="flex flex-col h-screen w-full" style={{ backgroundColor: '#FFFDD0' }}>
      <Navbar />
      <main className="flex-grow overflow-y-auto p-4">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: '#FF7043' }}
        >
          Customer List
        </h2>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <li
                key={customer._id}
                className="py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => handleCustomerClick(customer._id)}
              >
                <span className="font-medium text-gray-700">
                  {`${customer.firstName} ${customer.middleName || ''} ${customer.lastName}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer onOpenForm={handleOpenForm} />
      {activeForm === 'customer' && <AddCustomerForm onClose={handleCloseForm} />}
      {activeForm === 'event' && <AddEventForm onClose={handleCloseForm} />}

      {/* Popup for customer details */}
      {showPopup && selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3
              className="text-lg font-bold mb-4 text-center"
              style={{ color: '#FF7043' }}
            >
              Customer Details
            </h3>
            <div className="text-gray-700">
              <p className="mb-2">
                <strong>Name:</strong> {`${selectedCustomer.firstName} ${selectedCustomer.middleName || ''} ${selectedCustomer.lastName}`}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {selectedCustomer.address}
              </p>
              <p className="mb-2">
                <strong>Mobile:</strong> {selectedCustomer.mobile}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {selectedCustomer.email || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Religion:</strong> {selectedCustomer.religion}
              </p>
              <p className="mb-2">
                <strong>Employment Type:</strong> {selectedCustomer.employmentType}
              </p>
              {selectedCustomer.businessDetails?.name && (
                <p className="mb-2">
                  <strong>Business:</strong> {selectedCustomer.businessDetails.name}
                </p>
              )}
            </div>
            <button
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
