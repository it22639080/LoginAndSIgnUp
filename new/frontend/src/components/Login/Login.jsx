import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/auth/login";

			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
		<div className="w-[900px] h-[500px] flex rounded-lg shadow-lg">
			{/* Left Side - Form */}
			<div className="flex-2 flex flex-col items-center justify-center bg-white rounded-l-lg p-6">
				<form className="flex flex-col items-center" onSubmit={handleSubmit}>
					<h1 className="text-3xl font-bold mb-6">Login to Your Account</h1>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
						required
						className="w-[370px] p-4 rounded-lg bg-gray-100 my-2 text-sm outline-none border-none"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className="w-[370px] p-4 rounded-lg bg-gray-100 my-2 text-sm outline-none border-none"
					/>
					{error && <div className="w-[370px] p-3 my-2 text-sm text-white bg-red-500 rounded-md text-center">{error}</div>}
					<button type="submit" className="w-[180px] bg-teal-500 text-white font-bold py-3 rounded-full mt-4 cursor-pointer hover:bg-teal-600">
						Sign In
					</button>
				</form>
			</div>

			{/* Right Side - Signup Prompt */}
			<div className="flex-1 flex flex-col items-center justify-center bg-teal-500 rounded-r-lg p-6 text-white">
				<h1 className="text-3xl font-bold mb-6">New Here?</h1>
				<Link to="/signup">
					<button type="button" className="w-[180px] bg-white text-teal-500 font-bold py-3 rounded-full cursor-pointer hover:bg-gray-200">
						Sign Up
					</button>
				</Link>
			</div>
		</div>
	</div>
	);
};

export default Login;
