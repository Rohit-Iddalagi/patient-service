'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const patients = [
      {
        id: uuidv4(),
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0101',
        date_of_birth: new Date('1985-03-15'),
        gender: 'M',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip_code: '10001',
        blood_type: 'O+',
        allergies: 'Penicillin',
        medical_history: 'Hypertension',
        emergency_contact_name: 'Jane Doe',
        emergency_contact_phone: '+1-555-0102',
        insurance_provider: 'Blue Cross',
        insurance_policy_number: 'BC123456',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        first_name: 'Sarah',
        last_name: 'Smith',
        email: 'sarah.smith@example.com',
        phone: '+1-555-0103',
        date_of_birth: new Date('1992-07-22'),
        gender: 'F',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip_code: '90001',
        blood_type: 'A-',
        allergies: 'Aspirin',
        medical_history: 'Diabetes',
        emergency_contact_name: 'Michael Smith',
        emergency_contact_phone: '+1-555-0104',
        insurance_provider: 'Aetna',
        insurance_policy_number: 'AET789012',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        first_name: 'Michael',
        last_name: 'Johnson',
        email: 'michael.johnson@example.com',
        phone: '+1-555-0105',
        date_of_birth: new Date('1988-11-10'),
        gender: 'M',
        address: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zip_code: '60601',
        blood_type: 'AB+',
        allergies: null,
        medical_history: 'Asthma',
        emergency_contact_name: 'Lisa Johnson',
        emergency_contact_phone: '+1-555-0106',
        insurance_provider: 'Humana',
        insurance_policy_number: 'HUM345678',
        status: 'active',
        created_at: now,
        updated_at: now
      }
    ];

    return queryInterface.bulkInsert('patients', patients);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('patients', null, {});
  }
};
