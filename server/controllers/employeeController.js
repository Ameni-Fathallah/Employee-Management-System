import multer from "multer";
import path from "path"; // Import path module
import Employee from "../db/models/Employee.js";
import User from "../db/models/User.js"; // To create a user account for every employee
import bcrypt from "bcrypt";

// Configure multer for storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  // Assign a unique name to all files
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Fix concatenation
  },
});

// Function to add an employee
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

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "", // Assign profile image if uploaded
    });

    const savedUser = await newUser.save();

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

    await newEmployee.save();

    // Respond with success
    return res.status(200).json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    // Respond with server error
    return res.status(500).json({
      success: false,
      message: "Server error while adding employee",
      error: error.message, // Include error details for debugging
    });
  }
};

export { addEmployee };

// This controller will be imported into the route file,
// and the route file will be included in index.js to handle requests.
