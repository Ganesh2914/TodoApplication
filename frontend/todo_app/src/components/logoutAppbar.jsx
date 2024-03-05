import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Logout(){
    const navigate=useNavigate();
    return <>
     <div className="flex justify-between ">

<div className="font-medium bg-[#d7a43b] shadow-lg rounded-lg text-white m-2 p-2">Todo Application</div>

    <button onClick={()=>{
        localStorage.setItem("token","");
        localStorage.setItem("userId","");
        navigate("/login")
    }} className="m-2 mr-5 p-0 bg-[#d7a43b]  hover:bg-yellow-700 rounded-lg text-white font-medium py-2 px-4 rounded">
        Sign out 
    </button>
   </div>
    </>
}

export default Logout;