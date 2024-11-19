import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const AddEventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    taluka: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    mobile: '',
    email: '',
    eventDate: '',
    eventVenue: '',
    eventDescription: '',
    eventAmount: '',
    advanceAmount: '',
    remainingAmount: '',
    eventHoldersName: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data Submitted:', formData);
  
    try {
      
      const response = await axios.post('https://godigital-8n82.onrender.com/api/events', formData);
      console.log('Response from server:', response.data);
      onClose(); 
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center">Add Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3 overflow-y-auto max-h-[70vh]">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Other Form Fields */}
          {[
            { name: 'address', label: 'Address' },
            { name: 'taluka', label: 'Taluka' },
            { name: 'city', label: 'City' },
            { name: 'district', label: 'District' },
            { name: 'state', label: 'State' },
            { name: 'country', label: 'Country' },
            { name: 'pincode', label: 'Pincode' },
            { name: 'mobile', label: 'Mobile' },
            { name: 'email', label: 'Email (optional)' },
            { name: 'eventVenue', label: 'Event Venue' },
            { name: 'eventDescription', label: 'Event Description' },
            { name: 'eventAmount', label: 'Amount of the Event' },
            { name: 'advanceAmount', label: 'Advance Amount (if paid)' },
            { name: 'remainingAmount', label: 'Remaining Amount' },
            { name: 'eventHoldersName', label: 'Event Holders Name' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-orange-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
AddEventForm.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose is a required function
};



export default AddEventForm;
