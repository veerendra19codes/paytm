import { Link, useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location.pathname", location.pathname);

    const showNavbar = !(location.pathname === "/signin" || location.pathname === "/signup");
    console.log("showNavbar: ", showNavbar);

    const handleSignout = () => {
        localStorage.removeItem("paytmtoken");
        navigate("/signin");
    }
    return (
        <>
            {showNavbar ?
                <div className="w-full h-16 shadow-xl flex justify-between items-center p-2 px-8">
                    <Link to="/" className="font-black text-2xl">Payyy</Link>

                    <div className="flex gap-4 justify-center items-center">
                        <p>Hello, user</p>
                        <div className="rounded-full size-8 flex justify-center items-center bg-gray-200">U</div>
                        <button className="bg-black text-white p-2 rounded-lg" onClick={handleSignout}>Signout</button>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

export default Navbar
