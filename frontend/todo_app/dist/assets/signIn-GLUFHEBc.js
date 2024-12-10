import{r as s,u as i,j as e}from"./index-nmOx9_9Z.js";function u(){const[a,o]=s.useState(""),[d,n]=s.useState(""),l=i();return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"bg-[#d7a43b] h-10 text-white flex justify-center items-center font-medium",children:"Todo Application"}),e.jsx("div",{className:"text-white font-bold flex justify-center pt-20 ",children:"SignIn here"}),e.jsx("div",{className:"flex justify-center items-center pt-5 ",children:e.jsxs("div",{className:"p-6 shadow-[#d7a43b] shadow-xl rounded-xl ",children:[e.jsxs("div",{className:"m-3",children:[e.jsx("label",{for:"username",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Username"}),e.jsx("input",{type:"text",id:"username",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Ex: John",required:!0,onChange:r=>{o(r.target.value)}})]}),e.jsxs("div",{className:"m-3",children:[e.jsx("label",{for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),e.jsx("input",{type:"text",id:"password",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"",required:!0,onChange:r=>{n(r.target.value)}})]}),e.jsx("button",{className:"ml-3 mr-2 bg-[#d7a43b]  hover:bg-yellow-700 rounded-lg text-white font-medium py-1 px-4 rounded",onClick:async()=>{let t=await(await fetch("http://localhost:3000/todos/signin",{method:"POST",body:JSON.stringify({username:a,password:d}),headers:{"Content-Type":"application/json"}})).json();console.log(t),t.userFound&&(localStorage.setItem("token",t.token),localStorage.setItem("userId",t.userId),l("/home"))},children:"Sign in"})]})})]})}export{u as default};