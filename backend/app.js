import express from "express"
import { PORT } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import connectToDB from "./mongodb/database.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps) or from any origin temporarily
        callback(null, true);
    },
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));

// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","PUT","POST","DELETE"],
//     credentials:true
// }))

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next();
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/subscriptions",subscriptionRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to the App")
})


app.use(errorMiddleware);

connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`App running on http://localhost:${PORT}`)
    })
})

export default app;

