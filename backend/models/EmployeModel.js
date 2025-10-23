import mongoose from "mongoose";
const EmployeSchema =  mongoose.Schema({
 name : {type : String , required : true  },
 employeId : {type : String  , required : true}, 
role :  {type :  String , required : true},
 
userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
}, {
    timestamps : true 
});

const Employe = mongoose.model("Employe" , EmployeSchema);
export default Employe;