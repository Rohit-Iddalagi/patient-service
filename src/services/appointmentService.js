const { Appointment, Patient } = require('../models');
const { Op } = require('sequelize');

class AppointmentService {
  /**
   * Create a new appointment
   */
  async createAppointment(data) {
    try {
      // Verify patient exists
      const patient = await Patient.findByPk(data.patientId);
      if (!patient) {
        const error = new Error('Patient not found');
        error.statusCode = 404;
        throw error;
      }

      // Check for conflicting appointments
      const existingAppointment = await Appointment.findOne({
        where: {
          patientId: data.patientId,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          status: { [Op.ne]: 'cancelled' }
        }
      });

      if (existingAppointment) {
        const error = new Error(
          'Patient already has an appointment at this time'
        );
        error.statusCode = 409;
        throw error;
      }

      const appointment = await Appointment.create(data);
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all appointments
   */
  async getAllAppointments(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      const where = {};

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.patientId) {
        where.patientId = filters.patientId;
      }

      if (filters.doctorId) {
        where.doctorId = filters.doctorId;
      }

      if (filters.fromDate && filters.toDate) {
        where.appointmentDate = {
          [Op.between]: [filters.fromDate, filters.toDate]
        };
      }

      const { count, rows } = await Appointment.findAndCountAll({
        where,
        include: [
          {
            model: Patient,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          }
        ],
        offset,
        limit,
        order: [['appointmentDate', 'ASC']]
      });

      return {
        appointments: rows,
        total: count,
        page,
        limit
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get appointment by ID
   */
  async getAppointmentById(appointmentId) {
    try {
      const appointment = await Appointment.findByPk(appointmentId, {
        include: [
          {
            model: Patient,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          }
        ]
      });

      if (!appointment) {
        const error = new Error('Appointment not found');
        error.statusCode = 404;
        throw error;
      }

      return appointment;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get appointments by patient ID
   */
  async getAppointmentsByPatientId(patientId, filters = {}) {
    try {
      const where = { patientId };

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.fromDate && filters.toDate) {
        where.appointmentDate = {
          [Op.between]: [filters.fromDate, filters.toDate]
        };
      }

      const appointments = await Appointment.findAll({
        where,
        order: [['appointmentDate', 'DESC']]
      });

      return appointments;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update appointment
   */
  async updateAppointment(appointmentId, data) {
    try {
      const appointment = await this.getAppointmentById(appointmentId);

      await appointment.update(data);

      return appointment;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel appointment
   */
  async cancelAppointment(appointmentId, reason = null) {
    try {
      const appointment = await this.getAppointmentById(appointmentId);

      if (appointment.status === 'cancelled') {
        const error = new Error('Appointment is already cancelled');
        error.statusCode = 400;
        throw error;
      }

      await appointment.update({
        status: 'cancelled',
        notes: reason ? `${appointment.notes || ''}\nCancellation reason: ${reason}` : appointment.notes
      });

      return appointment;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get upcoming appointments for patient
   */
  async getUpcomingAppointments(patientId, daysAhead = 30) {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + daysAhead);

      const appointments = await Appointment.findAll({
        where: {
          patientId,
          appointmentDate: {
            [Op.between]: [today, futureDate]
          },
          status: { [Op.ne]: 'cancelled' }
        },
        order: [['appointmentDate', 'ASC']]
      });

      return appointments;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get appointment statistics
   */
  async getAppointmentStats(patientId) {
    try {
      const total = await Appointment.count({
        where: { patientId }
      });

      const completed = await Appointment.count({
        where: { patientId, status: 'completed' }
      });

      const scheduled = await Appointment.count({
        where: { patientId, status: 'scheduled' }
      });

      const cancelled = await Appointment.count({
        where: { patientId, status: 'cancelled' }
      });

      const noShow = await Appointment.count({
        where: { patientId, status: 'no-show' }
      });

      return {
        total,
        completed,
        scheduled,
        cancelled,
        noShow
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AppointmentService();
