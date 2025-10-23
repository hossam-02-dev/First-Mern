import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, DashboardEmploye, DashboardRh } from "../pages/pages.js";
import Navbar from "../components/Navbar"; 
import { TokenContext } from "../context/AuthContext";

function App() {
  const { token, role } = useContext(TokenContext);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/loginform"
            element={
              token 
                ? <Navigate to={role === "rh" ? "/dashboard/rh" : "/dashboard/employe"} />
                : <Login />
            }
          />
          <Route 
            path="/dashboard/employe" 
            element={token && role === "employe" ? <DashboardEmploye /> : <Navigate to="/loginform" />} 
          />
          <Route 
            path="/dashboard/rh" 
            element={token && role === "rh" ? <DashboardRh /> : <Navigate to="/loginform" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
