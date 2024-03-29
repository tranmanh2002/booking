'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Specialty extends Model {
    
    static associate(models) {
    }
  };
  Doctor_Clinic_Specialty.init({
     
    doctorID: DataTypes.INTEGER,
    clinicID: DataTypes.INTEGER,
    specialtyID: DataTypes.INTEGER,
   

  }, {
    sequelize,
    modelName: 'Doctor_Clinic_Specialty',
  });
  return Doctor_Clinic_Specialty;
};