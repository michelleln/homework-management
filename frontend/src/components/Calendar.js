import React from "react";
import axios from "axios";
import { clearSession } from "./SessionService";
import { useUser } from "./UserContext";
import { getUserFromSession } from "./SessionService";
import { useNavigate } from "react-router-dom";

function Calendar() {
  // Get today's date
  const today = new Date();

  // State variables for managing current month and tasks
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [tasks, setTasks] = React.useState([]);

  // User context
  const { user } = useUser();
  const { login } = useUser();
  const navigate = useNavigate();

  // State variable and function to toggle profile options dropdown
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);
  const toggleProfileOptions = () => setShowProfileOptions((prev) => !prev);

  // Function to handle user logout
  const handleLogout = () => {
    clearSession();
    alert("Logged out successfully");
    navigate("/login");
  };

  // Function to fetch tasks based on year and month
  const fetchTasks = async (taskYear, taskMonth, student) => {
    const apiUrl = "http://127.0.0.1:5000";

    try {
      const response = await axios.get(
        `${apiUrl}/api/tasks/deadline?student=${student}&year=${taskYear}&month=${
          taskMonth + 1
        }`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("yayyy");
        const tasksArray = response.data;

        return tasksArray; /*Array.isArray(tasksArray)
          ?*/ /*.filter(
              (task) => new Date(task.deadline).getMonth() === taskMonth
            )*/
        //: [];
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  // useEffect to fetch tasks when the component mounts or currentMonth changes
  React.useEffect(() => {
    const storedUser = getUserFromSession();

    if (storedUser) {
      // Update user context if the user is found in local storage
      login(storedUser.id);
    }

    fetchTasks(currentMonth.getFullYear(), currentMonth.getMonth(), user).then(
      (fetchedTasks) => {
        setTasks(fetchedTasks);
      }
    );
  }, [currentMonth, user, login]);

  // Function to change the current month
  const changeMonth = (increment) => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1)
    );
  };

  // Function to render the calendar days
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let days = [];

    // Add day names
    dayNames.forEach((day) => {
      days.push(
        <div key={`day-${day}`} className="font-bold p-4 text-center">
          {day}
        </div>
      );
    });

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="border p-4"></div>);
    }

    // Add calendar cells for each day
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month, i);
      const isToday = today.toDateString() === date.toDateString();
      days.push(
        <div key={i} className={`border p-4 ${isToday ? "bg-blue-100" : ""}`}>
          <span className="block text-center font-bold">{i}</span>
          <ul className="mt-2">
            {Array.isArray(tasks) &&
              tasks
                .filter((task) => new Date(task.deadline).getDate() === i)
                .map((task, idx) => (
                  <li key={idx} className="text-xs truncate">
                    {task.title}
                    <div>
                      <strong>Course:</strong> {task.course_id}
                    </div>
                    <div>{task.deadline}</div>
                    <div>{task.description}</div>
                  </li>
                ))}
          </ul>
        </div>
      );
    }

    return days;
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
                <a href="./addtask" className="hover:underline">
                  New Task
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
      <div className="mt-8 px-6">
        <div className="flex justify-between items-center mb-4">
          {/* Buttons to navigate to previous and next months */}
          <button onClick={() => changeMonth(-1)} className="px-4 py-2">
            Previous
          </button>
          <h2 className="text-xl font-semibold">
            {/* Display the current month and year */}
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h2>
          <button onClick={() => changeMonth(1)} className="px-4 py-2">
            Next
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-4">{renderCalendarDays()}</div>
      </div>
    </div>
  );
}

export default Calendar;
