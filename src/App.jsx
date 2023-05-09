import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/UserDashboard";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<UserDashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
