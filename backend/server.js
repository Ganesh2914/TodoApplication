let express = require('express');
const { Todos, User } = require('./mongo');
const cors = require('cors')
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo, createUser, deleteTodo } = require('./zod');
const { key } = require('./secretKey');
let app = express();
let port = process.env.PORT || 3001
app.use(express.json());
app.use(cors());
 

app.post("/todos/signup", async (req, res) => {

    let payload = req.body;
    const parsedpayload = createUser.safeParse(payload);
    console.log(parsedpayload);
    if (!parsedpayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return
    }
    let {username,email}=parsedpayload.data
    let found = await User.findOne({
       username,email
    })
    // console.log(username+" "+email);

    let userFound = Boolean(found)
    if(userFound){
        res.json({msg:"User already exists"})
        return
    }
    const user = await User.create({
        username: parsedpayload.data.username,
        email:parsedpayload.data.email,
        password: parsedpayload.data.password
    })
    // // console.log(user._id.toString())

    let token = jwt.sign(user._id.toString(),key);
    res.json({
        msg: " User created successfully",
        success:true,
        userId:user._id,
        token:token
    })
})

app.post("/todos/signin", async (req, res) => {

    let { username, password } = req.body;
    let user = await User.findOne({
        username, password
    })
    console.log(username+" "+password);

    let userFound = Boolean(user)

    if (!user) {
        res.json({
            msg: " User doesn't exist ",
            userFound: userFound
        })
        return;
    } else {
        let token = jwt.sign(username, key)
        res.json({
            token: token,
            userId:user._id,
            userFound: userFound
        })

    }

})

app.get("/user/info",async (req,res)=>{

    let userid=req.headers.userid
    console.log(userid)
    let user=await User.findOne({
        _id:userid
    })
    // console.log(user.username)
    res.json({
        username: user.username,
        email : user.email
    })

})
app.put("/user/infoupdate",async (req,res)=>{
    let userid=req.headers.userid
    let {username,email}=req.body
    console.log(userid)
    let user=await User.findOne({
        _id:userid
    })
    await User.updateOne({_id:userid},{username,email});
    res.json({
        msg:"User updated successfully",
        success:true
    })
})


app.get("/todos", async (req, res) => {
    try {
      const userId = req.headers.userid;
      const todos = await Todos.find({ userId });
      res.json({ todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.post("/todo", async (req, res) => {
    const createpayload = req.body;
    const parsedpayload = createTodo.safeParse(createpayload);
    if (!parsedpayload) {
        res.status(411).json({
            msg: "You sent the wrong input"
        })
        return
    }
    const { title, description,userId } = req.body
    // console.log(req.body.title)
         
    const findValue=await Todos.findOne({
       title:title,description:description
    })

    if(findValue){
      return res.json({
            msg:"The values already exists",
            found:true
        })
    }

    let setsTodoInMDB = await Todos.create({
        userId:userId,
        title: title,
        description: description,
        completed: false
    })

    res.json({
        msg: " Todo added successfully "
    })
})

app.put("/todo/completed/:id", async (req, res) => {
    const todoId = req.params.id; // Renamed variable for clarity
    
    // Assuming updateTodo is a validator for the todo item, use it for parsing
    const parsedPayload = updateTodo.safeParse(todoId);
    
    if (!parsedPayload.success) {
        return res.status(411).json({
            msg: "You sent the wrong input"
        });
    }
    console.log(todoId)
    try {
        // Find the todo item by its id
        const todo = await Todos.findOne({ _id: todoId });
        
        if (!todo) {
            return res.status(404).json({
                msg: "Todo item not found"
            });
        }
        
        // Update the todo item to mark it as completed
        await Todos.updateOne({ _id: todoId }, { completed: true });
        
        // Send a success response
        res.json({
            msg: "Updated Successfully",
            completed: true
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});

app.put("/todo/Uncomplete/:id", async (req, res) => {
    const todoId = req.params.id; // Renamed variable for clarity
    
    // Assuming updateTodo is a validator for the todo item, use it for parsing
    const parsedPayload = updateTodo.safeParse(todoId);
    
    if (!parsedPayload.success) {
        return res.status(411).json({
            msg: "You sent the wrong input"
        });
    }
    console.log(todoId)
    try {
        // Find the todo item by its id
        const todo = await Todos.findOne({ _id: todoId });
        
        if (!todo) {
            return res.status(404).json({
                msg: "Todo item not found"
            });
        }
        
        // Update the todo item to mark it as completed
        await Todos.updateOne({ _id: todoId }, { completed: false });
        
        // Send a success response
        res.json({
            msg: "Updated Successfully",
            completed: false
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});

app.delete("/todo/delete/:id",async (req,res)=>{
    const todoId = req.params.id; // Renamed variable for clarity
    
    // Assuming updateTodo is a validator for the todo item, use it for parsing
    const parsedPayload = deleteTodo.safeParse(todoId);
    
    if (!parsedPayload.success) {
        return res.status(411).json({
            msg: "You sent the wrong input"
        });
    }
    try{
        await Todos.deleteOne({_id:todoId})
        res.json({
            msg:"Todo Deleted Successfully"
        })
    }catch(error){
        console.error("Error deleting todo:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
})
app.listen(port, () => {
    console.log("App is listening on " + port)
})