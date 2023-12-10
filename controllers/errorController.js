const devErrorSend = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack,
    });
};

const prodErrorSend = (res, error) => {
    //!     operational, trusted error: send message to client
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    } else {
        //!     programming or other unknown error, don't leak error details to user
        console.log("ERROR 💥", error);

        res.status(500).json({
            status: "error",
            message: "Somthing went very wrong",
        });
    }
};

const globalErrorHandler = (error, req, res, next) => {
    // console.log(error.stack);

    error.status = error.status || "error";
    error.statusCode = error.statusCode || 500;

    if (process.env.NODE_ENV === "development") {
        devErrorSend(res, error);
    } else if (process.env.NODE_ENV === "production") {
        prodErrorSend(res, error);
    }
};

export default globalErrorHandler;
