import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("");
    console.log(`Server running on ${PORT}...`);
});
