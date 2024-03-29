'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //định nghĩa associate
    static associate(models) {
      Allcode.hasMany(models.User, {foreignKey: 'positionID', as: 'positionData'})
      Allcode.hasMany(models.User, {foreignKey: 'gender', as: 'genderData'})
      Allcode.hasMany(models.Schedule, {foreignKey: 'timeType', as: 'timeTypeData'})

      Allcode.hasMany(models.Doctor_Infor, {foreignKey: 'priceID', as: 'priceTypeData'})
      Allcode.hasMany(models.Doctor_Infor, {foreignKey: 'provinceID', as: 'provinceTypeData'})
      Allcode.hasMany(models.Doctor_Infor, {foreignKey: 'paymentID', as: 'paymentTypeData'})
    }
  };
  Allcode.init({
     
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,//tieng anh
    valueVi: DataTypes.STRING,//tieng viet

  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};