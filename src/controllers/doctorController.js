const doctorService = require('../services/doctorService');
const responseFormatter = require('../utils/responseFormatter');

class DoctorController {
  /**
   * Get doctor by ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const doctor = await doctorService.getDoctorById(id);

      res.json(responseFormatter.success(doctor, 'Doctor retrieved successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify doctor availability
   */
  async verify(req, res, next) {
    try {
      const { id } = req.params;

      const doctor = await doctorService.verifyDoctor(id);

      res.json(responseFormatter.success(doctor, 'Doctor is available'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DoctorController();
