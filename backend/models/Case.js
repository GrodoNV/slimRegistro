'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
      // Un caso puede estar asociado a un usuario (creador)
      Case.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'creator'
      });
    }
  }
  
  Case.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      allowNull: false,
      defaultValue: 'medium'
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255]
      }
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    clientPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    caseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'El número de caso no puede estar vacío.'
        }
      }
    },
    applicant: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El solicitante no puede estar vacío.'
        }
      }
    },
    defendant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problem: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El problema no puede estar vacío.'
        }
      }
    },
    community: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Case',
    tableName: 'Cases'
  });
  
  return Case;
};
