export const successResponse = (res, {
  data = null,
  message = "success",
  code = 200
} = {}) => {
  return res.status(code).json({
    data,
    code,
    message,
    error: false
  });
};

export const errorResponse = (res, {
  message = "Internal Server Error",
  code = 500,
  data = null
} = {}) => {
  return res.status(code).json({
    data,
    code,
    message,
    error: true
  });
};