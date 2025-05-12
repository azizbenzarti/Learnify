// const { Schema, model } = require("mongoose");

// const userSchema = new Schema({
//   //Common attributes within all users types
//   name: {
//     type: String,
//     required: true,
//     maxlength: 32,
//   },

//   email: {
//     type: String,
//     required: true,
//     index: { unique: true },
//     match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
//   },

//   password: {
//     type: String,
//     required: function () {
//       return this.role === "student" || this.role === "admin";
//     },
//   },

//   role: {
//     type: String,
//     enum: ["student", "tutor", "admin"],
//     default: "student",
//   },

//   verified: {
//     type: Boolean,
//     default: false,
//   },

//   // //Student specified attributes
//   // studentDetails: {
//   //   interests: {
//   //     type: [String],
//   //     default : [],
//   //   },
//   //   level: {
//   //     type: String,
//   //     enum: ["beginner", "intermediate", "advanced"],
//   //     default: "beginner",
//   //   },
//   //   // there is no need to track courses enrolled here if we will have Enrollment model
//   // },

//   //Tutor specified attributes

//   tutorDetails: {
//     cv: {
//       type: String, //cloudinary link
//     },
//     expertise: [
//       {
//         field: { type: String, required : true },
//         role: { type: String, required : true },
//         at :{type: String, required : true},
//       },
//     ],
//     coursesTaught: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Course",
//       },
//     ],
//   },

//   //Admin specified attribbutes
//   adminDetails: {
//     permissions: [
//       {
//         type: String,
//         enum: [
//           "manage_users",
//           "manage_courses",
//           "manage_content",
//           "manage_enrollments",
//         ],
//       },
//     ],
//   },

//   //Google auth if we will use them
//   googleId: {
//     type: String,
//   },
// });

// const User = model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  },
  password: {
    type: String,
    required: function () {
      return this.role === "student" || this.role === "admin";
    },
  },
  role: {
    type: String,
    enum: ["student", "tutor", "admin"],
    default: "student",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  tutorDetails: {
    cv: {
      type: String, // cloudinary link
    },
    expertise: [
      {
        field: { type: String, required: true },
        role: { type: String, required: true },
        at: { type: String, required: true },
      },
    ],
    coursesTaught: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to Course
      },
    ],
  },
  adminDetails: {
    permissions: [
      {
        type: String,
        enum: [
          "manage_users",
          "manage_courses",
          "manage_content",
          "manage_enrollments",
        ],
      },
    ],
  },
  googleId: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
