const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const port = 3001;
const app = express();
app.use(cors());
app.use(body_parser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vmkmano13:13-Aug-2000@examuser.p9tc4.mongodb.net/?retryWrites=true&w=majority&appName=examuser')
.then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Error", err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const usercreate = mongoose.model('users', userSchema);

// Questions Schema
const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [String], // Array of strings
    rightans : {type: String}
});

const quizSchemacreate = mongoose.model('qustions', quizSchema);

// JWT Secret Key
const JWT_SECRET = 'examprotal';

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const findinguser = await usercreate.findOne({ email, password });

        // Check if findinguser is null
        if (!findinguser) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Now you can safely access findinguser.id
        const payload = { user: { id: findinguser._id }}; // Use _id, not id
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token valid for 1 hour

        return res.json({ success: true, message: 'Login successful', token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get the token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.user; // This should contain the user ID
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};


// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existuser = await usercreate.findOne({ email });

        if (existuser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const createuser = new usercreate({ name, email, password });
        await createuser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Add Quiz (Protected Route)
app.post('/quizadding', async (req, res) => {
    const { question, options, rightans } = req.body;
  
    try {
      const result = await quizSchemacreate.findOneAndUpdate(
        { question: question },
        { options: options, rightans: rightans }, // Include rightans in the update object
        { new: true, upsert: true }
      );
  
      // Return the updated document with rightans included
      res.status(200).json({ message: 'Quiz added successfully', data: result });
    } catch (error) {
      console.error('Error adding quiz:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Get Questions (Protected Route)
app.get('/readqustion',verifyToken, async (req, res) => {

    const {token}  = req.body;

    console.log(token);


    try {
        const displayall = await quizSchemacreate.find();

        

        res.status(200).json({ message: "Data fetched successfully", data: displayall });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

//user

app.get('/user', verifyToken, async (req, res) => {
    const userId = req.user.id; // req.user is populated by verifyToken middleware
    
    try {
        const user = await usercreate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ username: user.name }); // return the 'name' field from your schema
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message });
    }
});




// Server listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
