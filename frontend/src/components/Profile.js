import React, { useState, useEffect } from "react";
import axios from "axios";
import { clearSession } from "./SessionService";
import { getUserFromSession } from "./SessionService";
import { useNavigate } from "react-router-dom";

function Profile() {
  // State variables for managing the profile dropdown and user details
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [courses, setCourses] = React.useState([]);
  const apiUrl = "http://127.0.0.1:5000";

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Access the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    // Clear local storage and navigate to the logout route
    clearSession();
    alert("Logged out successfully");
    navigate("/login");
  };

  // Get stored user information from the session
  const storedUser = getUserFromSession();

  // Fetch student details when the component mounts or when storedUser.id changes
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/students?id=${storedUser.id}`,
          { withCredentials: true }
        );
        setStudentDetails(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [storedUser.id]);

  // Fetch courses when the component mounts or when storedUser.id changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response1 = await axios.get(
          `${apiUrl}/api/tasks/course?student_id=${storedUser.id}`
        );
        setCourses(response1.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [storedUser.id]);

  return (
    <div className="desktop-friendly">
      <header className="bg-white shadow">
        <div className="flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl font-bold">Homework Management</h1>

          <nav>
            <ul className="flex gap-8">
              <li>
                <a href="/calendar" className="hover:underline">
                  Calendar
                </a>
              </li>
              <li>
                <a href="/addtask" className="hover:underline">
                  New Task
                </a>
              </li>
            </ul>
          </nav>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="rounded-full focus:outline-none focus:ring"
            >
              <img
                className="h-10 w-10 rounded-full"
                src="/avatar.jpg"
                alt="Profile"
              />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold">Account Settings</h2>
            </div>
            <div className="divide-y">
              {/* Display user details */}
              <div className="py-4 flex justify-between">
                <span className="text-gray-600">First name:</span>
                <span className="font-medium">{studentDetails.firstName}</span>
              </div>
              <div className="py-4 flex justify-between">
                <span className="text-gray-600">Last name:</span>
                <span className="font-medium">{studentDetails.lastName}</span>
              </div>
              <div className="py-4 flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{studentDetails.email}</span>
              </div>
              <div className="py-4 flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium">{studentDetails._id}</span>
              </div>
              {/* Display courses */}
              <div className="py-4 flex justify-between">
                <span className="text-gray-600">Courses:</span>
                <span className="font-medium">{courses.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
