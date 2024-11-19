import { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setErrorMessage("Please complete the CAPTCHA.");
      return;
    }

    const payload = { ...formData, captcha: captchaValue };

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("https://godigital-8n82.onrender.com/login", payload, {
        // const response = await axios.post("http://localhost:5000/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        localStorage.setItem('userdetails',JSON.stringify(response.data.user));
        // console.log(JSON.parse(localStorage.getItem('userdetails')));
        navigate('/entry');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFDD0]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <ReCAPTCHA
              sitekey="6LfhT4MqAAAAAMTbx4Gohpss0AUD5vCyUBBlb1E0" // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange}
              className="mx-auto w-full max-w-xs" // Add this for responsiveness
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-orange-700 hover:bg-orange-800"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
          {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
