import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import RoleManagement from "./pages/RoleManagement";
import { CustomThemeProvider } from "./context/ThemeContext"; 
import Home from "./pages/Home";

const App = () => {
  return (
    <CustomThemeProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/users" element={<Users />} />
            <Route path="/role-management" element={<RoleManagement />} />
          </Routes>
        </div>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
