const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        },
        len: {
          args: [2, 100],
          msg: 'First name must be between 2 and 100 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name is required'
        },
        len: {
          args: [2, 100],
          msg: 'Last name must be between 2 and 100 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number is required'
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Invalid date'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'Other'),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    bloodType: {
      type: DataTypes.ENUM('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'),
      allowNull: true
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emergencyContactName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    emergencyContactPhone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    insuranceProvider: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    insurancePolicyNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active',
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'patients',
    timestamps: true,
    underscored: true
  });

  Patient.associate = (models) => {
    // Associations can be added here
    // Patient.hasMany(models.Appointment);
  };

  return Patient;
};
