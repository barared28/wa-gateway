import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { checkingLogin } from "../Service";
import socket from "../config/socket";

const Home = ({ login, setLogin }) => {
    const [nomor, setNomor] = useState("");
    const [pesan, setPesan] = useState("");
    const [log, setLog] = useState("");

    const history = useNavigate();
    useEffect(() => {
        (async () => {
            const res = await checkingLogin;
            console.log("checking login", res);
            if (!res && !login) {
                history("/login")
            } else {
                setLogin(true);
            }
        })()
    }, [])

    const handleKirimPesan = () => {
        const idUser = localStorage.getItem("user-logged") || "";
        socket.emit("send_message", { number: nomor, message: pesan, id: idUser });
        socket.once("response", (val) => {
            setLog(val.message);
            setTimeout(() => {
                setLog("");
            }, 3000);
        })
    }
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">
              { login ? "Aplikasi siap digunakan" : "Login Terlebih dahulu" }
          </h2>
          <div className="mt-14">
              <input
                  className="p-2 mr-2 border-2 rounded"
                  value={nomor}
                  placeholder="Nomor Tujuan"
                  onChange={val => setNomor(val.target.value)}
              />
              <input
                  className="p-2 mr-2 border-2 rounded"
                  value={pesan}
                  placeholder="Pesan"
                  onChange={val => setPesan(val.target.value)}
              />
              <button
                  onClick={handleKirimPesan}
                  className="px-4 py-2 bg-blue-500 rounded text-white"
              >
                  Kirim Pesan
              </button>
          </div>
          <div className="mt-14">
              { log !== "" && (
                  <h3>{log}</h3>
              ) }
          </div>
      </div>
    );
}

export default Home;