import express from "express";
import morgan from "morgan";

import moviesRouter from "./routes/moviesRoute.js";
import usersRouter from "./routes/usersRoute.js";

const app = express();

//SECTION :     global middlewares - it will run before any routes

//NOTE :    morgan
app.use(morgan("dev"));

//NOTE :    json body parser
app.use(express.json());

//NOTE :    test
app.use((req, res, next) => {
    req.requestAt = new Date().toLocaleString();

    next();
});

//SECTION :    route
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/users", usersRouter);

//SECTION :     server start
export default app;
