'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add column
    await queryInterface.createTable('Users', {
    // id: DataTypes.STRING, 
    // email: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // roleid: DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      roleID: {
        type: Sequelize.STRING
      },
      positionID: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};