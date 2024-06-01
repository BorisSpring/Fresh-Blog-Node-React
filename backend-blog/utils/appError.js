class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('2') ? 'Success' : 'Fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
