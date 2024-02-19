import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
//router object:-
const router = express.Router();

//routes:
// REGISTER WITH METHOD POST:-
router.post("/register", registerController);

//LOGIN WITH METHOD POST:-
router.post("/login", loginController);
//export:-
export default router;
