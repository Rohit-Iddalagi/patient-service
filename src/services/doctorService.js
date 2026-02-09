const { Doctor } = require('../models');

class DoctorService {
  /**
   * Get doctor by ID
   */
  async getDoctorById(doctorId) {
    try {
      const doctor = await Doctor.findByPk(doctorId);

      if (!doctor) {
        const error = new Error('Doctor not found');
        error.statusCode = 404;
        throw error;
      }

      return doctor;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify doctor exists and is active
   */
  async verifyDoctor(doctorId) {
    try {
      const doctor = await this.getDoctorById(doctorId);

      if (doctor.status !== 'active') {
        const error = new Error(
          `Doctor is not available (status: ${doctor.status})`
        );
        error.statusCode = 400;
        throw error;
      }

      return doctor;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DoctorService();
