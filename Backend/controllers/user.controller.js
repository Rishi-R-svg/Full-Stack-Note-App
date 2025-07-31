
import { User } from "../models/user.model.js";

import JWT from "jsonwebtoken";

import bcrypt from "bcryptjs";



const registerUser = async function (req, res) {
  try {
    const { username, email, password, color } = req.body;

    console.log(username);

    if (
      [username, email, password].some((field) => {
        return field?.trim() === "";
      })
    )
      return res.status(404).send({
        succes: false,
        message: "please fill the required fields",
      });

    let existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send({
        message: "username already exists",
      });
    }

    let salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      color,
    });
    newUser.save();

    res.status(201).send({
      message: "new user created",
      newUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    const checkUser = await User.findOne({ email });
    
    const newPass = await bcrypt.compare(password, checkUser.password);

    const accesToken = JWT.sign(
      { id: loginUser._id },
       process.env.JWT_ACCESS, 
       {
      expiresIn: "1d",
    });

    const refreshToken = JWT.sign(
      { id: loginUser._id },
      process.env.JWT_REFRESH,
      { expiresIn: "10d" }
    );


   

    

    if (email && newPass) {
      return res.status(201).send({
        succes: true,
        message: "Login successed",
        accestoken: accesToken,
        rerfrestoken: refreshToken,
        user: checkUser.username,
        email: checkUser.email,
        id: checkUser._id,
      });
    }

     return res.status(400).send({
      succes:false,
      message: "invalid email or password",
    });
    
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: "Something went wrong",
    });
  }
};

export { registerUser, loginUser };
