const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");

const port = 5000;

const app = express();

app.use(cors());
app.use(body_parser.json());

const users = [
    {
        email: 'user@gmail.com',
        password: '1234'
    }
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: "Login failed" });
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        res.json({ success: false, message: 'User already exists' });
    } else {
        // Add the new user
        users.push({ name, email, password });
        res.json({ success: true, message: 'User registered successfully' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
