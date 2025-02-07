import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({ firstName: "", email: "", password: "", latitude: "", longitude: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setData({ ...data, latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (error.response) setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[900px] h-[500px] rounded-lg shadow-lg bg-white">
        
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-1/3 bg-teal-500 text-white rounded-l-lg p-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <Link to="/login">
            <button className="w-44 py-3 mt-4 text-teal-500 bg-white font-semibold rounded-full hover:bg-gray-200 transition">
              Sign in
            </button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-2/3 bg-white rounded-r-lg p-8">
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <input
              className="w-80 p-3 rounded-lg bg-gray-200 text-sm focus:outline-none mb-3"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              className="w-80 p-3 rounded-lg bg-gray-200 text-sm focus:outline-none mb-3"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="w-80 p-3 rounded-lg bg-gray-200 text-sm focus:outline-none mb-3"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button
              className="w-44 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition mb-3"
              type="button"
              onClick={getLocation}
            >
              Get Location
            </button>
            <button
              className="w-44 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          {error && <div className="w-80 p-3 mt-3 text-sm text-center text-white bg-red-500 rounded">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
