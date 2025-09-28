import Subscription from "../model/subscription.model.js"

const checkSub=async(req,res,next)=>{
    try{
        const subscirption = await Subscription.findById(req.params.id);
        if(!subscirption){
            const error = new Error("No Subscription Found");
            error.statusCode=404
            throw error
        }

        if(req.user._id.toString()!==subscirption.user.toString()){
            const error = new Error("You are not the owner");
            error.statusCode=404
            throw error
        }
        req.subscirption=subscirption;
        next();
    }   
    catch(e){next(e)}
}

export default checkSub;