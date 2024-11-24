import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./db/models/User.js";
import connectToDataBase from "./db/db.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectToDataBase();

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists. Skipping creation.");
      return; // Exit the function if the admin user already exists
    }

    // Hash the password before saving the user
    const passwordHash = await bcrypt.hash("adminpassword"); // Use the actual password you want
    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: passwordHash,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  } finally {
    mongoose.connection.close(); // Ensure the connection is closed
  }
};

seedUsers();


/*Password Hashing: bcrypt.hash("adminpassword", 10) hashes the password for security.
Admin User Creation: new User(...) creates an instance of the User model with admin credentials, and await admin.save() saves it to the database.
Error Handling and Connection Closure: Errors during creation are logged, and the database connection is closed once the process completes.*/
