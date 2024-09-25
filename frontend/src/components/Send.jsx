import axios from "axios";

export default function Send({ show, setShow, amount, to, setAmount, fetchBalance }) {
    console.log("show: ", show);
    console.log("to: ", to);

    const handleSendMoney = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`;
            const paytmtoken = localStorage.getItem("paytmtoken")
            const res = await axios({
                url: apiUrl,
                method: "POST",
                data: {
                    to,
                    amount
                },
                headers: {
                    "Authorization": `Bearer ${paytmtoken}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("res: ", res);
            setAmount(0);
            setShow(!show);
            fetchBalance();
        } catch (error) {
            console.log("error in sending money: ", error);
        }
    }
    return (
        <div className={`${show ? "flex" : "hidden"} w-[400px] h-[300px] shadow-lg flex-col justify-between gap-4 px-4 py-8 rounded-lg border-[1px] border-gray-300 absolute m-auto  z-99 bg-white`}>
            <h1 className="font-black pb-4 w-full text-center">Send Money</h1>

            <div className="w-full text-start flex gap-4 items-center">
                <div className="avatar rounded-full size-8 flex justify-center items-center bg-gray-200">
                    U
                </div>
                <h2 className="username font-bold">{to?.username || "username"}</h2>
            </div>

            <div className="inputfield flex flex-col items-start w-full">
                <label className="font-semibold">Amount in $</label>
                <input type="number" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" />
            </div>

            <button className="text-white rounded-xl hover:bg-slate-800 bg-black w-full p-2" onClick={handleSendMoney}>Send</button>
        </div>
    )
}
