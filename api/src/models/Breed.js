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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL,
      },
      yearsOfLife: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
