import User from "../model/User.model.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "console";
import e from "express";

dotenv.config();

const registerUser = async (req, res) => {
  //get data
  const { name, email, password } = req.body;

  //validate fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fielda are required",
    });
  }

  //check if user already exist
  try {
    const existingUser = await User.findOne({ email }); //U = DB la user u=existinguser
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    //create a user in db
    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    //create a verification token
    const token = crypto.randomBytes(32).toString("hex");

    //save token in db
    user.verificationToken = token;
    await user.save();

    //send token as email to user
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email",
      text: `Please click on following link:
        ${process.env.BASE_URL}api/v1/users/verify/${token}
        `,
    };
    await transporter.sendMail(mailOption);

    //send success status to user
    res.status(201).json({
      message: "User registered succesfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered",
      error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  //gettoken from url
  const { token } = req.params;

  //validate token
  if (!token) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  //find user based on token
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  //set isVerified to true
  user.isVerified = true;

  //remove verification token
  user.verificationToken = undefined;

  //save
  await user.save();

  //return response
  return res.status(200).json({
    success: true,
    message: "User Verified successfully!",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "please verify your email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
        error,

      });
    }

    //login token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions); //cookie accepts key pair value

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        name: user.name,
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while login",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "user not authenticated",
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {});

    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Logout unsuccessful!",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    //getemail
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Enter correct email address",
      });
    }

    // find user based on email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    //reset token + reset expiry = date.now+ 60*10*1000
    const token = await crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;

    user.resetPasswordExpires = Date.now() + 60 * 10 * 1000;

    await user.save();

    //send email = design url

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Reset password verification",
      text: `Here is your reset password verification link: ${process.env.BASE_URL}api/v1/users/resetPassword/${token}`,
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      message: "Reset token sent successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in process!",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    //collect token from param
    const { token } = req.params;

    //password from req body
    const { password } = req.body;

    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      //set password in user
      user.password = await bcrypt.hash(password, 10);

      //reset token, resetExpiry =>empty
      user.resetPasswordExpires = undefined;
      user.resetPasswordToken = undefined;

      //save
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password Changed Successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid token!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error resetting password!",
    });
  }
};
export {
  registerUser,
  verifyUser,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logoutUser,
};
