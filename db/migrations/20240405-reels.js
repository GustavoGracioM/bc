'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      local: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reels');
  }
};
