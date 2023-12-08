import "dotenv/config";

import app from "./app.js";
import mongoose from "mongoose";

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

app.listen(PORT, () => {
    console.log("");
    console.log(`Server running on ${PORT}...`);
});
