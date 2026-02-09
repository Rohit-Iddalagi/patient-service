const express = require('express');
const patientController = require('../controllers/patientController');
const validate = require('../middleware/validation');
const validators = require('../utils/validators');

const router = express.Router();

/**
 * @route   POST /patients
 * @desc    Create a new patient
 * @access  Public
 */
router.post(
  '/',
  validate(validators.createPatient),
  patientController.create.bind(patientController)
);

/**
 * @route   GET /patients
 * @desc    Get all patients with pagination
 * @access  Public
 */
router.get('/', patientController.getAll.bind(patientController));

/**
 * @route   GET /patients/search
 * @desc    Search patients by criteria
 * @access  Public
 */
router.get('/search', patientController.search.bind(patientController));

/**
 * @route   GET /patients/stats
 * @desc    Get patient statistics
 * @access  Public
 */
router.get('/stats', patientController.getStats.bind(patientController));

/**
 * @route   GET /patients/:id
 * @desc    Get patient by ID
 * @access  Public
 */
router.get('/:id', patientController.getById.bind(patientController));

/**
 * @route   PUT /patients/:id
 * @desc    Update patient
 * @access  Public
 */
router.put(
  '/:id',
  validate(validators.updatePatient),
  patientController.update.bind(patientController)
);

/**
 * @route   DELETE /patients/:id
 * @desc    Delete patient (soft delete)
 * @access  Public
 */
router.delete('/:id', patientController.delete.bind(patientController));

module.exports = router;
