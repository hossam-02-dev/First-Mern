import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
username : {type : String , required : true} ,
email : {type : String , required : true},
password :  {type :String , required : true} ,
role :  {type : String , default : "employé" } ,


})
const User = mongoose.model("User" , UserSchema);
export default User;