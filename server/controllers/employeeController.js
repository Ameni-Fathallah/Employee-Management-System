import multer from "multer";
import path from "path"; // Import path module
import Employee from "../db/models/Employee.js";
import User from "../db/models/User.js"; // To create a user account for every employee
import bcrypt from "bcrypt";
import Department from "../db/models/Department.js";

//storing images of the employees inside the serverside(public/uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");//calmaback function
  },
  // Assign a unique name to all files
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Fix concatenation
  },
});

const upload=multer({storage:storage})

//Function to add an employee
//extract the data from req.body and restore inside the user model , user collection and employee collection 
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
      
    } = req.body;

    // Check if the user already exists with specifying email
    
    //if the emp exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered in employee" });
    }
    //if the user doesn't exist we change his password to Hashpassword
    const hashPassword = await bcrypt.hash(password, 10);

    // Register a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "", // Assign profile image if uploaded
    });

    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);

    ///now we will store the employee data 
    // Create a new employee linked to the user
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    const savedEmployee = await newEmployee.save();
    console.log("Saved Employee:", savedEmployee);

    // Respond with success
    return res
      .status(200)
      .json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    // Respond with server error
    return res.status(500).json({
      success: false,
      message: "Server error while adding employee",
      error: error.message, // Include error details for debugging
    });
  }
};


const getEmployees=async(req,res)=>{
  try {
    const employees = await Employee.find().populate('userId', { password: 0 }).populate('department');    
    return res.status(200).json({ success: true, employees });//employees is the result of the serverside 
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Employees server error " });
  }
}


const getEmployee=async(req,res)=>{
  const {id}=req.params;
  try {
    let employee;
    employee= await Employee.findById({_id:id})
    .populate('userId', { password: 0 })
    .populate('department');    
    if(!employee){
      employee=await Employee.findOne({userId:id})
      .populate("userId",{password:0})
      .populate('department');    

    }
    return res.status(200).json({ success: true, employee});//employees is the result of the serverside 
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Employee server error " });
  }
}


//Edit the  employeee 
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary,role,gender,dob } = req.body;

    // Find the employee
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Find the associated user
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user's name
    if (name) {
      user.name = name;
      await user.save();
    }

    // Update the employee details
    if (maritalStatus) employee.maritalStatus = maritalStatus;
    if (designation) employee.designation = designation;
    if (department) employee.department = department;
    if (salary) employee.salary = salary;
    if (role) employee.role = role;
    if (gender) employee.gender = gender;
    if (dob) employee.dob = dob;

    await employee.save();

    // Respond with success
    return res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    // Respond with server error
    return res.status(500).json({ success: false, error: "Update employees server error", details: error.message });
  }
};

const fetchEmployeesById=async(req,res)=>{
  const {id}=req.params;
  try {
    const employees= await Employee.find({department:id}).populate('userId', { password: 0 }).populate('department');    
    return res.status(200).json({ success: true, employees});//employees is the result of the serverside 
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get EmployeesById server error " });
  }
}
export { addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesById };

// This controller will be imported into the route file,
// and the route file will be included in index.js to handle requests.
