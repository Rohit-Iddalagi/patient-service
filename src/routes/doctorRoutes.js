const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

/**
 * @route   GET /doctors/:id
 * @desc    Get doctor by ID
 * @access  Public
 */
router.get('/:id', doctorController.getById.bind(doctorController));

/**
 * @route   GET /doctors/:id/verify
 * @desc    Verify doctor availability
 * @access  Public
 */
router.get('/:id/verify', doctorController.verify.bind(doctorController));

module.exports = router;
