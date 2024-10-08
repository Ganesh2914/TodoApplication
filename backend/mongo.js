let mongoose=require('mongoose')
require('dotenv').config();

console.log(process.env.Database_URL)

mongoose.connect(process.env.Database_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

let userSchema= new mongoose.Schema({
    username:String,
    email:String,
    password:String,
     
})

let todoSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:String,
    description:String,
    completed:Boolean
})

let Todos=mongoose.model("Todos",todoSchema);
let User=mongoose.model("User",userSchema);
module.exports={
    Todos,User
}