const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Users "database"
const usersFile = path.join(__dirname, "users.js");
// Products "database"
const productsFile = path.join(__dirname, "data.js");

// Register endpoint
app.post("/register", (req, res) => {
    const { fullName, email, password, role } = req.body;

    // Load existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
        users = require(usersFile);
    }

    // Check if email already exists with the same role
    if (users.find((user) => user.email === email && user.role === role)) {
        return res.status(400).json({ error: "Email already registered with this role" });
    }
    // Add new user
    users.push({ fullName, email, password, role });

    // Save updated users list
    fs.writeFileSync(usersFile, `const users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = users;`);

    res.status(200).json({ message: "User registered successfully" });
});

// Route to handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Load existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
        users = require(usersFile);
    }

    // Find the user by email
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // Check if password matches
    if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
    }

    // Respond with user details (excluding password for security)
    const { fullName, role } = user;
    return res.status(200).json({
        message: "Login successful",
        user: { fullName, email, role },
    });
});

// Fetch products endpoint
app.get("/products", (req, res) => {
    // Load existing products
    let products = [];
    if (fs.existsSync(productsFile)) {
        products = require(productsFile);
    }

    // Respond with products list
    res.status(200).json(products);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
