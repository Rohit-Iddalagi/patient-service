const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Doctor = sequelize.define('Doctor', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    licenseNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hospital: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'on-leave'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'doctors',
    timestamps: true,
    underscored: true
  });

  return Doctor;
};
