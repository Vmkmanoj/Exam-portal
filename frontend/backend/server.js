const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;
const app = express();
app.use(cors());
app.use(body_parser.json());


mongoose.connect('mongodb+srv://vmkmano13:13-Aug-2000@examuser.p9tc4.mongodb.net/?retryWrites=true&w=majority&appName=examuser').then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("Error", err);
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const usercreate = mongoose.model('users', userSchema);




app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const findinguser = await usercreate.findOne({ email, password });

    if (findinguser) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: "Login failed" });
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existuser = await usercreate.findOne({ email });

    console.log(req.body);

    if (existuser) {
        return res.json({ success: false, message: "User already exists" });
    }

    const createuser = new usercreate({ name, email, password });


    console.log(createuser);

    try {
        await createuser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// app.post('/register',(req,res)=>{
//     res.send("hello world")
// })

app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
    
});
