'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add column
    await queryInterface.createTable('Specialties', {
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
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB('long'),
      },
      descriptionHTML:{
        type: Sequelize.TEXT
      },
      descriptionMarkdown:{
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
    await queryInterface.dropTable('Specialties');
  }
};