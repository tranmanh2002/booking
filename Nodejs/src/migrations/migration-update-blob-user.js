module.exports = {
    //chạy khi chạy command db migration
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        })
    ])
  },
  //back lại ban đầu
  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    ])
  }
};