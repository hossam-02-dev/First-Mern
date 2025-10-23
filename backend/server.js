import express from "express";
import dotenv from "dotenv";
import router from "./routes/EmployeRoute.js";
import mealrouter from "./routes/MealRoute.js";
import connectDB from "./config/db.js";
import selectionRoute from "./routes/SelectionRoute.js";
import authroute from "./routes/AuthRoute.js";
import errorHandler from "./middlewares/ErrorMiddleware.js"
import authmiddle from "./middlewares/AuthMiddleware.js"
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
     origin: process.env.FRONTEND_URL,
  credentials: true, 
}));

connectDB();

app.use("/api/Employes" ,authmiddle,   router);
app.use("/api/Meals" ,authmiddle,   mealrouter);
app.use("/api/selection" , authmiddle, selectionRoute);
app.use("/api/auth" ,  authroute);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
console.log(`server lancé sur le port ${port}`);


})