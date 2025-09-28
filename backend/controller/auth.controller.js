import mongoose from "mongoose"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"

export const signUp=async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {name,email,password} = req.body;

        const exists = await User.findOne({email});

        if(exists){
            const error = new Error("Email Already Exists");
            error.statusCode=401
            throw error
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUsers = await User.create([{name,email,password:hashedPassword}],{session})

        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        await session.commitTransaction();
        await session.endSession();
        res.status(201).json({success:true, data:{token,user:newUsers[0]}})
    }
    catch(e){
        await session.abortTransaction();
        await session.endSession();
        next(e)
    }
}

export const signIn=async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email}).select("+password")

        if(!user){
            const error = new Error("User Not Found");
            error.statusCode=404
            throw error
        }

        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            const error = new Error("Wrong Password");
            error.statusCode=401
            throw error
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        res.status(201).json({success:true, data:{token, user}})
    }
    catch(e){next(e)}
}

export const signOut=async(req,res)=>{
    res.status(201).json({success:true, message:"Signed Out"})
}