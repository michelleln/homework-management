import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { saveUserToSession } from "./SessionService";

function LogIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useUser();

  const navigate = useNavigate();

  const logInUser = async () => {
    if (email.length === 0 || password.length === 0) {
      alert("Email and password cannot be blank!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(response);
      login(response.data);
      saveUserToSession(response.data);
      navigate("/calendar");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Homework Management
        </h2>
        <form className="mt-8 space-y-6">
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
              <a
                href="/register"
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
              >
                Register
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                logInUser();
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
