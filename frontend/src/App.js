import React from "react";
import "./index.css";
import Profile from "./components/Profile";
import LogIn from "./components/Login";
import Calendar from "./components/Calendar";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import Register from "./components/Register";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    //<BrowserRouter>
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </UserProvider>
    </Router>
    //</BrowserRouter>
  );
}
