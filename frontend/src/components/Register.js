import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  // State variables for user registration
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  // Access the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to register a new user
  const registerUser = async () => {
    // Check if email and password are provided
    if (email.length === 0 || password.length === 0) {
      alert("Email and password cannot be blank!");
      return;
    }

    try {
      // Send a registration request to the server
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        email: email,
        password: password,
      });

      // Check if the registration was successful
      if (response.status === 200) {
        const user = response.data;

        // Add student to the API database
        const responseStudent = await axios.post(
          "http://127.0.0.1:5000/api/students",
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            _id: user.id, // Assuming the user ID is used as _id
            //courses: [], // Add courses data if needed
          }
        );

        // Check if student addition was successful
        if (responseStudent.status === 200) {
          console.log("User and student registered successfully");
          navigate("/login");
        } else {
          console.error("Failed to add student:", responseStudent.statusText);
        }
      } else {
        console.error("Failed to register user:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Homework Management
        </h2>
        <form className="mt-8 space-y-6">
          {/* Input fields for user registration */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm"></div>
            <div className="text-sm">
              {/* Link to the login page */}
              <a
                href="/login"
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
              >
                Log In
              </a>
            </div>
          </div>
          {/* Button to submit the registration form */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                registerUser();
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
