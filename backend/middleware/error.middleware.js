const errorMiddleware=async(err,req,res)=>{
    console.error(err);

    // ✅ STRONGER VALIDATION: Check if we have proper Express objects
    if (!res || !req || typeof res.status !== 'function' || typeof req.method !== 'string') {
        console.error('Invalid request/response objects in error middleware:', {
            hasRes: !!res,
            hasReq: !!req,
            resType: typeof res,
            reqType: typeof req
        });
        return; // Just exit if objects are invalid
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