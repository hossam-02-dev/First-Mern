import express from "express";
import { Getallemployes, Getemploye,Createemploye , Editemploye ,Deleteemploye} from "../controllers/EmployeController.js";
import rolemiddle from "../middlewares/RoleMiddleware.js";
const router = express.Router();

router.get("/", rolemiddle("rh") , Getallemployes );
router.get("/:id", rolemiddle("rh"), Getemploye );
router.post("/", rolemiddle("rh"), Createemploye );
router.put("/:id", rolemiddle("rh"), Editemploye );
router.delete("/:id",rolemiddle("rh"), Deleteemploye );




export default router;