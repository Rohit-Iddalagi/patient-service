'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('doctors', {
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
      specialization: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      license_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      years_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hospital: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      department_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'on-leave'),
        defaultValue: 'active'
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
    await queryInterface.addIndex('doctors', ['email']);
    await queryInterface.addIndex('doctors', ['specialization']);
    await queryInterface.addIndex('doctors', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('doctors');
  }
};
