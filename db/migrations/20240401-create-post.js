'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      legend: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      local: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('posts');
  },
};
