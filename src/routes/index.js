const express = require('express');
const patientRoutes = require('./patientRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const doctorRoutes = require('./doctorRoutes');

const router = express.Router();
const config = require('../config/env');

/**
 * Routes configuration
 */
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/doctors', doctorRoutes);

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Service is healthy',
    service: config.app.serviceName,
    timestamp: new Date().toISOString()
  });
});

/**
 * API info endpoint
 */
router.get('/', (req, res) => {
  res.status(200).json({
    name: config.app.serviceName,
    version: '1.0.0',
    description: 'Patient Management Microservice',
    endpoints: {
      patients: '/patients',
      appointments: '/appointments',
      doctors: '/doctors',
      health: '/health'
    }
  });
});

module.exports = router;
