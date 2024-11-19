import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddEventForm from './components/AddEventForm'; 
import AddCustomerForm from './components/AddCustomerForm';  

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const handleOpenForm = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://godigital-8n82.onrender.com/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = async (id) => {
    try {
      const response = await axios.get(`https://godigital-8n82.onrender.com/api/events/${id}`);
      setSelectedEvent(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#FFFDD0' }}>
      <Navbar />
      <main className="flex-grow overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#FF7043' }}>
          Event History
        </h2>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
          <ul className="divide-y divide-gray-200">
            {events.map((event, index) => (
              <li
                key={event._id}
                className="py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => handleEventClick(event._id)}
              >
                <span className="font-medium text-gray-700">
                  <span className="text-xl font-semibold text-orange-600">{index + 1}. </span>
                  {`${event.customerName} - ${event.eventDescription}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer onOpenForm={handleOpenForm} />
      {activeForm === 'customer' && <AddCustomerForm onClose={handleCloseForm} />}
      {activeForm === 'event' && <AddEventForm onClose={handleCloseForm} />}

      {/* Popup for event details */}
      {showPopup && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-center" style={{ color: '#FF7043' }}>
              Event Details
            </h3>
            <div className="text-gray-700">
              <p className="mb-2">
                <strong>Customer Name:</strong> {selectedEvent.customerName}
              </p>
              <p className="mb-2">
                <strong>Event Date:</strong> {new Date(selectedEvent.eventDate).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Venue:</strong> {selectedEvent.eventVenue}
              </p>
              <p className="mb-2">
                <strong>Event Description:</strong> {selectedEvent.eventDescription}
              </p>
              <p className="mb-2">
                <strong>Event Amount:</strong> ₹{selectedEvent.eventAmount}
              </p>
              <p className="mb-2">
                <strong>Advance Amount:</strong> ₹{selectedEvent.advanceAmount || 0}
              </p>
              <p className="mb-2">
                <strong>Remaining Amount:</strong> ₹{selectedEvent.remainingAmount}
              </p>
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

export default EventList;
