module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      legend: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      local: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'posts',
    }
  );

  Post.associate = (models) => {
    Post.belongsToMany(models.Img, { 
      through: { model: 'post_imgs', timestamps: false }, 
      foreignKey: 'postId', 
      otherKey: 'imgId', 
      as: 'images'  // Alias deve ser 'images'
    });
  };

  return Post;
};
