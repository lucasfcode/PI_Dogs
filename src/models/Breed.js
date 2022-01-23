const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "breed",
    {
      id: {
        type: DataTypes.UUID,

        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      height: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.TEXT,
      },
      yearsOfLife: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      database: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
