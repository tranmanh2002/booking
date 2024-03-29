'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add column
    await queryInterface.createTable('Markdowns', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },  
      contentHTML:{
        allowNull: false,
        type: Sequelize.TEXT('long')
      },  
      contentMarkdown:{
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      doctorID: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      clinicID: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      specialtyID: {
        allowNull: true,
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
    await queryInterface.dropTable('Markdowns');
  }
};