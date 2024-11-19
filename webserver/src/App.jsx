import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Entry from './pages/Entry.jsx'
import CustomerDetails from './pages/CustomerPage.jsx'
import Events from './pages/RegisteredEvents.jsx'
import Individual from './pages/IndividualEvents.jsx'
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/customer-data" element={<CustomerDetails />} />
          <Route path="/event-list" element={<Events />} />
          <Route path="/registered-events" element={<Individual />} />
          <Route path="/all-events-list" element={<Individual />} />
           
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
