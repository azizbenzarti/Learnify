const userService = require("../services/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.login(email, password);
    res.status(200).json({
      message: "Login successful",
      data: {
        token: result.token,
        verified: result.verified,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.tutorRegister = async (req, res) => {
  try {
    // Parse the JSON string from the 'data' field
    const bodyData = JSON.parse(req.body.data);

    // Initialize tutorDetails if it doesn't exist
    if (!bodyData.tutorDetails) {
      bodyData.tutorDetails = {};
    }

    // Convert uploaded file to base64 and add it to tutorDetails
    if (req.file) {
      const base64String = `data:application/pdf;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      bodyData.tutorDetails.cv = base64String;
    }

    //console.log("Body in controller:", bodyData);

    // Call the service layer with the parsed data
    const result = await userService.tutorRegister(bodyData);
    res.status(201).json({ message: "Tutor registered successfully", result });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.error || "Internal Server Error" });
  }
};


exports.tutorAccept = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await userService.tutorAccept(token, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.error || "Internal Server Error" });
  }
};



exports.studentRegister = async (req, res) => {
  try {
    const result = await userService.studentRegister(req.body);
    res.status(result.status || 201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyStudentAccount = async (req, res) => {
  try {
    const { id, token } = req.params;
    const result = await userService.verifyStudentAccount(id, token);
    if (result.success) {
      res.status(200).send(result.message);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
};

// exports.verifyEmail = async (req, res) => {
//   try {
//     const { id, token } = req.params;
//     console.log("ID:", id);
//     console.log("Token:", token);
//     const result = await userService.verifyEmail(id, token);
//     console.log("Verification result:", result);

//     let redirectUrl = `${process.env.FRONTEND_URL}/login`;
//     if (!result.success) {
//       redirectUrl += `?success=false&message=${encodeURIComponent(
//         result.message
//       )}`;
//     } else {
//       redirectUrl += `?success=true&message=${encodeURIComponent(
//         result.message
//       )}`;
//     }

//     // Redirect to the constructed URL
//     return res.redirect(redirectUrl);
//   } catch (error) {
//     console.error(error);
//     // If an error occurs, redirect with an error message
//     return res.redirect(
//       `${
//         process.env.FRONTEND_URL
//       }/login?success=false&message=${encodeURIComponent("An error occurred.")}`
//     );
//   }
// };

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userService.forgetPassword(email);

    if (result.error) {
      return res.status(404).json({ message: result.message });
    }

    res
      .status(200)
      .json({
        message: "Reset password email sent",
        resetPasswordToken: result.resetPasswordToken,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    const message = await userService.resetPassword(newPassword, token);
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



// exports.get("/logout", (req, res) => {
//   //TO DEFINE IN CLIENT
// });
