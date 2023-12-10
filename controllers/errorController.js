import AppError from "./../utils/appError.js";

//SECTION :
const devErrorSend = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack,
    });
};

//SECTION :
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

//SECTION :     handle invalid document id
const handleCastError = (error) => {
    return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const handleDupicateFieldError = (error) => {
    return new AppError(`Duplicate fields value "${error.keyValue.title}". Please use another value.`, 400);
};

const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => el.message);

    return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

//SECTION :
const globalErrorHandler = (error, req, res, next) => {
    // console.log(error.stack);

    error.status = error.status || "error";
    error.statusCode = error.statusCode || 500;

    if (process.env.NODE_ENV === "development") {
        devErrorSend(res, error);
    } else if (process.env.NODE_ENV === "production") {
        //&     copy error object
        // let copyError = { ...error };
        let updatedError = Object.assign(error);

        //      handle invalid document id
        if (updatedError.name === "CastError") {
            updatedError = handleCastError(updatedError);
        }

        //      handle duplicate fields
        if (updatedError.code === 11000) {
            updatedError = handleDupicateFieldError(updatedError);
        }

        //      validation error handler
        if (updatedError.name === "ValidationError") {
            updatedError = handleValidationError(updatedError);
        }

        //
        prodErrorSend(res, updatedError);
    }
};

export default globalErrorHandler;
