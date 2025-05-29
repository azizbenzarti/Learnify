require("dotenv").config();

const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const generatePwd = require("generate-password");
const cloudinary = require("cloudinary").v2;
const userModel = require("../models/user");
const accountveriftokenModel = require("../models/accountveriftoken");
const resetpasswordtokenModel = require("../models/resetpasswordtoken");
const uploadPdfToCloudinary = require("../utils/uploadPdfCloudinary");

const { error } = require("console");

exports.login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw { status: 401, message: "User not found" };
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    throw { status: 401, message: "Invalid password" };
  }

  if (!user.verified) {
    throw { status: 403, message: "Account not verified" };
  }

  const secretKey = process.env.JWT_SECRET;
  const payload = {
    _id: user._id,
    role: user.role,
    name: user.name,
  };

  const token = jwt.sign(payload, secretKey);

  console.log("User logged in successfully: ", token);

  return { token, verified: user.verified };
};

exports.tutorRegister = async (data) => {
  const { name, email, tutorDetails } = data;
  if (!name || !email) {
    throw {
      status: 400,
      error: "Missing required fields: name, email",
    };
  }

  if (!tutorDetails || !tutorDetails.cv || !tutorDetails.expertise) {
    throw {
      status: 400,
      error: "Missing tutor-specific fields: cv, expertise",
    };
  }
  if (!validator.isEmail(email)) {
    throw { status: 400, error: "Invalid email address" };
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw { status: 400, error: "Email address already registered" };
  }

  // Upload CV to Cloudinary
  const cvUrl = await uploadPdfToCloudinary(tutorDetails.cv);

  // Create a new user instance
  const newTutor = new userModel({
    name,
    email,
    role: "tutor",
    tutorDetails: {
      cv: cvUrl,
      expertise: tutorDetails.expertise, // should be array of { field, role, at }
    },
  });

  await newTutor.save();

  // Send reception email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Tutor in Learnify Verification",
    html: `
      <body style="background-color: #f7e8e8; font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 50px;">
          <tr>
            <td align="center" style="background: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h2 style="color: #333333; font-size: 24px; margin-bottom: 24px;">Welcome to Learnify : Smart Learning</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 32px;">
              We recieved your Tutoring request in Learnify platform.
              Our Team is reviewing your application.
              We will contact soon enough .
              </p>
              <p style="color: #999999; font-size: 12px; margin-top: 32px;">
                If you did not request this email, no further action is required.
              </p>
                <p style="color: #999999; font-size: 12px; margin-top: 32px;">
                Best Regards,
                Learnify Team
                </p>
            </td>
          </tr>
        </table>
      </body>
    `,
  };

  await transporter.sendMail(mailOptions);
};



exports.studentRegister = async (data) => {
  const { name, email, password, studentDetails } = data;

  // Validate required fields
  if (!name || !email || !password) {
    throw {
      status: 400,
      error: "Missing required fields: name, email, password",
    };
  }

  // Validate student-specific fields
  // if (!studentDetails || !studentDetails.interests || !studentDetails.level) {
  //   throw {
  //     status: 400,
  //     error: "Missing student-specific fields: interests, level",
  //   };
  // }

  // Validate email format
  if (!validator.isEmail(email)) {
    throw { status: 400, error: "Invalid email address" };
  }

  // Check if email is already registered
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw { status: 400, error: "Email address already registered" };
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //console.log(studentDetails.interests);
  // Create a new user instance
  const newStudent = new userModel({
    name,
    email,
    password: hashedPassword,
    role: "student",
    // studentDetails: {
    //   interests: studentDetails.interests,
    //   level: studentDetails.level,
    // },
  });

  await newStudent.save();

  // Generate a random token for email verification
  const tokenstring = crypto.randomBytes(20).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const vtoken = new accountveriftokenModel({
    userId: newStudent._id,
    token: tokenstring,
    expiresAt,
  });

  await vtoken.save();

  // Send verification email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Learnify Account Verification",
    html: `
      <body style="background-color: #f7e8e8; font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 50px;">
          <tr>
            <td align="center" style="background: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h2 style="color: #333333; font-size: 24px; margin-bottom: 24px;">Welcome to Learnify : Smart Learning</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 32px;">
                Please verify your account to get started.
              </p>
              <a href="${process.env.BASE_URL}/user/verify/${newStudent._id}/${vtoken.token}" target="_blank" style="background-image: linear-gradient(to right, #f472b6, #fde68a); color: #ffffff; padding: 16px 32px; border-radius: 30px; text-decoration: none; font-weight: bold; display: inline-block;">
                Verify Account
              </a>
              <p style="color: #999999; font-size: 12px; margin-top: 32px;">
                If you did not request this email, no further action is required.
              </p>
            </td>
          </tr>
        </table>
      </body>
    `,
  };

  await transporter.sendMail(mailOptions);

  return {
    status: 201,
    message: "Student registered successfully. Verification email sent.",
    redirect: `${process.env.FRONTEND_URL}/post-user-signup`,
  };
};

exports.verifyStudentAccount = async (userId, token) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return { success: false, message: "Invalid Verification Link" };
    }

    if (user.verified) {
      return { success: false, message: "User Already Verified" };
    }

    const verificationToken = await accountveriftokenModel.findOne({
      userId,
      token,
    });
    if (!verificationToken) {
      return { success: false, message: "Invalid Verification Link" };
    }
    user.verified = true;
    await user.save();
    console.log("user verified");
    await accountveriftokenModel.findByIdAndDelete(verificationToken._id);
    return {
      success: true,
      message: "Email verified successfully.",
      redirect: `${process.env.FRONTEND_URL}/login`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occured" };
  }
};

exports.forgetPassword = async (email) => {
  try {
    console.log(email);
    const user = await userModel.findOne({ email });

    if (!user) {
      return { error: true, message: "User with this email not found" };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // expires after 24h
    const resetPasswordToken = await resetpasswordtokenModel.create({
      userId: user._id,
      token,
      expiresAt,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Learnify Password Reset",
      html: `
      <body style="background-color: #f7e8e8; font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 50px;">
          <tr>
            <td align="center" style="background: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h2 style="color: #333333; font-size: 24px; margin-bottom: 24px;">Password Reset Request</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 32px;">
                We received a request to reset your password. Click the button below to proceed.
              </p>
              <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken.token}" target="_blank" style="background-image: linear-gradient(to right, #f472b6, #fde68a); color: #ffffff; padding: 16px 32px; border-radius: 30px; text-decoration: none; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
              <p style="color: #999999; font-size: 12px; margin-top: 32px;">
                If you did not request this email, no further action is required.
              </p>
            </td>
          </tr>
        </table>
      </body>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { error: false, resetPasswordToken };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

// <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken.token}">
// is the link to the new pwd input (form) in the client

exports.resetPassword = async (newPassword, token) => {
  try {
    const passToken = await resetpasswordtokenModel.findOne({ token });
    if (!passToken) {
      throw new Error("Invalid Token");
    }
    if (passToken.expired || passToken.expiresAt < Date.now())
      throw new Error("Token Expired");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(passToken.userId, {
      password: hashedPassword,
    });
    passToken.expired = true;
    passToken.expiresAt = undefined;
    await passToken.save();
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserData = async (userId) => {
  try {
    const user = await userModel.findById(userId).select("-password -__v");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
