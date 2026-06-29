const express = require("express");
const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "users.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    res.json(users);
});

app.post("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 4));

    res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

    const updatedUsers = users.filter(user => user.id !== id);

    fs.writeFileSync(USERS_FILE, JSON.stringify(updatedUsers, null, 4));

    res.json({ message: "User deleted successfully" });
});

app.get("/", (req, res) => {
    res.send("Backend is running. Use /users for API access.");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
