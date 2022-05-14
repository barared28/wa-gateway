import socket from "../config/socket";

export const checkingLogin = new Promise((resolve, reject) => {
    const checking = localStorage.getItem("user-logged") || "";
    if (checking && checking !== "") {
        console.log("checking");
        socket.emit("join_room", checking);
        socket.once("response", (val) => {
            if (val.data && val.message === 'logined') {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
    setTimeout(() => {
        reject(false);
    }, 3000);
})