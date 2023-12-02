import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(400).json({
        status: "undefiend",
        message: "Hello, Arunesh",
    });
});

app.listen(1000, () => {
    console.log("Server started...");
});
