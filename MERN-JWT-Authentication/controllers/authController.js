import express from "express";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // validating object / user property on input
    if (!name) {
      return res.send({ message: "User name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    // Checking if user is already registered
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered",
      });
    }

    // get hashed password here

    const hashedPassword = await hashPassword(password);

    // Saving / Posting Data to MongoDb including hashed Password
    let user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login controller for verification and authentication

export const loginController = async (req, res) => {
  try {
    // only email and password required to login / destructure from req.body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ message: "invalid email or password" });
    }

    // checking DB if a specific email address is available in DB or not
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({
        message: "invalid email address",
      });
    }

    // upon availability of data, comparing plain password with hashed password already available in DB
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.send({
        message: "Password does not match",
      });
    }

    // JWT Token assigning if password match with the plain and hashed password

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });
    res.status(200).send({
        success: true,
        message: "loggedin successfully",
        user:{
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        },
        token
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    })    
    }
};

// if(!email){
//     return res.send({message: "invalid email"})
// }
// if(!password){
//     return res.send({message: "invalid password"})
// }
