import  { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
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
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        // Redirect or set authentication state
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <ReCAPTCHA
            sitekey='6Lf4ToMqAAAAACv0twXQ-s-Ti-3O35R4wjkpRbYr' // Replace with your reCAPTCHA site key
            onChange={handleCaptchaChange}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
        {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
