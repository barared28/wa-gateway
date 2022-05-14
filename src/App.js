import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import socket from "./config/socket";

function App() {
    const [login, setLogin] = useState(false);
    return (
    <BrowserRouter>
        <Navbar login={login} />
        <div style={{ height: '90vh' }}>
            <Routes>
                <Route path="/" element={<Home login={login} setLogin={setLogin} />} />
                <Route path="/login" element={<Login setLogin={setLogin} />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
