import React from 'react';

function Calendar() {
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  
    const toggleProfileMenu = () => {
      setShowProfileMenu(!showProfileMenu);
    };
  
    return (
      <div className="container mx-auto">
        {/* Screen Header */}
        <header className="flex justify-between items-center p-4 bg-gray-200">
          <h1 className="text-2xl font-bold">TDSB App</h1>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="text-base p-2 bg-blue-600 text-white rounded-md">
              Profile
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Logout</a>
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Account Settings</a>
              </div>
            )}
          </div>
        </header>
  
        {/* Navigation Bar */}
        <nav className="bg-gray-300 p-4">
          <ul className="flex space-x-4">
            <li><a href="/" className="text-blue-600 hover:text-blue-700">Home</a></li>
            <li><a href="/" className="text-blue-600 hover:text-blue-700">Courses</a></li>
            <li><a href="/" className="text-blue-600 hover:text-blue-700">Tasks</a></li>
            <li><a href="/" className="text-blue-600 hover:text-blue-700">Tools</a></li>
          </ul>
        </nav>
  
        {/* Calendar Section */}
        <div className="p-4">
          <div className="bg-white border rounded-lg shadow">
            {/* Calendar Plugin Placeholder */}
            <div className="p-5">
              <div className="text-lg font-bold">
                {/* Current Month and Year */}
                { new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }
              </div>
              {/* Calendar Plugin can be inserted Below */}
              <div id="calendar-plugin" className="mt-3">
                {/* Dummy Calendar - Replace with actual plugin */}
                <div className="grid grid-cols-7 gap-2 text-center p-2">
                  {/* Column Headers (Sunday to Saturday) */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-medium">{day}</div>
                  ))}
                  {/* Days (Placeholder for the actual dates - should be dynamically generated) */}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                    <div key={day} className="p-2 mb-1 bg-gray-100 rounded-full">{day}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Calendar;