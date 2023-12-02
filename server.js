import "dotenv/config";

import app from "./app.js";

let PORT = process.env.PORT;

if (process.env.NODE_ENV === "development") {
    PORT = 1000;
} else if (process.env.NODE_ENV === "production") {
    PORT = 1001;
}

app.listen(PORT, () => {
    console.log("");
    console.log(`Server running on ${PORT}...`);
});
