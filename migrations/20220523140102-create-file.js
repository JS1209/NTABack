"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("files", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      template: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      signatureId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
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
    await queryInterface.dropTable("files");
  },
};
