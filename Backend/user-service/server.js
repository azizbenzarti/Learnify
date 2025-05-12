require("dotenv").config();

require('./config/connect');

const cors = require('cors');

const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const profileRoute = require('./routes/profile');


const express = require("express");

const Port = process.env.PORT|| 3000

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


app.use(express.json());

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/profile", profileRoute);




app.listen(Port, (err) => {
    if (err) 
        { console.error('server failed ', err.message) }
    
    console.log(`Server Listening on port ${Port}`);
});





app.get('/', (req, res) => {
    
    res.send("Welcome E-learning ISS Server")
});