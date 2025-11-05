module.exports = (sequelize, DataTypes) => {
  const Reels = sequelize.define(
    'Reels',
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      local: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
    timestamps: false,
    tableName: 'reels',
  }
  );
  return Reels;
};
