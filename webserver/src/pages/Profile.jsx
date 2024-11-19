import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';
import AddEventForm from './components/AddEventForm'; 
import AddCustomerForm from './components/AddCustomerForm';  
const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const handleOpenForm = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);


  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));
    setUser(userDetails);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full  bg-gray-50">
      {/* Navbar (Fixed at the top) */}
      <Navbar />

      {/* Main Content - Scrollable */}
      <main className="flex-grow overflow-y-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="flex justify-center mb-8">
            <img
              src={user.profilePicture || '/path/to/default-profile-pic.jpg'} // Fallback to a default image
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-orange-500"
            />
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">{user.fullName}</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">{user.address}</p>
              <p className="text-gray-600">{user.city}, {user.state}, {user.country} - {user.pincode}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Mobile</h3>
              <p className="text-gray-600">{user.mobileNumber}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Contact</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                localStorage.removeItem('userdetails');
                navigate('/')
              }}
              className="w-full mb-8 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Logout
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

export default UserProfile;
