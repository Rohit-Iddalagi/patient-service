const responseFormatter = require('../utils/responseFormatter');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error details for debugging
  console.error('Error:', {
    statusCode,
    message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(
      responseFormatter.error('Validation failed', 400, errors)
    );
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: `${e.path} already exists`
    }));
    return res.status(409).json(
      responseFormatter.error('Duplicate entry', 409, errors)
    );
  }

  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(
      responseFormatter.error('Validation failed', 400, errors)
    );
  }

  // Time out errors
  if (err.name === 'TimeoutError') {
    return res.status(408).json(
      responseFormatter.error('Request timeout', 408)
    );
  }

  // Not found errors
  if (statusCode === 404) {
    return res.status(404).json(
      responseFormatter.error(message, 404)
    );
  }

  // Unauthorized errors
  if (statusCode === 401) {
    return res.status(401).json(
      responseFormatter.error(message, 401)
    );
  }

  // Forbidden errors
  if (statusCode === 403) {
    return res.status(403).json(
      responseFormatter.error(message, 403)
    );
  }

  // Default error response
  res.status(statusCode).json(
    responseFormatter.error(message, statusCode)
  );
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  res.status(404).json(
    responseFormatter.error(
      `Route ${req.method} ${req.path} not found`,
      404
    )
  );
};

module.exports = {
  errorHandler,
  notFoundHandler
};
