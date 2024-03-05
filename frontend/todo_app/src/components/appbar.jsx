
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";



export default function Appbar() {
    const navigate = useNavigate();

    return <>
        <div className="flex justify-between ">

            <div className="font-medium bg-[#d7a43b] shadow-lg rounded-lg text-white m-2 p-2">Todo Application</div>

            <div className="font-medium shadow-[#d7a43b] shadow rounded-lg text-white m-2 p-2">Sign Up or Sign In to get started</div>    
            <div className=" p-2 ">
                <button onClick={()=>{
                    navigate("/signup")
                }}   className="bg-[#d7a43b] hover:bg-yellow-700 text-white rounded-lg font-medium py-2 px-4 rounded">
                    SignUp
                </button>
                <button onClick={()=>{
                    navigate("/login")
                }} className="ml-4 mr-2 bg-[#d7a43b]  hover:bg-yellow-700 rounded-lg text-white font-medium py-2 px-4 rounded">
                    SignIn
                </button>
            </div>
        </div>
        <div className="m-10  flex justify-center items-center ">
            <img className=" object-cover h-70 w-90  rounded-2xl" src="src\assets\cover-1.png" alt="image description" />
        </div>
    </>
}