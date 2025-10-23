import mongoose from "mongoose";
const MealSchema = mongoose.Schema({
name : {type : String ,  required : true },
day : {type : String , required : true },


} , {
    timestamps : true
})
const Meal = mongoose.model("Meal" , MealSchema);
export default Meal;