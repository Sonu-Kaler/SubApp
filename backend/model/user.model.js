import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        trim:true,
        lowercase:true,
        unique:true,
        match:[/\S+@\S+\.\S+/, "Please provide valid email address"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        select:false,
        minLength:6
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);
export default User;