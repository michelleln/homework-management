import React from "react";

function Home() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow px-4 py-2 flex justify-between items-center">
        <span className="text-xl font-bold">TDSB App</span>
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="p-2 rounded bg-blue-500 text-white"
          >
            Profile
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Account Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center bg-gray-700 text-white py-2 shadow-md">
        <a href="/home" className="mx-2 hover:text-blue-300">
          Home
        </a>
        <a href="#" className="mx-2 hover:text-blue-300">
          Courses
        </a>
        <a href="/calendar" className="mx-2 hover:text-blue-300">
          Tasks
        </a>
        <a href="#" className="mx-2 hover:text-blue-300">
          Tools
        </a>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-4 overflow-y-auto">
          {/* Deadline Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Deadline Section</h2>
            {/* List of Deadlines */}
            <ul>
              {/* Example Deadline Item */}
              <li className="mb-4">
                <div className="font-semibold">Project XYZ Deadline</div>
                <div>Due: January 30, 2023</div>
                <div>Progress: 80%</div>
              </li>
              {/* More deadlines */}
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-4">
          {/* Calendar Plugin Section */}
          <div className="bg-white p-6 rounded-lg shadow h-full">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            {/* Calendar Plugin */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
