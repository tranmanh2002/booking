'use strict';

module.exports = {
  //up để thêm dữ liệu
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Mạnh',
      lastName: 'Chúi',
      email: 'admin@gmail.com',
      password: '12345678',
      address: 'Hà Nội',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  //down để rollback lại khi version chưa bị lỗi
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
