import mongoose from "mongoose";
import Subscription from "../model/subscription.model.js"
export const getAllSubs=async(req,res,next)=>{
    try{
        const subscirptions = await Subscription.find();
        res.status(201).json({success:true, data:subscirptions})
    }
    catch(e){next(e)}
}

export const createSub=async(req,res,next)=>{
    try{
        const subscirption = await Subscription.create({
            ...req.body,
            user:req.user._id
        })
        res.status(201).json({success:true, data:subscirption})
    }
    catch(e){next(e)}
}

export const getSub=async(req,res,next)=>{
    try{
        res.status(201).json({success:true, data:req.subscirption})
    }
    catch(e){next(e)}
}

export const updateSub=async(req,res,next)=>{
    try{
        const updatedSub = await Subscription.findByIdAndUpdate(
            req.subscirption._id,
            req.body,
            {new:true, runValidators:true}
        )
        res.status(201).json({success:true, data:updatedSub})
    }
    catch(e){next(e)}
}

export const deleteSub=async(req,res,next)=>{
    try{
        await req.subscirption.deleteOne();
        res.status(201).json({success:true, message:"Subscription Deleted"})
    }
    catch(e){next(e)}
}

export const getUserSubs=async(req,res,next)=>{
    try{

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(401).json({success:false, message:"Wrong User ID"})            
        }

        if(req.params.id!==req.user.id){
            return res.status(401).json({success:false, message:"Wrong User ID"})
        }
        const subscirptions = await Subscription.find({user:req.params.id})
        res.status(201).json({success:true, data:subscirptions})
    }
    catch(e){next(e)}
}