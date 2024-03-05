let zod =require('zod')

let createTodo=zod.object({
    userId:zod.string(),
    title:zod.string(),
    description:zod.string()
})

let updateTodo=zod.string();
let deleteTodo=zod.string();


let createUser=zod.object({
    username:zod.string(),
    email:zod.string().email().refine((data) => data.endsWith("@gmail.com")),
    password:zod.string().min(8)
})

module.exports={
    createTodo,updateTodo,createUser,deleteTodo
}