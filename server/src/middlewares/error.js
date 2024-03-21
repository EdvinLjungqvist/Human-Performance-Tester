const errorLogger = (err, req, res, next) => {
    console.error(`[Error] ${err.statusCode} - ${err.message}`);
    
    next(err);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        status: statusCode,
        message: err.message
    });
};

module.exports = {
    errorLogger,
    errorHandler
};
