import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", (req, res) => {
    res.status(400).json({
        status: "undefiend",
        message: "Hello, Arunesh",
    });
});

const hello = "arunesh";

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log("");
    console.log(`Server running on ${PORT}...`);
});
