
export default function Send({ show, amount, to, setAmount }) {
    console.log("show: ", show);
    console.log("to: ", to);
    return (
        <div className={`${show ? "flex" : "hidden"} w-[400px] h-[300px] shadow-lg flex-col justify-between gap-4 px-4 py-8 rounded-lg border-[1px] border-gray-300 absolute top-1/4 left-1/3  z-99 bg-white`}>
            <h1 className="font-black pb-4 w-full text-center">Send Money</h1>

            <div className="w-full text-start flex gap-4 items-center">
                <div className="avatar rounded-full size-8 flex justify-center items-center bg-gray-200">
                    {to?.username[0].toUpperCase() || "U"}
                </div>
                <h2 className="username font-bold">{to?.username || "username"}</h2>
            </div>

            <div className="inputfield flex flex-col items-start w-full">
                <label className="font-semibold">Amount in $</label>
                <input type="number" className="w-full p-2 rounded-lg border-[1px] border-gray-500 text-gray-500" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" />
            </div>

            <button className="text-white rounded-xl hover:bg-slate-800 bg-black w-full p-2">Send</button>
        </div>
    )
}
