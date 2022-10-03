"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      street: { type: Sequelize.STRING, allowNull: false },
      zip: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      vat: { type: Sequelize.STRING, unique: true, allowNull: false },
      coc: { type: Sequelize.STRING, unique: true, allowNull: false },
      owners: { type: Sequelize.INTEGER, allowNull: false },
      in_EU: { type: Sequelize.BOOLEAN, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
