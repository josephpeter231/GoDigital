
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar (Fixed at the top) */}
      <Navbar />

      {/* Main Content - Scrollable */}
      <main className="flex-grow overflow-y-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto">
          {/* About Us Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800">About Us</h1>
            <p className="text-sm text-gray-600 mt-2">Our journey, mission, and vision</p>
          </div>

          {/* Our Story Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">Our Story</h2>
            <p className="text-gray-600 mt-2">
              We are a team of passionate individuals dedicated to delivering the best solutions. Our story began with a vision to create meaningful change in the industry, and since then, we've been working tirelessly to bring innovative ideas to life.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">Our Mission</h2>
            <p className="text-gray-600 mt-2">
              Our mission is to empower individuals and organizations to reach their full potential through cutting-edge technology and excellent customer service. We are committed to creating value and making a positive impact in everything we do.
            </p>
          </div>

          {/* Vision Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">Our Vision</h2>
            <p className="text-gray-600 mt-2">
              We envision a future where our products and services play a key role in transforming industries and improving lives. Our goal is to be a leader in innovation and sustainability, while always staying true to our values.
            </p>
          </div>

          {/* Team Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">Meet Our Team</h2>
            <p className="text-gray-600 mt-2">
              Our team is the heart of our organization. With diverse backgrounds, expertise, and a shared passion for innovation, we work together to achieve our common goals. 
            </p>
            <div className="flex justify-center space-x-8 mt-6">
              <div className="text-center">
                <img
                  src="/path/to/team-member1.jpg"
                  alt="Team Member 1"
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <h3 className="mt-2 font-semibold text-gray-700">John Doe</h3>
                <p className="text-gray-600 text-sm">CEO & Founder</p>
              </div>
              <div className="text-center">
                <img
                  src="/path/to/team-member2.jpg"
                  alt="Team Member 2"
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <h3 className="mt-2 font-semibold text-gray-700">Jane Smith</h3>
                <p className="text-gray-600 text-sm">CTO</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Us</h2>
            <p className="text-gray-600 mt-2">
              We’d love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out to us.
            </p>
            <p className="text-gray-600 mt-2">
              Email us at: <a href="mailto:contact@company.com" className="text-blue-600">contact@company.com</a>
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-8 mb-4 text-center">
            <button
              onClick={() => navigate('/entry')}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </main>

      {/* Footer (Fixed at the bottom) */}
      <Footer />
    </div>
  );
};

export default AboutUs;
