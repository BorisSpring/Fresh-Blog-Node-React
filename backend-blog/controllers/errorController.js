const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: 'Fail',
    errorName: err?.name,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: 'Fail',
    message: err.isOperational ? err?.message : 'Ops something went wrong!',
  });
};

const handleDuplicateMongoError = (err, res) => {
  const key = Object.keys(err.errorResponse.keyPattern)[0];
  const value = err.errorResponse.keyValue[key];
  const message = {
    [key]: `Please chose another value for ${key} ( ${value}) shoud be unique!`,
  };
  res.status(500).json({
    status: 'Fail',
    message,
  });
};

const handleValidationError = (err, res) => {
  const messages = {};
  Object.keys(err.errors).forEach(
    (key) => (messages[key] = err.errors[key]?.message)
  );

  res.status(400).json({
    status: 'Fail',
    message: messages,
  });
};

const handleTokenExpireError = (err, res) => {
  res.status(401).json({
    status: 'Fail',
    message: 'Token Expired! Please login again!',
  });
};

const handleTokenSignatureError = (err, res) => {
  res.status(401).json({
    status: 'Fail',
    message: 'Invalid signature!',
  });
};

const handleCastError = (err, res) => {
  res.status(400).json({
    status: err.status,
    message: `Input id for value ${err.value} is invalid!`,
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, res);
  } else {
    if (err?.errorResponse?.code === 11000) {
      handleDuplicateMongoError(err, res);
    } else if (err.name === 'ValidationError') {
      handleValidationError(err, res);
    } else if (err.name === 'CastError') {
      handleCastError(err, res);
    } else if (err.name === 'JsonWebTokenError') {
      handleTokenSignatureError(err, res);
    } else if (err.name === 'TokenExpiredError') {
      handleTokenExpireError(err, res);
    } else {
      sendErrorProduction(err, res);
    }
  }
};
