'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.INTEGER
      },
      department: {
        type: Sequelize.STRING
      },
    });
  }, 
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};