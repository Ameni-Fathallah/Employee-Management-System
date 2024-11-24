import User from "../db/models/User.js"; // Ensure this path is correct
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User retrieved:", user); // Check retrieved user

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Entered password:", password); // Log entered password
    console.log("Stored password hash:", user.password); // Log stored hash

    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
