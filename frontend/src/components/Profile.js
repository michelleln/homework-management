import React from 'react';

function Profile() {
    const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  
    const toggleProfileDropdown = () => {
      setProfileDropdownOpen(!profileDropdownOpen);
    };
  
    return (
      <div className="desktop-friendly">
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-10 py-6">
            <h1 className="text-3xl font-bold">TDSB App</h1>
            
            <nav>
              <ul className="flex gap-8">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Courses</a></li>
                <li><a href="#" className="hover:underline">Tasks</a></li>
                <li><a href="#" className="hover:underline">Tools</a></li>
              </ul>
            </nav>
  
            <div className="relative">
              <button onClick={toggleProfileDropdown} className="rounded-full focus:outline-none focus:ring">
                <img className="h-10 w-10 rounded-full" src="/avatar.jpg" alt="Profile" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
                  <a href="#" className="block px-4 py-2 text-sm">Logout</a>
                  <a href="#" className="block px-4 py-2 text-sm">Account Settings</a>
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
                <div className="py-4 flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">John Doe</span>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-medium">@johndoe</span>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-gray-600">Timezone:</span>
                  <span className="font-medium">GMT-5 Eastern Time (US & Canada)</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  export default Profile;