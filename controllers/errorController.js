const globalErrorHandler = (error, req, res, next) => {
    console.log(error.stack);

    error.status = error.status || "error";
    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
};

export default globalErrorHandler;
