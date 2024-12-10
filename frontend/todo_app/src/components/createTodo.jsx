import { useEffect, useState } from "react";
import Logout from "./logoutAppbar";
import { Typography } from "@mui/material";
import { Todos } from "./Todos";
import CustomCard from "./card";
 
// Import the Todo component
function useDataFetch(){
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fix the fetch URL to use "http" instead of "https"
      let value=setInterval(()=>{
        fetch("http://localhost:3001/todos",{
          headers:{
            userId:localStorage.getItem("userId"),
            "Content-Type": "application/json"
          }
        })
        .then(async (data) => {
          let todosFetch = await data.json();
          // setLoading(false);
          setTodos(todosFetch.todos);
        })
        .catch((error) => console.error("Error fetching todos:", error));
      },10000)
      fetch("http://localhost:3001/todos",{
        headers:{
          userId:localStorage.getItem("userId"),
          "Content-Type": "application/json"
        }
      })
        .then(async (data) => {
          let todosFetch = await data.json();
          // setLoading(false)
          setTodos(todosFetch.todos);
         
        })
        .catch((error) => console.error("Error fetching todos:", error));

        // return ()=>{
        //     clearInterval(value)
        // }
      }, []);
      return {todos,loading};
}

export default function CreateTodo() {
  let {todos,loading}=useDataFetch();
  return (<>
    
      {loading? <div>"loading......"</div>:<RenderingLogic todos={todos}/> }
    
  </>
  );
}
function RenderingLogic({todos}){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return <>
    <Logout />
    <div className="mt-2 flex justify-between items-center w-full h-24 bg-[#444444] ">

      <div className="flex">
        <div className="m-2">
          <div className="text-white"> Title</div>
           <input className="border-4 border-yellow-700 rounded-lg" type="text" onChange={(e)=>{
              setTitle(e.target.value)
           }} />
           
        </div>
        <div className="m-2  ">
          <div className="text-white">Description</div>
          <input className="border-4 border-yellow-700 rounded-lg" type="text" onChange={(e)=>{
              setDescription(e.target.value)
           }} />
        </div>
      </div>

      <div>
        <button onClick={async () => { 

           let response= await fetch("http://localhost:3001/todo",{
              method:"POST",
              body:JSON.stringify({
                 userId:localStorage.getItem("userId"),
                 title:title,
                 description:description
              }),
              headers:{
                "Content-Type":"application/json"
              }
            })
            let data=await response.json();
            console.log(data);
            // window.location.reload();
            if(data.found){
              window.alert("The values already exists")
            }

        }} className="m-2 mr-5 p-0 bg-[#d7a43b]  hover:bg-yellow-700 rounded-lg text-white font-medium py-2 px-4 rounded" >
          Add Todo
        </button>
      </div>
    </div>
 
  <CustomCard  todos={todos} />

  </>
}