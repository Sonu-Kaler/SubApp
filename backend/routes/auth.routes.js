import { Router } from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller.js";


const authRoutes = Router();

authRoutes.post("/signUp", signUp)
authRoutes.post("/signIn", signIn)
authRoutes.post("/signOut", signOut)

export default authRoutes;