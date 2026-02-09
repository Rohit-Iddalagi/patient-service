'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('M', 'F', 'Other'),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      zip_code: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      blood_type: {
        type: Sequelize.ENUM('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'),
        allowNull: true
      },
      allergies: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      medical_history: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      emergency_contact_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      emergency_contact_phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      insurance_provider: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      insurance_policy_number: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
      },
      created_by: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      updated_by: {
        type: Sequelize.STRING(255),
        allowNull: true
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
    await queryInterface.addIndex('patients', ['email']);
    await queryInterface.addIndex('patients', ['phone']);
    await queryInterface.addIndex('patients', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patients');
  }
};
