import express from "express";
import cors from "cors";
import connectToDataBase from "./db/db.js"; // Ensure this is correctly pointing to your db connection file
import authRoutes from "./routes/auth.js"; // Ensure the path is correct
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDataBase();

// Use the auth routes

//import the router inside the server  to use it 

app.use("/api/auth", authRoutes);
app.use("/api/department",departmentRouter)// at first check API department and then move to the departmentRouter (routes) and call to the method in departmentcontroller(in controller)
app.use("/api/employee",employeeRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
