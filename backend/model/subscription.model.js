import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true,
        minLength:3,
        maxLength:100
    },
    price:{
        type:String,
        required:[true, "Price is required"],
        min:[0, "Should be greater then 0"]
    },
    currency:{
        type:String,
        enum:["USD","EUR","INR"],
        default:"USD"
    },
    frequency:{
        type:String,
        enum:["daily","weekly","monthly","yearly"],
        default:"monthly"
    },
    category:{
        type:String,
        enum:["entertainment","news","sports","politics","technology","other"]
    },
    status:{
        type:String,
        enum:["active","cancelled","expired"],
        default:"active"
    },
    paymentMethod:{
        type:String,
        trim:true,
        required:true
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value <= new Date(),
            message:"Start date must be in the past"
        }
    },
    renewalDate:{
        type:Date,
        required:true,
        default:function(){
            const renewalPeriod={
                daily:1,
                weekly:7,
                monthly:30,
                yearly:365
            }
            const renewalDate = new Date(this.startDate)
            renewalDate.setDate(renewalDate.getDate() + renewalPeriod[this.frequency])
            return renewalDate
        },
        validate:{
            validator:function(value){
                return value > this.startDate
            },
            message:"Renewal Date must be after start date"
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    }
},{timestamps:true})

const Subscription = mongoose.model("Subscription",subscriptionSchema);
export default Subscription;