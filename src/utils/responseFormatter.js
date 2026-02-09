/**
 * Format API responses in a consistent manner
 */

const responseFormatter = {
  /**
   * Success response format
   */
  success: (data, message = 'Success', statusCode = 200) => {
    return {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Error response format
   */
  error: (
    message = 'An error occurred',
    statusCode = 500,
    errors = null,
    data = null
  ) => {
    const response = {
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString()
    };

    if (errors) {
      response.errors = errors;
    }

    if (data) {
      response.data = data;
    }

    return response;
  },

  /**
   * Paginated response format
   */
  paginated: (data, pagination, message = 'Success', statusCode = 200) => {
    return {
      success: true,
      statusCode,
      message,
      data,
      pagination: {
        total: pagination.total,
        page: pagination.page,
        limit: pagination.limit,
        pages: Math.ceil(pagination.total / pagination.limit)
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Created response
   */
  created: (data, message = 'Created successfully', statusCode = 201) => {
    return {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = responseFormatter;
