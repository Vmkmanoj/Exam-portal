const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;
const app = express();
app.use(cors());
app.use(body_parser.json());

//mongodb connection


mongoose.connect('mongodb+srv://vmkmano13:13-Aug-2000@examuser.p9tc4.mongodb.net/?retryWrites=true&w=majority&appName=examuser')
.then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("Error", err);
});

//user schema

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const usercreate = mongoose.model('users', userSchema);


//qustions schema


const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [String], // Array of strings
    correctAnswer: { type: String, required: true }
  });

const quizSchemacreate = mongoose.model('qustions',quizSchema);

//login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const findinguser = await usercreate.findOne({ email, password });

    if (findinguser) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: "Login failed" });
    }
});

//user registertion

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


//adding qustions


app.post('/quizadding', async (req, res) => {
    const { question, options, correctAnswer } = req.body;

    console.log(options);

    try {
        // Find and update the document or create a new one
        const result = await quizSchemacreate.findOneAndUpdate(
            { question: question },
            { options: options, correctAnswer: correctAnswer }, // Combine update fields
            { new: true, upsert: true } // `new: true` returns the updated document; `upsert: true` creates a new document if none is found
        );

        res.status(200).json({ message: 'Quiz added successfully', data: result });
    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



  



//server listen

app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
    
});
