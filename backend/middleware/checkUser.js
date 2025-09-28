import mongoose from "mongoose";
import User from "../model/user.model.js"

const checkUser=async(req,res,next)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(401).json({success:false, message:"Wrong User ID"})
        }
        const user = await User.findById(req.params.id);
        if(!user){
            const error = new Error("User Not Found");
            error.statusCode = 404
            throw error
        }
        if(req.user._id.toString()!==user._id.toString()){
            const error = new Error("User ID not matched");
            error.statusCode = 401
            throw error
        }
        req.targetUser=user;
        next()
    }
    catch(e){next(e)}
}
export default checkUser;