import { 
  Getallselections, 
  Createselection, 
  Getaselection, 
  Editselection, 
  Deleteselection, 
  GetMySelections 
} from "../controllers/SelectionController.js";

import rolemiddle from "../middlewares/RoleMiddleware.js";
import express from "express";

const selectionRoute = express.Router();


selectionRoute.get("/mine", rolemiddle("employe"), GetMySelections);


selectionRoute.get("/", rolemiddle("rh"), Getallselections);


selectionRoute.get("/:id", rolemiddle("rh", "employe"), Getaselection);


selectionRoute.post("/", rolemiddle("employe", "rh"), Createselection);

selectionRoute.put("/:id", rolemiddle("rh"), Editselection);

selectionRoute.delete("/:id", rolemiddle("rh"), Deleteselection);

export default selectionRoute;
