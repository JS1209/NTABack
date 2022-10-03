"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` customer will call this method automatically.
     */
    static associate(models) {
      customer.hasMany(models.file);
      customer.hasMany(models.company);
    }
  }
  customer.init(
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "customer",
    }
  );
  return customer;
};
