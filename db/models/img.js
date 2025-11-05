module.exports = (sequelize, DataTypes) => {
  const Img = sequelize.define(
    'Img',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'imgs',
    }
  );

  Img.associate = (models) => {
    Img.belongsToMany(models.Post, { 
      through: { model: 'post_imgs', timestamps: false }, 
      foreignKey: 'imgId', 
      otherKey: 'postId', 
      as: 'posts'  // Alias deve ser 'posts'
    });
  };

  return Img;
};
