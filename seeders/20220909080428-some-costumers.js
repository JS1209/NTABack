module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "customers",
      [
        {
          imageUrl: "https://picsum.photos/200",
          name: "Customer One",
          email: "cuso@one.com",
          number: 1234567890,
          date_of_birth: "01/01/1980",
          country: "NL",
          card_number: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: "https://picsum.photos/200",
          name: "CostumerTwo",
          email: "cust@two.com",
          number: 2345678901,
          date_of_birth: "01/01/1985",
          country: "USA",
          card_number: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: "https://picsum.photos/200",
          name: "Customer Three",
          email: "cust@three.com",
          number: 3456789012,
          date_of_birth: "01/01/1990",
          country: "FR",
          card_number: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: "https://picsum.photos/200",
          name: "Customer Four",
          email: "cusf@four.com",
          number: 4567890123,
          date_of_birth: "01/01/1995",
          country: "JPN",
          card_number: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: "https://picsum.photos/200",
          name: "Customer five",
          email: "cusf@five.com",
          number: 5678901234,
          date_of_birth: "01/01/2000",
          country: "IT",
          card_number: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: "https://picsum.photos/200",
          name: "Customer Six",
          email: "cuss@six.com",
          number: 6789012345,
          date_of_birth: "01/01/2005",
          country: "ES",
          card_number: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
