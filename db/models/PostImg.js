module.exports = (sequelize, DataTypes) => {
  const PostImg = sequelize.define(
    'PostImg',
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define como parte da chave primária composta
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      imgId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define como parte da chave primária composta
        references: {
          model: 'imgs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      timestamps: false,
      tableName: 'post_imgs',
    }
  );

  return PostImg;
};