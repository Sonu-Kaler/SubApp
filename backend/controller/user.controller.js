
import User from "../model/user.model.js"

export const getAllUsers=async(req,res,next)=>{
    try{
        const users = await User.find();
        res.status(201).json({success:true,data:users})
    }
    catch(e){next(e)}
}

export const getUser=async(req,res,next)=>{
    try{
        res.status(201).json({success:true, data:req.targetUser})
    }
    catch(e){next(e)}
}

export const updateUser=async(req,res,next)=>{
    try{
        const updatedData = await User.findByIdAndUpdate(
            req.targetUser._id,
            req.body,
            {new:true, runValidators:true}
        ).select("-password")
        res.status(201).json({success:true, data:updatedData})
    }
    catch(e){next(e)}
}

export const deleteUser=async(req,res,next)=>{
    try{
        await req.targetUser.deleteOne()
        res.status(201).json({success:true, message:"User Deleted"})
    }
    catch(e){next(e)}
}