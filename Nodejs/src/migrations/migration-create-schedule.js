'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add column
    await queryInterface.createTable('Schedules', {
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
      currentNumber:{
        type: Sequelize.INTEGER
      },
      maxNumber:{
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      timeType: {
        type: Sequelize.STRING
      },
      doctorID: {
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
    await queryInterface.dropTable('Schedules');
  }
};