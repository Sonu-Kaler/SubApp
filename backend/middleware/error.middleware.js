const errorMiddleware=async(err,req,res,next)=>{
    console.error("Error middleware triggred:", err.message);

    // ✅ STRONGER VALIDATION: Check if we have proper Express objects
    if (!res || !req || typeof res.status !== 'function' || typeof req.method !== 'string') {
        console.error('Invalid request/response objects in error middleware:', {
            hasRes: !!res,
            hasReq: !!req,
            resType: typeof res,
            reqType: typeof req
        });
        return next(err); // Just exit if objects are invalid
    }

    if(typeof res === 'function'){
        console.error("res is a function, not a response object - skipping error middleware");
        return next(err)
    }

    let error = {...err,message:err.message}

    if(err.name==="CastError"){
        const message = "Resources Not Found"
        error = new Error(message);
        error.statusCode=404
    }

    if(err.code === 11000){
        const message = "Duplicate Field Values Found"
        error = new Error(message);
        error.statusCode=401
    }

    if(err.name==="ValidationError"){
        const message = Object.values(err.errors).map(val=>val.message);
        error = new Error(message.join(", "))
        error.statusCode=401
    }

    // Send error response
    res.status(error.statusCode || 500).json({ 
        success: false, 
        error: error.message || "Server Error" 
    });
}

export default errorMiddleware