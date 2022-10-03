"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("files", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "companies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("files", "customerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("companies", "customerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("files", "companyId");
    await queryInterface.removeColumn("files", "customerId");
    await queryInterface.removeColumn("companies", "customerId");
  },
};
