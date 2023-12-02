import React from "react";
import "./index.css";
import Profile from "./components/Profile";
import LogIn from "./components/Login";
import Calendar from "./components/Calendar";
import AddTasks from "./components/AddTasks";
import {BrowserRouter, Routes, Route} from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
