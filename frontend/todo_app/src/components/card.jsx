import { useEffect, useState } from "react";

 


export default function CustomCard({ todos }) {



    return <div >
        {todos.map((todo) => {
        
            return <div key={todo._id} id={todo._id} className=" mt-4 w-4/5 h-28 flex justify-between bg-[#444444]">

                <div>
                    <div className={`pl-4 text-5xl text-[#ff9606] ${todo.completed ? 'line-through' : "null"}`}> {todo.title} </div>
                    <div className={` pl-6 p-2 text-lg  text-white ${todo.completed ? 'line-through' : "null"}`}> {todo.description} </div>
                </div>

                <div>


                    <button className={`m-4 mr-4 bg-[white]  hover:bg-green-900 rounded-lg text-green-500 font-medium py-2 px-4 rounded ${todo.completed ? 'bg-green-900' : "null"}`} onClick={async () => {

                        if (!todo.completed) {
                            try {
                                const response = await fetch(`http://localhost:3001/todo/completed/${todo._id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });
                                if (!response.ok) {
                                    throw new Error("Failed to mark todo as completed");
                                }
                                let data = await response.json();
                                // window.location.reload();
                              

                            } catch (error) {
                                console.error("Error marking todo as completed:", error);
                                // Handle error (e.g., show error message to the user)
                            }

                        } else {
                            try {
                                const response = await fetch(`http://localhost:3001/todo/Uncomplete/${todo._id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });
                                if (!response.ok) {
                                    throw new Error("Failed to mark todo as incomplete");
                                }
                                let data = await response.json();
                              
                                // window.location.reload();
                            } catch (error) {
                                console.error("Error marking todo as incomplete:", error);
                                // Handle error (e.g., show error message to the user)
                            }

                        }

                    }}>
                        {todo.completed ? "Completed":"Complete"}
                    </button>
                    <button className="m-4 mr-10 bg-[white]  hover:bg-red-900 rounded-lg text-red-500 font-medium py-2 px-4 rounded" onClick={async () => {
                        const response = await fetch(`http://localhost:3001/todo/delete/${todo._id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        let data= response.json();
                        console.log(data);
                         
                            // Fix the fetch URL to use "http" instead of "https"
                            // window.location.reload();
                        
                    
                         
                    }} >
                        Delete
                    </button>
                </div>

            </div>

        })}
    </div>

}