import mongoose from "mongoose";

const SelectionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeId: {
      type: String, 
      required: true,
    },
    
  },
  {
    timestamps: true, 
  }
);

const Selection = mongoose.model("Selection", SelectionSchema);

export default Selection;
