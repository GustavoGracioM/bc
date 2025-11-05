'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_imgs', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      imgId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'imgs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('post_imgs');
  },
};
