const appointmentService = require('../services/appointmentService');
const responseFormatter = require('../utils/responseFormatter');

class AppointmentController {
  /**
   * Create a new appointment
   */
  async create(req, res, next) {
    try {
      const appointment = await appointmentService.createAppointment(req.body);

      res.status(201).json(
        responseFormatter.created(appointment, 'Appointment scheduled successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all appointments
   */
  async getAll(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        patientId,
        doctorId,
        fromDate,
        toDate
      } = req.query;

      const result = await appointmentService.getAllAppointments(
        parseInt(page),
        parseInt(limit),
        { status, patientId, doctorId, fromDate, toDate }
      );

      res.json(
        responseFormatter.paginated(
          result.appointments,
          {
            total: result.total,
            page: result.page,
            limit: result.limit
          },
          'Appointments retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get appointment by ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await appointmentService.getAppointmentById(id);

      res.json(
        responseFormatter.success(appointment, 'Appointment retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get appointments by patient ID
   */
  async getByPatientId(req, res, next) {
    try {
      const { patientId } = req.params;
      const { status, fromDate, toDate } = req.query;

      const appointments = await appointmentService.getAppointmentsByPatientId(
        patientId,
        { status, fromDate, toDate }
      );

      res.json(
        responseFormatter.success(
          appointments,
          'Patient appointments retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update appointment
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await appointmentService.updateAppointment(id, req.body);

      res.json(
        responseFormatter.success(appointment, 'Appointment updated successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Cancel appointment
   */
  async cancel(req, res, next) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const appointment = await appointmentService.cancelAppointment(id, reason);

      res.json(
        responseFormatter.success(appointment, 'Appointment cancelled successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get upcoming appointments for patient
   */
  async getUpcoming(req, res, next) {
    try {
      const { patientId } = req.params;
      const { daysAhead = 30 } = req.query;

      const appointments = await appointmentService.getUpcomingAppointments(
        patientId,
        parseInt(daysAhead)
      );

      res.json(
        responseFormatter.success(
          appointments,
          'Upcoming appointments retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get appointment statistics for patient
   */
  async getStats(req, res, next) {
    try {
      const { patientId } = req.params;

      const stats = await appointmentService.getAppointmentStats(patientId);

      res.json(
        responseFormatter.success(stats, 'Appointment statistics retrieved')
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();
