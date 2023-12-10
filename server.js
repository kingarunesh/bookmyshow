import "dotenv/config";

import app from "./app.js";
import mongoose from "mongoose";

//SECTION :
process.on("uncaughtException", (error) => {
    console.log("💥 Uncaught Exception Shuting Down Server...");
    console.log(error.name);
    console.log(error.message);

    process.exit(1);
});

//SECTION :     database connect

//NOTE :    connect to database
mongoose.connect(process.env.DATABASE).then(() => console.log("Database Conected..."));
// .catch((error) => console.log(error));

//SECTION :     server start
let PORT = process.env.PORT;

if (process.env.NODE_ENV === "development") {
    PORT = 1000;
} else if (process.env.NODE_ENV === "production") {
    PORT = 1001;
}

console.clear();

console.log(`Server running on "${process.env.NODE_ENV.toUpperCase()}"`);

const server = app.listen(PORT, () => {
    console.log("");
    console.log(`Server running on ${PORT}...`);
});

//SECTION :     error handle

process.on("unhandledRejection", (error) => {
    console.log(error.name);
    console.log(error.message);

    console.log("💥 Unhandled Rejection Shuting Down Server...");

    server.close(() => {
        process.exit(1);
    });
});

console.log(hello);
