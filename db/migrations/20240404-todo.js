'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      check: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('todo');
  },
};
