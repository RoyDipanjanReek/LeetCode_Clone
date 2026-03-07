import { Router } from "express";
import { checkAuth, login, logout, register } from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";


const authRoutes = Router()

authRoutes.post("/login", login)
authRoutes.post("/logOut", logout)
authRoutes.post("/register", register)
authRoutes.get("/check", authenticate, checkAuth)

export default authRoutes