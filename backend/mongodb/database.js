import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if(!DB_URL){
    throw new Error("Please provide DB_URL .env.<development/production>.local")
}

const connectToDB=async()=>{
    try{
        await mongoose.connect(DB_URL)
        console.log(`Connected to Db to ${NODE_ENV}`)
    }
    catch(e){
        console.log("Failed to connect to db",e);
        process.exit(1)
    }
}

export default connectToDB;