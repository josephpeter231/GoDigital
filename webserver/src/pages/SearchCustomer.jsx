import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CustomerDetails = () => {
  const { id } = useParams(); 
  const [customer, setCustomer] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchCustomer = async () => {
      try {
        const response = await fetch(
          `https://godigital-8n82.onrender.com/customers/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customer details");
        }
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <p>Loading customer details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!customer) {
    return <p>No customer details found.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p><strong>First Name:</strong> {customer.firstName}</p>
          <p><strong>Middle Name:</strong> {customer.middleName || "N/A"}</p>
          <p><strong>Last Name:</strong> {customer.lastName}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>City:</strong> {customer.city}</p>
          <p><strong>District:</strong> {customer.district}</p>
          <p><strong>State:</strong> {customer.state}</p>
          <p><strong>Country:</strong> {customer.country}</p>
          <p><strong>Pincode:</strong> {customer.pincode}</p>
          <p><strong>Mobile:</strong> {customer.mobile}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Cast:</strong> {customer.cast}</p>
          <p><strong>Religion:</strong> {customer.religion}</p>
          <p><strong>Nationality:</strong> {customer.nationality}</p>
          <p><strong>Employed:</strong> {customer.employed ? "Yes" : "No"}</p>
          <p>
            <strong>Employment Type:</strong> {customer.employmentType}
          </p>
          {customer.businessDetails && (
            <div>
              <h2 className="font-bold mt-4">Business Details:</h2>
              <p><strong>Business Name:</strong> {customer.businessDetails.name || "N/A"}</p>
              <p><strong>Business Address:</strong> {customer.businessDetails.address || "N/A"}</p>
              <p><strong>Business Type:</strong> {customer.businessDetails.type || "N/A"}</p>
              <p><strong>Contact Number:</strong> {customer.businessDetails.contactNumber || "N/A"}</p>
            </div>
          )}
          <p><strong>Date of Birth:</strong> {customer.dateOfBirth ? new Date(customer.dateOfBirth).toLocaleDateString() : "N/A"}</p>
          {customer.profileImageUrl && (
            <div className="mt-4">
              <img
                src={customer.profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
