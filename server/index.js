import express from "express";
import cors from "cors";
import connectToDataBase from "./db/db.js"; // Ensure this is correctly pointing to your db connection file
import authRoutes from "./routes/auth.js"; // Ensure the path is correct
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';


const app = express();
const PORT = process.env.PORT || 5000;
// Connect to the database
connectToDataBase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));//so we can access at the folder in the serverside from the fontendside

// Use the auth routes

//import the router inside the server  to use it 

app.use("/api/auth", authRoutes);
app.use("/api/department",departmentRouter)// at first check API department and then move to the departmentRouter (routes) and call to the method in departmentcontroller(in controller)
app.use("/api/employee",employeeRouter)
app.use("/api/salary",salaryRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/setting",settingRouter)




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

