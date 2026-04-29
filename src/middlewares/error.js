export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    data: null,
    code: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    error: true
  });
};