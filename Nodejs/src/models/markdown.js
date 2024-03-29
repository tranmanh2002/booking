'use strict';
const {
  Model
} = require('sequelize');
//models markdown để hiển thị thông tin bác sĩ
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Markdown.belongsTo(models.User, {foreignKey: 'doctorID'});
    }
  };
  Markdown.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    doctorID: DataTypes.INTEGER,
    specialtyID: DataTypes.INTEGER,
    clinicID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Markdown',
  });
  return Markdown;
};