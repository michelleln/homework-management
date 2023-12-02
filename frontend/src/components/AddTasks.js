import React from 'react';

function Tasks() {
    const [taskTitle, setTaskTitle] = React.useState('');
    const [taskDescription, setTaskDescription] = React.useState('');
    const [taskCourse, setTaskCourse] = React.useState('');
    const [taskDate, setTaskDate] = React.useState('');
    const [taskTime, setTaskTime] = React.useState('');
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white py-4 shadow">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <h1 className="text-3xl font-bold text-gray-900">TDSB App</h1>
            <div className="relative">
              <button className="px-4 py-2 bg-gray-300 rounded-full focus:outline-none">
                Profile
              </button>
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>
        </header>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Courses</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tasks</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tools</a>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Task</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:p-4">
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </dd>
                </div>
                <div className="py-4 sm:p-4">
                  <dt className="text-sm font-medium text-gray-500">Course</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <select
                      value={taskCourse}
                      onChange={(e) => setTaskCourse(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Select Course</option>
                      <option value="course1">Course 1</option>
                      <option value="course2">Course 2</option>
                    </select>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-4">
                  <dt className="text-sm font-medium text-gray-500">Due Date & Time</dt>
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
                <div className="py-4 sm:p-4">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <textarea
                      rows="3"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    ></textarea>
                  </dd>
                </div>
                <div className="py-4 sm:p-4">
                  <dt className="text-sm font-medium text-gray-500">Attachment</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="file"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </dd>
                </div>
                <div className="py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
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

  export default Tasks;