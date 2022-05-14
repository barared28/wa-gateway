import socket from "../config/socket";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const Login = ({ setLogin }) => {
    const [user, setUser] = useState("");
    const [image, setImage] = useState("");
    const history = useNavigate();
    const handleQrReq = () => {
        socket.emit("join_room", user);
        socket.once("response", (val) => {
            if (!val.data) {
                socket.once("response", (val) => {
                  if (val.data && val.message === 'logined') {
                      handleLogined();
                  }
                })
            }
            if (val.data && val.message === 'logined') {
                handleLogined();
            }
        });


        socket.on("qr", (val) => {
            setImage(val);
        })
    }

    const handleLogined = () => {
        setLogin(true);
        history("/");
        localStorage.setItem("user-logged", user);
    }
    return (
        <div
            className="w-full h-full flex flex-col justify-center items-center"
        >
            <div>
                { image !== '' && (
                    <>
                        <p className="text-2xl text-center font-bold">Scan For Login</p>
                        <img src={image} />
                    </>
                )}
            </div>
            <input
                className="border-black border-2 p-2"
                type="text" placeholder="nama user"
                value={user}
                onChange={val => setUser(val.target.value)}
                disabled={image !== ''}
            />
            { image === '' && (
                <button
                    className="bg-blue-500 p-3 rounded mt-3"
                    onClick={handleQrReq}
                >
                    Request QR
                </button>
            ) }
        </div>
    );
}

export default Login;