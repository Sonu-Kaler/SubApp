import { Router } from "express";
import { createSub, deleteSub, getAllSubs, getSub, getUserSubs, updateSub } from "../controller/subscription.controller.js";
import authorize from "../middleware/auth.middleware.js";
import checkSub from "../middleware/checkSub.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getAllSubs)

subscriptionRoutes.get("/:id", authorize, checkSub, getSub)

subscriptionRoutes.post("/", authorize, createSub)

subscriptionRoutes.put("/:id", authorize, checkSub, updateSub)

subscriptionRoutes.delete("/:id", authorize, checkSub, deleteSub)

subscriptionRoutes.get("/user/:id", authorize, getUserSubs)

export default subscriptionRoutes