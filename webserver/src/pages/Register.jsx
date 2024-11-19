import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import for navigation

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "godigital");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dl3ztdpxc/image/upload",
        formData
      );
      setProfilePicture(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const payload = {
      ...formData,
      profilePicture,
    };

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://godigital-8n82.onrender.com/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Registration successful!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFDD0]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              className="block w-full text-gray-700 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile"
                className="mt-4 h-24 w-24 mx-auto rounded-full object-cover shadow-lg"
              />
            )}
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Country and Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg ${
              loading ? "bg-gray-400" : "bg-orange-700 hover:bg-orange-800"
            }`}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>

          {/* Error and Success Messages */}
          {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
          {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}

          {/* Login Option */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-orange-700 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
