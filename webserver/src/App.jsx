import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Entry from './pages/Entry.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/entry" element={<Entry />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
