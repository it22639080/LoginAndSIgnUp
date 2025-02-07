import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


const Main = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3000/api/users").then((res) => {
			setUsers(res.data);
		});
	}, []);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="w-full min-h-screen bg-gray-100">
			{/* Navbar */}
			<nav className="w-full h-[70px] bg-teal-500 flex items-center justify-between px-5">
				<h1 className="text-white text-2xl font-bold">Dashboard</h1>
				<button 
					className="w-[120px] bg-white text-teal-500 font-bold py-2 rounded-full cursor-pointer hover:bg-gray-200"
					onClick={handleLogout}
				>
					Logout
				</button>
			</nav>

			{/* Google Map */}
			<LoadScript googleMapsApiKey="AIzaSyD8QNsp59Fb__I1aRHscWr0eAaFK7qYUH8">
				<GoogleMap 
					center={{ lat: 7.8731, lng: 80.7718 }} 
					zoom={7} 
					mapContainerClassName="w-full h-[500px]"
				>
					{users.map((user, index) => (
						<Marker key={index} position={{ lat: user.latitude, lng: user.longitude }} />
					))}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default Main;