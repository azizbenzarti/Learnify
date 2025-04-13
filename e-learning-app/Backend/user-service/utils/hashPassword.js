const bcrypt = require("bcrypt");

//const plainTextPassword = "teacherpwdjustfortest";

const plainTextPassword = "adminaziz";


(async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error.message);
  }
})();
