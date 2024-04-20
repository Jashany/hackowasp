
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {password,name} = req.body;
  const email = req.body.email.toLowerCase();
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
    name
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Logout user
// @route POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({ message: "User Logged Out" });
});



export { authUser, registerUser, logoutUser };
