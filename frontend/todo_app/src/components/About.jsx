import { useEffect, useState } from "react";
import Logout from "./logoutAppbar";

export default function About() {
    const [username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/user/info", {
            headers: {
                "Content-Type": "application/json",
                "userid": localStorage.getItem("userId")
            }
        }).then(async (res) => {
            let data = await res.json();
            console.log(data)
            setUsername(data.username)
            setEmail(data.email)
        })
    }, [])
    function updateInfo() {
        fetch("http://localhost:3000/user/infoupdate", {
            method: "PUT",
            body: JSON.stringify({
                username: newUsername,
                email: newEmail
            }),
            headers: {
                "Content-Type": "application/json",
                "userid": localStorage.getItem("userId")
            }
        }).then(async (res) => {
            let data = await res.json();
            if (data.success) {
                alert("User info updated successfully")
                fetch("http://localhost:3000/user/info", {
                    headers: {
                        "Content-Type": "application/json",
                        "userid": localStorage.getItem("userId")
                    }
                }).then(async (res) => {
                    let data = await res.json();
                    console.log(data)
                    setUsername(data.username)
                    setEmail(data.email)
                })
            }
            console.log(data)

        })
    }
    return <>
        <Logout />
        <div className="bg-[#d7a43b]">

            <div className="m-4 text-xl text-white">
                Usernme- {username}
            </div>
            <div className="m-4 text-xl text-white">
                Email- {Email}
            </div>
        </div>
        <div className="text-white text-2xl">Update your info here</div>
        <div className="m-2 text-white text-2xl">Username - <input className="text-black" type="text" onChange={e => {
            setNewUsername(e.target.value)
        }} /></div>
        <div className="m-2 text-white text-2xl">Email- <input className="text-black" type="text" onChange={e => {
            setNewEmail(e.target.value);
        }} /></div>
        <div>
            <button onClick={updateInfo} className="font-medium bg-[#d7a43b] shadow-lg rounded-lg text-white m-2 p-2">Update info</button>
        </div>

    </>
}