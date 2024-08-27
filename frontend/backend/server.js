const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");

const port = 5000; // Correct variable name for port

const app = express();

app.use(cors());
app.use(body_parser.json());

const users = [
    {
        email: 'user@gmail.com',
        password: '1234'
    },{
        email:'vmkmano@gmail.com',
        password : '9894'
    }
];

app.post('/login', (req, res) => {
     
    console.log("hello world");

    const { email, password } = req.body;

    // Correct usage of the find method and variable names
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Login successfully' });
    } else {
        res.json({ success: false, message: "Login failed" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
