import React from "react";
import axios from "axios";
import { clearSession } from "./SessionService";
import { getUserFromSession } from "./SessionService";
import { useNavigate } from "react-router-dom";

function AddTask() {
  // State variables to store form input values
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [taskCourse, setTaskCourse] = React.useState("");
  const [taskDate, setTaskDate] = React.useState("");
  const [taskTime, setTaskTime] = React.useState("");

  const navigate = useNavigate();

  // State variable and function to toggle profile options dropdown
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);
  const toggleProfileOptions = () => setShowProfileOptions((prev) => !prev);

  // Function to handle user logout
  const handleLogout = () => {
    clearSession(); // Clear local storage
    alert("Logged out successfully");
    navigate("/login"); // Navigate to the login route
  };

  // Function to submit a new task
  const submitTask = async () => {
    // URL to API
    const apiUrl = "http://127.0.0.1:5000";

    // Get user information from local storage (acts as flask-session but I do this in Reeact instead because flask session doesn't work well with React for some reasons)
    const storedUser = getUserFromSession();

    // Task data object to be sent to the backend
    const taskData = {
      title: taskTitle,
      date: taskDate,
      time: taskTime,
      course: taskCourse,
      description: taskDescription,
      student: storedUser.id,
      attachments: [],
    };

    try {
      // Send a POST request to add a new task
      const response = await axios.post(`${apiUrl}/api/tasks`, taskData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Clear out the form fields after successful submission
      setTaskTitle("");
      setTaskDate("");
      setTaskTime("");
      setTaskCourse("");
      setTaskDescription("");

      if (response.status === 200) {
        alert("Task added successfully!");
      } else {
        alert("Failed to add task:", response.statusText);
      }
    } catch (error) {
      alert("Error:", error);
    }
  };

  return (
    <div>
      {/* Header section */}
      <header className="bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center container mx-auto">
          <h1 className="text-2xl">Homework Management</h1>
          {/* Navigation section */}
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="/calendar" className="hover:underline">
                  Calendar
                </a>
              </li>
            </ul>
          </nav>
          {/* Profile options section */}
          <div className="relative">
            <button
              className="hover:bg-gray-700 p-2 rounded"
              onClick={toggleProfileOptions}
            >
              Profile
            </button>
            {/* Profile options dropdown */}
            {showProfileOptions && (
              <div className="absolute right-0 mt-2 bg-white text-black py-2 rounded shadow-xl">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/profile">Account Settings</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main content section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Form section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add Task
            </h3>
          </div>
          <div className="bg-gray-200 border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {/* Form fields */}
              {/* Title */}
              <div className="py-4 sm:p-4">
                <dt className="text-sm font-medium text-gray-700">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </dd>
              </div>
              {/* Course */}
              <div className="py-4 sm:p-4">
                <dt className="text-sm font-medium text-gray-700">Course</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={taskCourse}
                    onChange={(e) => setTaskCourse(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </dd>
              </div>
              {/* Due Date & Time */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-4">
                <dt className="text-sm font-medium text-gray-700">
                  Due Date & Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 sm:flex sm:space-x-4">
                  <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm sm:max-w-xs"
                  />
                  <input
                    type="time"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm sm:max-w-xs"
                  />
                </dd>
              </div>
              {/* Description */}
              <div className="py-4 sm:p-4">
                <dt className="text-sm font-medium text-gray-700">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <textarea
                    rows="3"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  ></textarea>
                </dd>
              </div>
              {/* Submit button */}
              <div className="py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={submitTask}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Submit Task
                </button>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
