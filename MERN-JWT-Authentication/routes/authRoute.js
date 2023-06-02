import express from "express";
import { registerController, loginController } from "../controllers/authController.js";
const router = express.Router()


// routing 
// METHOD POST & register
router.post("/register", registerController)

// METHOD POST & login
router.post("/login", loginController)


export default router;

