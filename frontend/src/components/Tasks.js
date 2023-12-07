import React from "react";

function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [tasks, setTasks] = React.useState([]);
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);

  const toggleProfileOptions = () => setShowProfileOptions((prev) => !prev);

  const fetchTasks = (year, month) => {
    // Fetch tasks based on year and month
    // Placeholder for actual database call
    return [
      { date: "2023-04-10", title: "English Paper" },
      { date: "2023-04-13", title: "Math Exam" },
      { date: "2023-04-15", title: "Science Project" },
    ].filter((task) => new Date(task.date).getMonth() === month);
  };

  React.useEffect(() => {
    const fetchedTasks = fetchTasks(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
    setTasks(fetchedTasks);
  }, [currentMonth]);

  const changeMonth = (increment) => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1)
    );
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="border p-4"></div>);
    }
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month, i);
      const isToday = today.toDateString() === date.toDateString();
      days.push(
        <div key={i} className={`border p-4 ${isToday ? "bg-blue-100" : ""}`}>
          <span className="block text-center font-bold">{i}</span>
          <ul className="mt-2">
            {tasks
              .filter((task) => new Date(task.date).getDate() === i)
              .map((task, idx) => (
                <li key={idx} className="text-xs truncate">
                  {task.title}
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
      <header className="bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center container mx-auto">
          <h1 className="text-2xl">TDSB App</h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:underline">
                  Courses
                </a>
              </li>
              <li>
                <a href="#tasks" className="hover:underline">
                  Tasks
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:underline">
                  Tools
                </a>
              </li>
            </ul>
          </nav>
          <div className="relative">
            <button
              className="hover:bg-gray-700 p-2 rounded"
              onClick={toggleProfileOptions}
            >
              Profile
            </button>
            {showProfileOptions && (
              <div className="absolute right-0 mt-2 bg-white text-black py-2 rounded shadow-xl">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#logout">Logout</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#settings">Account Settings</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mt-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="px-4 py-2">
            Previous
          </button>
          <h2 className="text-xl font-semibold">
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h2>
          <button onClick={() => changeMonth(1)} className="px-4 py-2">
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4">{renderCalendarDays()}</div>
      </div>
    </div>
  );
}

export default Calendar;
