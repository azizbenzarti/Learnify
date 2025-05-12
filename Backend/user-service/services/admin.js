const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generatePwd = require("generate-password");

const nodemailer = require("nodemailer");
require('dotenv').config();

const setPasswordTokenModel = require("../models/resetpasswordtoken");
const userModel = require("../models/user");

exports.getallstudents = async () => { 
  try {
    const students = await userModel.find({ role: "student" }); 
    return students;
  } catch (error) {
    throw new Error("Error fetching students: " + error.message);
  }
};

exports.getalltutors = async () => { 
  try {
    const tutors = await userModel.find({ role: "tutor" }); 
    return tutors;
  } catch (error) {
    throw new Error("Error fetching tutors: " + error.message);
  }
};


// exports.acceptTutor = async (tutorId) => {
//    const tutor = await userModel.findById(tutorId);
//   if (!tutor || tutor.role !== "tutor") {
//     throw { status: 404, error: "Tutor not found" };
//   }

//   // Generate a reset password token
//   const token = crypto.randomBytes(32).toString("hex");
//   const expiresAt = new Date(Date.now() + 3600000*24*7); //expire after 7days

//   await setPasswordTokenModel.create({
//     userId: tutor._id,
//     token,
//     expiresAt,
//   });

//   // Update tutor status to accepted
//   tutor.verified = true;
//   await tutor.save();

//   // Send email with password reset link
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
//   });

//   const mailOptions = {
//     from: process.env.GMAIL_USER,
//     to: tutor.email,
//     subject: "Learnify Tutor Approval",
//     html: `
//       <p>Congratulations, your tutor request has been approved!</p>
//       <p>Click the link below to set your password and complete your registration:</p>
//       <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Set Password</a>
//       <p>The link expires in 7 days.</p>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
//   return { message: "Tutor accepted. Email sent." };
// };

exports.tutorAccept = async (tutorId) => {
  try {
    const tutor = await userModel.findOne({ _id: tutorId, role: "tutor" }).exec();
    if (!tutor) {
      throw new Error("User not found or not a tutor");
    }
    //generate random pwd
    const password = generatePwd.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    //upadte tutor recod
    const hashedPassword = await bcrypt.hash(password, 10);
    tutor.password = hashedPassword;
    tutor.verified = true;
    //console.log(tutor);
    await tutor.save();

    // Send password email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: tutor.email,
      subject: "Teach on Learnify Application Accepted",
      html: `
      <body style="background-color: #f4f4f4; font-family: Arial, sans-serif; padding: 20px;">
        <div style="max-width: 600px; background: white; padding: 20px; margin: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">🎉 Congratulations, ${tutor.name}!</h2>
          <p style="color: #555;">You have been accepted as a tutor on Learnify. Below is your temporary password:</p>
          <div style="background: #eef; padding: 10px; font-size: 18px; text-align: center; border-radius: 5px;">
            <strong>${password}</strong>
          </div>
          <p style="color: #555;">You can now log in and update your password in your profile settings.</p>
          <a href="${process.env.FRONTEND_URL}/login" 
             style="display: block; width: 200px; text-align: center; background: #28a745; color: white; padding: 12px; text-decoration: none; border-radius: 5px; margin: 20px auto;">
             Login Now
          </a>
          <p style="color: #999; font-size: 12px;">If you did not sign up as a tutor, please ignore this email.</p>
        </div>
      </body>
    `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Password sent successfully via email" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.rejectTutor = async (tutorId) => {
  const tutor = await userModel.findById(tutorId);
  if (!tutor || tutor.role !== "tutor") {
    throw { status: 404, error: "Tutor not found" };
  }

  // Send rejection email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: tutor.email,
    subject: "Learnify Tutor Rejection",
    html: `
      <p>We appreciate your interest in joining Learnify.</p>
      <p>After reviewing your application, we regret to inform you that we are unable to proceed with your request at this time.</p>
      <p>We encourage you to apply again in the future.</p>
      <p>Best regards,<br>Learnify Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  return { message: "Tutor rejected. Email sent." };
};


exports.add = async (userData) => {  // wrap all form fields on one userData object 
  try {
    const newUser = new userModel(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getall = async () => {
  try {
    const users = await userModel.find({ role: "user" }); // Filter users by role: user
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

exports.getbyid = async (id) => {
  try {
    const user = await userModel.findOne({ _id: id, role: "user" }); // Find user by id and role: user
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getbyemail = async (email) => {
  try {
    const user = await userModel.findOne({ email, role: "user" }); // Find user by email and role: user
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deletebyid = async (id) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({ _id: id }); // Find and delete user by id and role: user
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deletebyemail = async (email) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({ email, role: "user" }); // Find and delete user by email and role: user
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updatebyid = async (id, newData) => { 
  try {
        if (newData.password) {
          newData.password = await bcrypt.hash(newData.password, 10);
        }
    const updatedUser = await userModel.findOneAndUpdate({ _id: id }, newData,{new: true,}
    ); 
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createadmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address already registered" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new admin instance
    const newAdmin = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      verified: true,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.login = async (email, password) => {
  const admin = await userModel.findOne({ email, role: "admin" });

  if (!admin) {
    throw new Error("Email or password invalid");
  }

  const validPass = bcrypt.compareSync(password, admin.password);

  if (!validPass) {
    console.log('ma khatftetch');
    throw new Error("Email or password invalid");
  }

    console.log(admin);
    const secretKey = process.env.JWT_SECRET;
    const payload = {
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    const token = jwt.sign(payload, secretKey);

    return { mytoken: token };

};


// tutor accept 
//tutor reject


