import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
import checkUser from "../middleware/checkUser.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)

userRoutes.get("/:id", authorize, checkUser, getUser)

userRoutes.post("/",(req,res)=>res.send({title:"Create a user"}))

userRoutes.put("/:id", authorize, checkUser, updateUser)

userRoutes.delete("/:id", authorize, checkUser, deleteUser);

export default userRoutes