import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/SIgnup"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"
import Send from "./components/send"
import Navbar from "./components/Navbar"


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </Router>
  )
}

export default App
