'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      patient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      doctor_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      appointment_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      appointment_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'completed', 'cancelled', 'no-show'),
        defaultValue: 'scheduled'
      },
      consultation_type: {
        type: Sequelize.ENUM('in-person', 'telemedicine', 'phone'),
        defaultValue: 'in-person'
      },
      reminder_sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 30
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Create indexes
    await queryInterface.addIndex('appointments', ['patient_id']);
    await queryInterface.addIndex('appointments', ['doctor_id']);
    await queryInterface.addIndex('appointments', ['appointment_date']);
    await queryInterface.addIndex('appointments', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appointments');
  }
};
