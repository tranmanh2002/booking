'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add column
    await queryInterface.createTable('Histories', {
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
      patientID:{
        type: Sequelize.INTEGER
      },
      doctorID: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      files: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Histories');
  }
};