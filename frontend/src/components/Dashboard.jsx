import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Send from "./Send";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [balance, setBalance] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(0);
    const [to, setTo] = useState({});

    console.log("allUsers: ", allUsers);

    const fetchBalance = async () => {
        const paytmtoken = localStorage.getItem("paytmtoken");
        console.log("paytmtoken: ", paytmtoken);
        if (!paytmtoken) {
            navigate("/signin");
            return;
        }
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
            headers: {
                "Authorization": `Bearer ${paytmtoken}`,
                "Content-Type": "application/json"
            }
        });
        // console.log("res: ", res);
        setBalance(res.data.balance)
    }
    useEffect(() => {
        fetchBalance();
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            const paytmtoken = localStorage.getItem("paytmtoken");
            console.log("paytmtoken: ", paytmtoken);
            if (!paytmtoken) {
                navigate("/signin");
                return;
            }
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk`, {
                headers: {
                    "Authorization": `Bearer ${paytmtoken}`,
                    "Content-Type": "application/json"
                }
            });
            // const data = await res.json();
            // console.log("data: ", data);
            console.log("res: ", res);
            setAllUsers(res.data.user);
        }
        fetchUsers();
    }, [navigate]);

    const handleSendAmount = async (e, u) => {
        setTo(u);
        console.log("u: ", u);
        setShow(!show);
    }

    return (
        <div className="w-full h-screen flex flex-col gap-8 justify-start mt-8 items-center relative">
            <div className="flex gap-4">
                <h1 className="font-black ">Your balance:</h1>
                <div className="text-gray-500 font-semibold">${balance || "loading"}</div>
            </div>

            <div className="searchbar w-1/2">
                <h1 className="font-black ">Users:</h1>
                <input type="text" value={user} placeholder="search users..." onChange={(e) => setUser(e.target.value)} className="rounded-lg border-[1px] border-gray-500 p-2 pl-4 text-gray-500 font-bold w-full outline-black" />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
                {allUsers && allUsers.map((u) => (
                    <div key={u.username} className="row flex justify-between items-center w-full">
                        <div className="name flex gap-4 items-center">
                            <div className="size-8 flex justify-center items-center bg-gray-200 rounded-full">{u.username[0].toUpperCase()}</div>
                            <p className="font-bold">{u.username}</p>
                        </div>

                        <button className="py-2 px-4 rounded-lg bg-black hover:bg-slate-800 text-white" onClick={(e) => handleSendAmount(e, u)}>Send Money</button>
                    </div>
                ))}
            </div>

            <Send show={show} setShow={setShow} amount={amount} to={to._id} setAmount={setAmount} fetchBalance={fetchBalance} />
        </div>
    )
}

export default Dashboard
