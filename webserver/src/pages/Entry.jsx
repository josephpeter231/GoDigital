import { useState } from 'react';
import Footer from './components/Footer';
import AddCustomerForm from './components/AddCustomerForm';
import AddEventForm from './components/AddEventForm';
import Navbar from './components/Navbar';
const App = () => {
  const [activeForm, setActiveForm] = useState(null); // 'customer' or 'event'

  const handleOpenForm = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#FFFDD0' }}>
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-2xl text-center font-bold text-orange-700 mb-4">Welcome!</h1>
        <p className="text-center text-gray-600">Choose an option from below to proceed.</p>
      </main>
      <Footer onOpenForm={handleOpenForm} />
      {activeForm === 'customer' && <AddCustomerForm onClose={handleCloseForm} />}
      {activeForm === 'event' && <AddEventForm onClose={handleCloseForm} />}
    </div>
  );
};

export default App;
