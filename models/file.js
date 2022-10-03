"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      file.belongsTo(models.customer);
      file.belongsTo(models.company);
    }
  }
  file.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false },
      template: { type: DataTypes.STRING, allowNull: false },
      signatureId: { type: DataTypes.STRING, unique: true, allowNull: false },
      customerId: { type: DataTypes.INTEGER, allowNull: false },
      companyId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "file",
    }
  );
  return file;
};
