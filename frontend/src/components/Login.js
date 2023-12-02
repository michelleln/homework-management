import React from 'react';

function LogIn() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission
    };
  
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-900">TDSB App</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
              <input 
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input 
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot Password?
                </a>
              </div>
              <div className="text-sm">
                <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
                  Sign in with Google
                </a>
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default LogIn;