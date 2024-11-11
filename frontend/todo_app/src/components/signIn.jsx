

import { Card, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from './appbar';
function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (

        <>

<div className='bg-[#d7a43b] h-10 text-white flex justify-center items-center font-medium'>
                Todo Application
            </div>
            <div className='text-white font-bold flex justify-center pt-20 '>SignIn here</div>
            <div className='flex justify-center items-center pt-5 '>
                <div className='p-6 shadow-[#d7a43b] shadow-xl rounded-xl '>
                    <div className='m-3'>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: John" required  onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                    </div>
 
                    <div className='m-3'>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required onChange={(e)=>{
                            setPassword(e.target.value)
                        }} />
                    </div>
                    <button className="ml-3 mr-2 bg-[#d7a43b]  hover:bg-yellow-700 rounded-lg text-white font-medium py-1 px-4 rounded" onClick={async ()=>{
                        let response= await fetch("http://localhost:3000/todos/signin",{
                            method:"POST",
                            body:JSON.stringify({
                                username:username,
                                password:password
                            }),
                            headers: {
                                "Content-Type": "application/json"
                              }
                        })
                        let data=await response.json();
                        console.log(data);

                        if(data.userFound){
                            localStorage.setItem("token",data.token )
                            localStorage.setItem("userId",data.userId)
                            navigate("/home");
                        }
                    }}>
                        Sign in
                    </button>

                </div>
            </div>
        </>
    )
}

export default SignIn;