import mongoose from "mongoose";

// Define the department schema
const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String }
  }, { timestamps: true });
  

// Create a model based on the schema
const Department = mongoose.model("Department", departmentSchema);
export default Department;
