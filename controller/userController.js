import asyncHandler from "express-async-handler";
import { userModel as User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register a User
//@route Post /api/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory." });
    return; // Return after sending the response
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ error: "User Already Exists" });
    return; // Return after sending the response
  }

  /// hash password
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    console.log(user);

    res.status(201).json({ _id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "User data is not valid" });
  }
});

//@desc Login User
//@route Post /api/login
//@access public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    //compared password with hash password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    //   let time = new Date();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);
    console.log(
      "Token expires in 15 minutes at",
      expirationTime.toLocaleTimeString()
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Login failed:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

//@desc Current User Info
//@route Get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// Forgot password - Generate password reset token
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate a unique password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set the expiration time for the token (e.g., 1 hour from now)
    const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour

    // Save the password reset token and expiration time in the database
    user.resetToken = resetToken;
    user.resetTokenExpiration = expirationTime;
    await user.save();

    // Send the password reset token to the user (e.g., via email)
    // Replace this with your own logic to send the token to the user

    res.status(200).json({ message: "Password reset token has been sent." });
  } catch (error) {
    console.error("Forgot password failed:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

// Reset password - Update password using the reset token
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find the user with the provided reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // Update the user's password
    user.password = await bcrypt.hash(password, saltRounds);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Password reset failed:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

export { registerUser, loginUser, currentUser };
