"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` company will call this method automatically.
     */
    static associate(models) {
      // company.hasMany(models.file);
      // belongsToMany(Costumers)
      company.belongsTo(models.customer);
      company.hasMany(models.file);
    }
  }
  company.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      street: { type: DataTypes.STRING, allowNull: false },
      zip: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      vat: { type: DataTypes.STRING, unique: true, allowNull: false },
      coc: { type: DataTypes.STRING, unique: true, allowNull: false },
      owners: { type: DataTypes.INTEGER, allowNull: false },
      in_EU: { type: DataTypes.BOOLEAN, allowNull: false },
      customerId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "company",
    }
  );
  return company;
};
