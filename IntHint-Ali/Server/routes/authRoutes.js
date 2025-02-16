import express from "express"
import { registerUser,logInUser,logOut,sendPwdResetOTP,resetPwd, changePassword, deleteAccount } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/authMiddleware.js"

const authRoutes=express.Router()

authRoutes.post("/signUp",registerUser);
authRoutes.post("/logIn",logInUser);
authRoutes.post("/sendPwdOtp",sendPwdResetOTP);
authRoutes.post("/resetPwd",resetPwd);

//requires user being looged-in
authRoutes.post("/logOut",verifyJWT,logOut);
authRoutes.put('/changePwd',verifyJWT,changePassword)
authRoutes.delete("/deleteAcct",verifyJWT,deleteAccount)

export default authRoutes;