const responseFormatter = require('../utils/responseFormatter');

/**
 * Request validation middleware
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return res.status(400).json(
        responseFormatter.error(
          'Validation failed',
          400,
          errors
        )
      );
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;
