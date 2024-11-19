import  { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const AddCustomerForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    taluka: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    mobile: '',
    email: '',
    cast: '',
    subcast: '',
    gotra: '',
    religion: '',
    nationality: '',
    referredBy: '',
    employed: '',
    employmentType: '',
    businessDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Customer Data:', formData);
  
    try {
      const response = await axios.post('https://godigital-8n82.onrender.com/api/customers', formData);
      
      // Handle the response from the server
      console.log('Response from server:', response.data);
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error submitting customer data:', error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-orange-700 mb-4 text-center">Add Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-3 overflow-y-auto max-h-[70vh]">
      
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Middle Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Surname</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Surname"
            />
          </div>

          {/* Address Section */}
          {[
            { label: 'Address', name: 'address' },
            { label: 'Taluka', name: 'taluka' },
            { label: 'City', name: 'city' },
            { label: 'District', name: 'district' },
            { label: 'State', name: 'state' },
            { label: 'Country', name: 'country' },
            { label: 'Pincode', name: 'pincode' },
            { label: 'Mobile', name: 'mobile' },
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

          {/* Additional Details */}
          {[
            { label: 'Cast', name: 'cast' },
            { label: 'Subcast', name: 'subcast' },
            { label: 'Gotra', name: 'gotra' },
            { label: 'Religion', name: 'religion' },
            { label: 'Nationality', name: 'nationality' },
            { label: 'Referred By', name: 'referredBy' },
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

          {/* Employment Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employed</label>
            <select
              name="employed"
              value={formData.employed}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="business">Business</option>
              <option value="self-employed">Self Employed</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          {/* Business Description (Optional) */}
          {formData.employmentType === 'business' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Description
              </label>
              <textarea
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter details (e.g., Business Name, Address, Type, Contact Number)"
              />
            </div>
          )}

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
AddCustomerForm.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose is a required function
};

export default AddCustomerForm;
