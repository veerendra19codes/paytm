import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`;
            const res = await axios({
                url: apiUrl,
                method: "POST",
                data: {
                    username,
                    password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("res: ", res);
            localStorage.setItem("paytmtoken", res.data.token);
            navigate("/")
        } catch (error) {
            console.log("error in signing in: ", error);
        }
    }

    return (
        <div className="bg-gray-200 flex justify-center items-center min-h-screen">
            <form className="flex flex-col justify-center items-center gap-4 p-8 rounded-xl bg-white text-black" onSubmit={handleSubmit}>
                <header className="flex flex-col justify-center items-center">
                    <h1 className="font-black text-3xl">Sign In</h1>
                    <p className="text-gray-500">Enter your credentials to Sign In</p>
                </header>

                <div className="inputfield flex flex-col items-start w-full">
                    <label className="font-semibold">Username</label>
                    <input type="username" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </div>

                <div className="inputfield flex flex-col items-start w-full">
                    <label className="font-semibold">Password</label>
                    <input type="password" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>

                <button className="text-white rounded-xl hover:bg-slate-800 bg-black w-full p-2">Login</button>

                <p className="">Don&apos;t have an account? <Link to="/signup" className="underline">Sign up</Link></p>

            </form>
        </div>
    )
}

export default Signin
