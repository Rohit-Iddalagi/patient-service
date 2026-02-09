const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const validate = require('../middleware/validation');
const validators = require('../utils/validators');

const router = express.Router();

/**
 * @route   POST /appointments
 * @desc    Create a new appointment
 * @access  Public
 */
router.post(
  '/',
  validate(validators.createAppointment),
  appointmentController.create.bind(appointmentController)
);

/**
 * @route   GET /appointments
 * @desc    Get all appointments with pagination
 * @access  Public
 */
router.get('/', appointmentController.getAll.bind(appointmentController));

/**
 * @route   GET /appointments/:id
 * @desc    Get appointment by ID
 * @access  Public
 */
router.get('/:id', appointmentController.getById.bind(appointmentController));

/**
 * @route   PUT /appointments/:id
 * @desc    Update appointment
 * @access  Public
 */
router.put(
  '/:id',
  validate(validators.updateAppointment),
  appointmentController.update.bind(appointmentController)
);

/**
 * @route   POST /appointments/:id/cancel
 * @desc    Cancel appointment
 * @access  Public
 */
router.post('/:id/cancel', appointmentController.cancel.bind(appointmentController));

/**
 * @route   GET /appointments/patient/:patientId
 * @desc    Get appointments by patient ID
 * @access  Public
 */
router.get(
  '/patient/:patientId/all',
  appointmentController.getByPatientId.bind(appointmentController)
);

/**
 * @route   GET /appointments/patient/:patientId/upcoming
 * @desc    Get upcoming appointments for patient
 * @access  Public
 */
router.get(
  '/patient/:patientId/upcoming',
  appointmentController.getUpcoming.bind(appointmentController)
);

/**
 * @route   GET /appointments/patient/:patientId/stats
 * @desc    Get appointment statistics for patient
 * @access  Public
 */
router.get(
  '/patient/:patientId/stats',
  appointmentController.getStats.bind(appointmentController)
);

module.exports = router;
