const errorMiddleware=async(err,req,res)=>{
    console.error(err);

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

    if(res && typeof res.status === 'function'){
        res.status(error.statusCode || 500).json({success:false, error:error.message || "Server Error"})
    }
    else{
        console.error("Invalid response object in error middleware")
    }

}

export default errorMiddleware