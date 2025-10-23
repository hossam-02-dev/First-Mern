import express from "express";
import rolemiddle from "../middlewares/RoleMiddleware.js"
const mealrouter = express.Router();

import { Getallmeals, Getameal , Addmeal, Deletemeal ,Editmeal } from "../controllers/MealController.js";
mealrouter.get("/", rolemiddle("rh" , "employe") , Getallmeals);
mealrouter.get("/:id",rolemiddle("rh" , "employe") , Getameal);
mealrouter.post("/", rolemiddle("rh") ,Addmeal);
mealrouter.put("/:id",rolemiddle("rh"), Editmeal);
mealrouter.delete("/:id",rolemiddle("rh"), Deletemeal);


export default mealrouter;