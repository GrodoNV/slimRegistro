'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Case.init({
    numeroCaso: DataTypes.INTEGER,
    solicitante: DataTypes.STRING,
    usuario: DataTypes.STRING,
    demandado: DataTypes.STRING,
    problema: DataTypes.TEXT,
    comunidad: DataTypes.STRING,
    observaciones: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Case',
  });
  return Case;
};

