module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position: {
        type: DataTypes.INTEGER,
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
      check: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
    timestamps: false,
    tableName: 'todo',
  }
  );
  return Todo;
};
