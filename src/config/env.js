require('dotenv').config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3001,
    serviceName: process.env.SERVICE_NAME || 'patient-service',
    logLevel: process.env.LOG_LEVEL || 'info'
  },

  database: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'hospital_patient_db',
    ssl: process.env.DB_SSL === 'true'
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiry: process.env.JWT_EXPIRY || '24h'
  },

  api: {
    version: process.env.API_VERSION || 'v1',
    prefix: process.env.API_PREFIX || '/api/v1'
  },

  services: {
    doctorService: process.env.DOCTOR_SERVICE_URL || 'http://localhost:3002',
    appointmentService: process.env.APPOINTMENT_SERVICE_URL || 'http://localhost:3003'
  },

  logging: {
    format: process.env.LOG_FORMAT || 'combined',
    dir: process.env.LOG_DIR || './logs'
  },

  server: {
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 30000,
    bodyLimit: process.env.BODY_LIMIT || '10mb'
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: process.env.CORS_CREDENTIALS === 'true'
  }
};

module.exports = config;
