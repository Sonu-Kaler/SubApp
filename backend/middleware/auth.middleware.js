import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js";
import User from "../model/user.model.js";
const authorize=async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        if(!token){
            return res.status(401).json({success:false, message:"No Token - Unauthorize"})
        }

        const decoded = jwt.verify(token,JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({success:false, message:"Invalid ID - Unauthorize"})
        }
        req.user=user;
        next()

    }
    catch(e){
        if(e.name==="TokenExpiredError"){
            return res.status(401).json({success:false, message:"Expired Token"})
        }
        if(e.name==="JsonWebTokenError"){
            return res.status(401).json({success:false, message:"Invalid Token"})
        }
        next(e);
    }
}

export default authorize;