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
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("weight", value + " cm");
        },
      },
      yearsOfLife: {
        type: DataTypes.STRING,
      },
      database: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
