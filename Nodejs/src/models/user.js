'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, {foreignKey: 'positionID', targetKey:'keyMap', as: 'positionData'});
      User.belongsTo(models.Allcode, {foreignKey: 'gender', targetKey:'keyMap', as: 'genderData'});
      User.hasOne(models.Markdown, {foreignKey: 'doctorID'});
      User.hasOne(models.Doctor_Infor, {foreignKey: 'DoctorID'})
    }
  };
  User.init({
     
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleID: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    positionID: DataTypes.STRING,
    image: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};