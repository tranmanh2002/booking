'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add column
    await queryInterface.createTable('Doctor_clinic_specialty', {
        // key: DataTypes.STRING,
        // type: DataTypes.STRING,
        // value_en: DataTypes.STRING,
        // value_vi: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorID: {
        type: Sequelize.INTEGER
      },
      clinicID:{
        type: Sequelize.INTEGER
      },
      specialtyID:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doctor_clinic_specialty');
  }
};