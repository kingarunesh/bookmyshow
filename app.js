import express from "express";
import morgan from "morgan";

import moviesRouter from "./routes/moviesRoute.js";
import usersRouter from "./routes/usersRoute.js";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

//SECTION :     global middlewares - it will run before any routes

//NOTE :    morgan
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    console.log("----- You are in PRODUCTION ENV -----");
}

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

//NOTE :    url not found
// app.all("*", (req, res, next) => {
//     res.status(404).json({
//         status: "fail",
//         message: `Can not find ${req.originalUrl} URL on this server.`,
//     });
// });

app.all("*", (req, res, next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can not find ${req.originalUrl} URL on this server.`,
    // });

    // const error = new Error(`Can not find ${req.originalUrl} URL on this server.`);
    // error.status = "fail";
    // error.statusCode = 404;
    // next(error);

    next(new AppError(`Can not find ${req.originalUrl} URL on this server.`, 404));
});

app.use(globalErrorHandler);

//SECTION :     server start
export default app;
