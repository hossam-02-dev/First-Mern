import express from "express";
import { Registeruser, Loginuser } from "../controllers/AuthController.js";
const authroute =  express.Router();
authroute.post("/register" , Registeruser);
authroute.post("/login" , Loginuser);


export default authroute ;