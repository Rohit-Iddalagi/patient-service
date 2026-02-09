const patientService = require('../services/patientService');
const responseFormatter = require('../utils/responseFormatter');

class PatientController {
  /**
   * Create a new patient
   */
  async create(req, res, next) {
    try {
      const patient = await patientService.createPatient(req.body);

      res.status(201).json(
        responseFormatter.created(patient, 'Patient created successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all patients
   */
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, status, search } = req.query;

      const result = await patientService.getAllPatients(
        parseInt(page),
        parseInt(limit),
        { status, search }
      );

      res.json(
        responseFormatter.paginated(
          result.patients,
          {
            total: result.total,
            page: result.page,
            limit: result.limit
          },
          'Patients retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get patient by ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const patient = await patientService.getPatientById(id);

      res.json(responseFormatter.success(patient, 'Patient retrieved successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update patient
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const patient = await patientService.updatePatient(id, req.body);

      res.json(responseFormatter.success(patient, 'Patient updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete patient
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await patientService.deletePatient(id);

      res.json(responseFormatter.success(null, 'Patient deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Search patients
   */
  async search(req, res, next) {
    try {
      const { firstName, lastName, email, phone, bloodType, limit } = req.query;

      const patients = await patientService.searchPatients({
        firstName,
        lastName,
        email,
        phone,
        bloodType,
        limit: parseInt(limit) || 20
      });

      res.json(responseFormatter.success(patients, 'Search completed successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get patient statistics
   */
  async getStats(req, res, next) {
    try {
      const stats = await patientService.getPatientStats();

      res.json(responseFormatter.success(stats, 'Patient statistics retrieved'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PatientController();
