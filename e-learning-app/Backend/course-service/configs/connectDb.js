const dotenv = require("dotenv");
dotenv.config();
const url = process.env.URL;
const mongoose = require("mongoose");
const connectDb = async () => {
try {
await mongoose.connect(url);
console.log("Connected to DB");
} catch (error) {
console.error('Connection to DB :', error);
}
};
module.exports = connectDb;