import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`;
            console.log("API URL: ", apiUrl);  // Check the logged URL
            const res = await axios({
                url: apiUrl,
                method: "POST",
                data: {
                    firstName,
                    lastName,
                    username,
                    password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("res: ", res);
            localStorage.setItem("paytmtoken", res.data.token);
            navigate('/')
        } catch (error) {
            console.log("error while signup: ", error);
        }
    }

    return (
        <div className="bg-gray-200 flex justify-center items-center min-h-screen">
            <form className="flex flex-col justify-center items-center gap-4 p-8 rounded-xl bg-white text-black" onSubmit={handleSubmit}>
                <header className="flex flex-col justify-center items-center">
                    <h1 className="font-black text-3xl">Sign up</h1>
                    <p className="text-gray-500">Enter the information to create an account</p>
                </header>

                <div className="inputfield flex flex-col items-start w-full">
                    <label className="font-semibold">First Name</label>
                    <input type="text" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="firstname" />
                </div>

                <div className="inputfield flex flex-col items-start w-full">
                    <label className="font-semibold">Last Name</label>
                    <input type="text" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="lastname" />
                </div>

                <div className="inputfield flex flex-col items-start w-full">
                    <label className="font-semibold">Username</label>
                    <input type="text" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </div>

                <div className="inputfield flex flex-col items-start w-full">
                    <label className="font-semibold">Password</label>
                    <input type="password" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>

                <button type="submit" className="text-white rounded-xl hover:bg-slate-800 bg-black w-full p-2">Sign up</button>

                <p className="">Already have an account? <Link to="/signin" className="underline">Login</Link></p>

            </form>
        </div>
    )
}

export default Signup
