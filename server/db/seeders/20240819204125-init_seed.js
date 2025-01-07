'use strict';

const { Product, Order } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Order.bulkCreate([
      {
        fullname: 'Иван Иванов',
        address: 'ул. Ленина, д. 10, Москва',
        phone: '+7-495-123-45-67',
        cost: 150.0,
      },
      {
        fullname: 'Мария Петрова',
        address: 'пр. Мира, д. 25, Санкт-Петербург',
        phone: '+7-812-765-43-21',
        cost: 75.0,
      },
      {
        fullname: 'Алексей Смирнов',
        address: 'ул. Лермонтова, д. 5, Казань',
        phone: '+7-843-987-65-43',
        cost: 180.0,
      },
    ]);
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    await Product.bulkCreate(
      data.map((p) => ({
        name: p.title,
        price: p.price,
        description: p.description,
        image: p.image,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
